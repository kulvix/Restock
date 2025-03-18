const express = require('express');
const router = express.Router();
const axios = require("axios");


router.get("/", (req, res) => res.send("Server is connected."));

router.post("/send-notification", async (req, res) => {
  const { expoPushToken, title, message } = req.body;
  // console.log("ROUTE HIT!", req.body)

  if (!expoPushToken) {
      return res.status(400).json({ error: "Expo push token is required" });
  }

  try {
      const response = await axios.post("https://exp.host/--/api/v2/push/send", {
          to: expoPushToken,
          title: title || "Notification",
          body: message || "You have a new message!",
          sound: "default",
      }, {
          headers: { "Content-Type": "application/json" },
      });

      return res.json({ success: true, data: response.data });
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
});


// API endpoint to retrieve all products with their types and inventory
router.get('/product_items', (req, res) => {
	const query = `
			SELECT 
					categories.category_name AS category,
					products.name AS product,
					producttypes.name AS type,
					producttypes.sku,
					producttypes.image_url,
					inventory.quantity,
					inventory.price,
					producttypes.unit AS unit  -- Add unit here
			FROM inventory
			JOIN producttypes ON inventory.type_id = producttypes.type_id
			JOIN products ON producttypes.product_id = products.product_id
			JOIN categories ON products.category_id = categories.category_id
	`;
	
	req.db.query(query, (err, results) => {
			if (err) {
					console.error('Error fetching products:', err.message);
					res.status(500).send('Server Error');
					return;
			}
			res.json(results);
	});
});


// API endpoint to retrieve all categories (that has products connected to them)
router.get('/categories', async (req, res) => {
    const query = `
        SELECT DISTINCT 
            categories.category_name, 
            categories.image_url, 
            categories.description 
        FROM categories 
        JOIN products ON products.category_id = categories.category_id
    `;

    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching categories:', err.message);
            res.status(500).send('Server Error');
            return;
        }
        res.json(results);
    });
});


// API endpoint to retrieve products by category
router.get('/products/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const query = `
      SELECT 
        categories.category_name AS category,
        products.name AS product,
        producttypes.name AS type,
        producttypes.sku,
        producttypes.discount,
        producttypes.image_url,
        producttypes.type_id,
        inventory.quantity,
        inventory.price,
        producttypes.unit AS unit
      FROM inventory
      JOIN producttypes ON inventory.type_id = producttypes.type_id
      JOIN products ON producttypes.product_id = products.product_id
      JOIN categories ON products.category_id = categories.category_id
      WHERE categories.category_name = ?
    `;
    const results = await req.db.query(query, [category]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching products by category:', err.message);
    res.status(500).send('Server Error');
  }
});


// New Endpoint: Retrieve producttypes by Product ID
router.get('/producttypes/:product_id', async (req, res) => {
  try {
    const productId = req.params.product_id;

    // Validate product ID
    if (isNaN(productId)) {
      return res.status(400).send('Invalid product ID');
    }

    const query = `
      SELECT 
        producttypes.type_id,
        producttypes.name AS type_name,
        producttypes.sku,
        producttypes.discount,
        producttypes.local_name,
        producttypes.image_url,
        inventory.quantity,
        inventory.price,
        producttypes.unit AS unit
      FROM producttypes
      LEFT JOIN inventory ON producttypes.type_id = inventory.type_id
      WHERE producttypes.product_id = ?
    `;

    // Execute the query
    const results = await req.db.query(query, [productId]);

    // Check if results are empty
    if (results.length === 0) {
      return res.status(404).send('No product types found for the given product ID');
    }

    // Return the results
    res.json(results);
  } catch (err) {
    console.error('Error fetching product types:', err.message);
    res.status(500).send('Server Error');
  }
});



// API Endpoint: Retrieve All products with Lowest Price
router.get('/products', (req, res) => {
	const query = `
			SELECT 
					products.product_id,
					products.category_id,
					products.name,
					products.description,
					products.image_url,
					MIN(inventory.price) AS lowest_price,
					producttypes.unit AS unit  -- Add unit here
			FROM products
			JOIN producttypes ON products.product_id = producttypes.product_id
			JOIN inventory ON producttypes.type_id = inventory.type_id
			GROUP BY products.product_id, products.category_id, products.name, products.description, products.image_url
			ORDER BY products.product_id ASC
	`;

	req.db.query(query, (err, results) => {
			if (err) {
					console.error('Error fetching products:', err.message);
					res.status(500).json({ error: 'Server Error', details: err.message });
					return;
			}

			res.json(results);
	});
});



// router.get('/billingaddresses/:id', (req, res) => {
//   const { id } = req.params; // Get user_id from request params
//   const query = `
//   SELECT * FROM billingaddresses 
//   WHERE user_id = ? 
//   ORDER BY id ASC
//   `;
  
//   // console.log("Results: ", results);
//   console.log("ID: ", id);
//   req.db.query(query, [id], (err, results) => {
//     if (err) {
//       console.error('Error fetching billing addresses:', err.message);
//       res.status(500).json({ error: 'Server Error' });
//       return;
//     }

//     res.json(results); // Return retrieved rows
//   });
// });


router.get('/billingaddresses/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Validate user ID
    if (isNaN(userId)) {
      return res.status(400).send('Invalid user ID');
    }
    
    const query = `
    SELECT *
    FROM billingaddresses
    WHERE user_id = ?
    `;
    
    // Execute the query
    const results = await req.db.query(query, [userId]);
    
    // Check if results are empty
    if (results.length === 0) {
      return res.status(404).send('No billing addresses found for the given user ID');
    }

    // Return the results
    res.json(results);
  } catch (err) {
    console.error('Error fetching billing addresses:', err.message);
    res.status(500).send('Server Error');
  }
});



// Get product types with a specific discount and their inventory details
router.get('/producttypes/discount/:minDiscount/:maxDiscount', async (req, res) => {
  try {
    const { minDiscount, maxDiscount } = req.params;

    // Validate parameters (ensure they are numbers)
    if (isNaN(minDiscount) || isNaN(maxDiscount)) {
      return res.status(400).send('Invalid discount values');
    }

    const query = `
      SELECT 
        pt.*,
        pt.name AS type_name,
        inv.type_id, 
        inv.quantity, 
        inv.price
      FROM producttypes pt
      LEFT JOIN inventory inv ON pt.type_id = inv.type_id
      WHERE pt.discount > ? AND pt.discount <= ?
    `;

    // Execute the query with parameters
    const results = await req.db.query(query, [minDiscount, maxDiscount]);

    // Check if results are empty
    if (results.length === 0) {
      return res.status(404).send('No product types found within the given discount range');
    }

    // Return the results
    res.json(results);
  } catch (err) {
    console.error('Error fetching product types:', err.message);
    res.status(500).send('Server Error');
  }
});












router.post('/create-order', async (req, res) => {
  const { 
    user_id, 
    items, 
    subtotal,
    total,
    vat,
    DELIVERY_FEE,
    grand_total,
    payment_status 
  } = req.body;

  try {
    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    // Insert Order
    const orderRes = await req.db.query(
      'INSERT INTO orders (user_id, subtotal, vat, delivery_fee, total, grand_total, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user_id, subtotal, vat, DELIVERY_FEE, total, grand_total, payment_status]
    );

    const orderId = orderRes.insertId;
    // Insert Order Items
    for (const item of items) {
      const validPrice = parseFloat(item.price);
      if (isNaN(validPrice)) {
        return res.status(400).json({ message: `Invalid price for item: ${JSON.stringify(item)}` });
      }

      if (item.type_id) {
        // Insert a regular product
        await req.db.query(
          'INSERT INTO order_items (order_id, type_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
          [orderId, item.type_id, item.quantity, validPrice]
        );
      } else if (item.bundle_id) {
        // Handle bundles (Method 1: Use a special type_id OR Method 2: Store in a separate table)
        // await req.db.query(
        //   'INSERT INTO order_items (order_id, type_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
        //   [orderId, `bundle_${item.bundle_id}`, item.quantity, validPrice]
        // );

        // Alternatively, store bundles separately (if needed)
        await req.db.query(
          'INSERT INTO order_bundles (order_id, bundle_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
          [orderId, item.bundle_id, item.quantity, validPrice]
        );
      } else {
        return res.status(400).json({ message: 'Item must have either a type_id or a bundle_id' });
      }
    }

    res.status(201).json({ message: 'Order created successfully', order_id: orderId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});










// router.post('/create-order', async (req, res) => {
//   const { 
//     user_id, 
//     items, 
//     subtotal,
//     total,
//     vat,
//     DELIVERY_FEE,
//     grand_total,
//     payment_status } = req.body;
//   // console.log("ROUTE HIT! ID: ", user_id, total_price);
//   try {
//     if (!user_id) {
//       return res.status(400).json({ message: 'User ID is required' });
//     }

//     // const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     // const VAT_RATE = 0.075;
//     // const vat = subtotal * VAT_RATE;
//     // const DELIVERY_FEE = 500;

//     // const total_price = subtotal + vat + DELIVERY_FEE;

//     const orderRes = await req.db.query(
//       'INSERT INTO orders (user_id, subtotal, vat, delivery_fee, total, grand_total, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?)',
//       [user_id, subtotal, vat, DELIVERY_FEE, total, grand_total, payment_status]
//     );

//     const orderId = orderRes.insertId;

//     // Insert order items
//     for (const item of items) {
//       const validPrice = parseFloat(item.price);
//       if (isNaN(validPrice)) {
//         return res.status(400).json({ message: `Invalid price for type_id: ${item.type_id}` });
//       }
//       await req.db.query(
//         'INSERT INTO order_items (order_id, type_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
//         [orderId, item.type_id, item.quantity, validPrice]
//       );
//     }

//     res.status(201).json({ message: 'Order created successfully', order_id: orderId });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });



router.get('/orders/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const orders = await req.db.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [user_id]
    );
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json({ orders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.get('/order-items/:order_id', async (req, res) => {
  const { order_id } = req.params;

  try {
    const orderItems = await req.db.query(
      'SELECT * FROM order_items WHERE order_id = ?',
      [order_id]
    );

    if (orderItems.length === 0) {
      return res.status(404).json({ message: 'No items found for this order' });
    }

    res.status(200).json({ orderItems });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});











// Retrieve All Bundles
router.get('/bundles', async (req, res) => {
  // console.log("ROUTE HIT")

  const query = 'SELECT * FROM bundles';

  req.db.query(query, (err, results) => {
    if (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).json({ error: 'Server Error' });
        return;
    }
    res.json(results);
  });
});



// Retrieve Bundle Items by ID
// Retrieve Bundle Items by ID and calculate total bundle price
router.get('/bundle/:bundle_id/items', async (req, res) => {
  try {
    const { bundle_id } = req.params;
    
    // Fetch bundle items and calculate the total price
    const bundleItems = await req.db.query(
      `SELECT 
          bi.bundle_item_id, 
          bi.bundle_id, 
          bi.type_id, 
          pt.name AS product_name,
          pt.local_name,
          pt.discount,
          inv.price AS product_price, 
          pt.unit, 
          pt.image_url, 
          bi.quantity, 
          (inv.price * bi.quantity) AS total_price
      FROM bundle_items bi
      JOIN producttypes pt ON bi.type_id = pt.type_id
      JOIN inventory inv ON pt.type_id = inv.type_id  -- Linking inventory to get price
      WHERE bi.bundle_id = ?;`,
      [bundle_id]
    );

    // Calculate total bundle price
    const totalBundlePrice = bundleItems.reduce((sum, item) => sum + Number(item.total_price), 0);

    res.json({
      bundle_id,
      total_price: totalBundlePrice.toFixed(2),
      items: bundleItems
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Retrieve All Bundle Items Across All Bundles
router.get('/bundle-items', async (req, res) => {
  
  try {
    const [bundleItems] = await req.db.query(`
      SELECT bi.*, b.bundle_name, pt.type_name 
      FROM bundle_items bi
      JOIN bundles b ON bi.bundle_id = b.bundle_id
      JOIN producttypes pt ON bi.type_id = pt.type_id
    `);
    res.json(bundleItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});























// Create a Promo
router.post('/promo', async (req, res) => {
  const { promo_name, description, end_date, items } = req.body;
  if (!promo_name || !end_date || !items) {
      return res.status(400).json({ message: "All fields are required" });
  }

  try {
      const promoRes = await req.db.query('INSERT INTO promos (promo_name, description, end_date) VALUES (?, ?, ?)', [promo_name, description, end_date]);
      const promo_id = promoRes.insertId;

      for (const item of items) {
          await req.db.query('INSERT INTO promo_items (promo_id, type_id, discount_price) VALUES (?, ?, ?)', [
              promo_id, item.type_id, item.discount_price
          ]);
      }

      res.status(201).json({ message: 'Promo created successfully', promo_id });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Retrieve All Promos
router.get('/promo', async (req, res) => {
  try {
      const promos = await req.db.query('SELECT * FROM promos');
      res.json(promos);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Delete a Promo
router.delete('/promo/:promo_id', async (req, res) => {
  try {
      const { promo_id } = req.params;
      await req.db.query('DELETE FROM promos WHERE promo_id = ?', [promo_id]);
      res.json({ message: 'Promo deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Retrieve Promo Items by ID
router.get('/promo/:promo_id/items', async (req, res) => {
  try {
      const { promo_id } = req.params;
      const promoItems = await req.db.query('SELECT * FROM promo_items WHERE promo_id = ?', [promo_id]);
      res.json(promoItems);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Create a Bundle
router.post('/create_bundle', async (req, res) => {
  
  const { bundle_name, description, items } = req.body;
  if (!bundle_name || !items) {
      return res.status(400).json({ message: "All fields are required" });
  }

  try {
      const bundleRes = await req.db.query('INSERT INTO bundles (bundle_name, description) VALUES (?, ?)', [bundle_name, description]);
      const bundle_id = bundleRes.insertId;

      for (const item of items) {
          await req.db.query('INSERT INTO bundle_items (bundle_id, type_id, quantity) VALUES (?, ?, ?)', [
              bundle_id, item.type_id, item.quantity
          ]);
      }

      res.status(201).json({ message: 'Bundle created successfully', bundle_id });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
























router.post('/create-transaction', async (req, res) => {
  const { order_id, email, amount, payment_method } = req.body;

  try {
    // Get user ID
    const userRes = await req.db.query('SELECT id FROM users WHERE email = ?', [email]);
    const user = userRes[0];

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Insert into transactions
    await req.db.query('INSERT INTO transactions (order_id, user_id, amount, status, payment_method) VALUES (?, ?, ?, ?, ?)', [
      order_id,
      user.id,
      amount,
      'pending', // Initial status
      payment_method,
    ]);

    res.status(201).json({ message: 'Transaction recorded' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

































router.post('/update-shipping', async (req, res) => {
  const { order_id, email, tracking_number, status, estimated_delivery_date } = req.body;

  try {
    // Get user ID
    const userRes = await req.db.query('SELECT id FROM users WHERE email = ?', [email]);
    const user = userRes[0];

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Update shipping status
    await req.db.query(
      'UPDATE shipping SET tracking_number = ?, status = ?, estimated_delivery_date = ? WHERE order_id = ? AND user_id = ?',
      [tracking_number, status, estimated_delivery_date, order_id, user.id]
    );
    res.status(200).json({ message: 'Shipping updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});





module.exports = router;
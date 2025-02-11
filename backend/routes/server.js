const express = require('express');
const router = express.Router();

// API endpoint to retrieve all products with their types and inventory
router.get('/product_items', (req, res) => {
	const query = `
			SELECT 
					Categories.category_name AS category,
					Products.name AS product,
					ProductTypes.name AS type,
					ProductTypes.sku,
					ProductTypes.image_url,
					Inventory.quantity,
					Inventory.price,
					ProductTypes.unit AS unit  -- Add unit here
			FROM Inventory
			JOIN ProductTypes ON Inventory.type_id = ProductTypes.type_id
			JOIN Products ON ProductTypes.product_id = Products.product_id
			JOIN Categories ON Products.category_id = Categories.category_id
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
            Categories.category_name, 
            Categories.image_url, 
            Categories.description 
        FROM Categories 
        JOIN Products ON Products.category_id = Categories.category_id
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
        Categories.category_name AS category,
        Products.name AS product,
        ProductTypes.name AS type,
        ProductTypes.sku,
        ProductTypes.image_url,
        ProductTypes.type_id,
        Inventory.quantity,
        Inventory.price,
        ProductTypes.unit AS unit
      FROM Inventory
      JOIN ProductTypes ON Inventory.type_id = ProductTypes.type_id
      JOIN Products ON ProductTypes.product_id = Products.product_id
      JOIN Categories ON Products.category_id = Categories.category_id
      WHERE Categories.category_name = ?
    `;
    const results = await req.db.query(query, [category]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching products by category:', err.message);
    res.status(500).send('Server Error');
  }
});


// New Endpoint: Retrieve ProductTypes by Product ID
router.get('/producttypes/:product_id', async (req, res) => {
  try {
    const productId = req.params.product_id;

    // Validate product ID
    if (isNaN(productId)) {
      return res.status(400).send('Invalid product ID');
    }

    const query = `
      SELECT 
        ProductTypes.type_id,
        ProductTypes.name AS type_name,
        ProductTypes.sku,
        ProductTypes.image_url,
        Inventory.quantity,
        Inventory.price,
        ProductTypes.unit AS unit
      FROM ProductTypes
      LEFT JOIN Inventory ON ProductTypes.type_id = Inventory.type_id
      WHERE ProductTypes.product_id = ?
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



// API Endpoint: Retrieve All Products with Lowest Price
router.get('/products', (req, res) => {
	const query = `
			SELECT 
					Products.product_id,
					Products.category_id,
					Products.name,
					Products.description,
					Products.image_url,
					MIN(Inventory.price) AS lowest_price,
					ProductTypes.unit AS unit  -- Add unit here
			FROM Products
			JOIN ProductTypes ON Products.product_id = ProductTypes.product_id
			JOIN Inventory ON ProductTypes.type_id = Inventory.type_id
			GROUP BY Products.product_id, Products.category_id, Products.name, Products.description, Products.image_url
			ORDER BY Products.product_id ASC
	`;

	req.db.query(query, (err, results) => {
			if (err) {
					console.error('Error fetching products:', err.message);
					res.status(500).json({ error: 'Server Error' });
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



module.exports = router;
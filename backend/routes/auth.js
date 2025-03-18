// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const ENCRYPTION_KEY = crypto.randomBytes(32); // Replace this with a securely stored key
const IV_LENGTH = 16; // For AES, this is always 16

router.get("/", (req, res) => res.send("Auth is connected."));

// Encrypt Function
const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
};

// Decrypt Function
const decrypt = (encryptedText) => {
  const [ivHex, encryptedData] = encryptedText.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};


// Middleware to protect routes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

router.post('/signup', async (req, res) => {
  // console.log("FINE 1")
  const { email, password, firstName, lastName} = req.body;
  try {
    let userExists;
    userExists = await req.db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (userExists[0]) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
     // Insert new user based on the type of input
     await req.db.query('INSERT INTO Users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)', [email, hashedPassword, firstName, lastName]);
    // Retrieve the newly created user
    const newUserRes = await req.db.query(
      'SELECT * FROM Users WHERE email = ?', [email]
    );
    const newUser = newUserRes[0];
    // Generate JWT
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Login
router.post('/login', async (req, res) => {  
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    // Check if user exists
    let userRes = await req.db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    // Check if phone number exists
    // if (!userRes[0]) {
    //   userRes = await req.db.query('SELECT * FROM users WHERE phone = ?', [email]);
    // }
    const user = userRes[0];

    if (!user) {
      return res.status(400).json({ message: 'Account not found' });
    }
    if (!user.password) {
      return res.status(400).json({ message: 'Please login with social account.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

// Recover Password
// router.post('/recover-password', async (req, res) => {
//   const { email } = req.body;
  
//   try {
//     // Check if user exists
//     const userRes = await req.db.query('SELECT * FROM users WHERE email = ?', [email]);
//     const user = userRes[0]; // Adjust for SQL result format
    
//     if (user.length === 0) {
//       return res.status(400).json({ message: 'User does not exist' });
//     }
    
//     // console.log(email, user);
//     // TODO: Implement email sending with a reset token
//     // For simplicity, we'll assume password reset is done

//     res.json({ message: 'Password recovery instructions sent to your email.' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });


router.post('/recover-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const userRes = await req.db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = userRes[0]; // Adjust for your SQL result format

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Generate a 6-digit numeric token
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    const tokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

    // Save the token and expiry to the database
    await req.db.query('UPDATE users SET reset_token = ?, token_expiry = ? WHERE email = ?', [
      resetToken,
      tokenExpiry,
      email,
    ]);

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'judddex8@gmail.com',
        pass: 'opzq xwle zgms bvob',
      },
    });

    // Send the email
    const mailOptions = {
      from: '"Restock" <auth@restock.com>',
      to: email,
      subject: 'Password Recovery Instructions',
      

      text: `Hi ${user.first_name},\n\nYour password reset token is::\n\n${resetToken}\n\nThis token is valid for 1 hour. If you did not request this, please ignore this email. Thank you for using our service.`,
      html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #c8f3e6; /* Light primary */
              color: #333333; /* Gray dark */
            }
            .email-container {
              max-width: 600px;
              margin: 30px auto;
              background-color: #ffffff; /* White */
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #00A57A; /* Primary */
            }
            .email-header {
              background-color: #00A57A; /* Primary */
              color: #ffffff; /* White text */
              padding: 20px;
              text-align: center;
              font-size: 24px;
              font-weight: bold;
            }
            .email-body {
              padding: 20px;
            }
            .email-body p {
              margin: 0 0 15px;
              line-height: 1.5;
              color: #333333; /* Gray dark */
            }
            .email-body strong {
              color: #015E3F; /* Secondary */
            }
            .email-footer {
              text-align: center;
              padding: 15px;
              font-size: 12px;
              color: #888888; /* Gray */
              background-color: #f9f9f9; /* Light gray for footer */
            }
            .token {
              font-size: 32px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">Password Reset</div>
            <div class="email-body">
              <p>Hi ${user.first_name},</p>
              <p>Your password reset token is: <br>
                <strong class="token">${resetToken}</strong>
              </p>
              <p>This token is valid for 1 hour.</p>
              <p>If you did not request this, please ignore this email.</p>
            </div>
            <div class="email-footer">
              <p>Thank you for using our service.</p>
            </div>
          </div>
        </body>
        </html>`,
    };
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password recovery instructions sent to your email.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});





router.post('/verify-reset-password-token', async (req, res) => {
  const { email, token } = req.body;

  try {
    // Validate input
    if (!email || !/\S+@\S+\.\S+/.test(email) || !token) {
      return res.status(400).json({ message: 'Invalid email or token.' });
    }

    // Query the database for the user
    const userRes = await req.db.query(
      'SELECT reset_token, token_expiry FROM users WHERE email = ?',
      [email]
    );
    const user = userRes[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const { reset_token, token_expiry } = user;

    // Check if the token matches
    if (reset_token !== token) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Check if the token has expired
    const currentTime = Date.now();
    if (currentTime > token_expiry) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // If everything is valid
    // Clear the token from the database
    await req.db.query('UPDATE users SET reset_token = NULL, token_expiry = NULL WHERE email = ?', [email]);
    return res.json({ message: 'Token verified successfully. You can now reset your password.' });

  } catch (err) {
    console.error('Error verifying token:', err.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});




router.post("/reset-password", async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  try {
    // Validate input
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required. BE" });
    }

    // Ensure newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Fetch the user from the database
    const userRes = await req.db.query("SELECT password, first_name FROM users WHERE email = ?", [email]);
    const user = userRes[0];

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const currentHashedPassword = user.password;

    // Check if the new password is the same as the old password
    const isSamePassword = await bcrypt.compare(newPassword, currentHashedPassword);
    if (isSamePassword) {
      return res.status(400).json({ message: "New password cannot be the same as the old password." });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password in the database
    await req.db.query("UPDATE users SET password = ? WHERE email = ?", [hashedNewPassword, email]);

     // Configure the email transporter
     const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'judddex8@gmail.com',
        pass: 'opzq xwle zgms bvob',
      },
    });

    // Send the email
    const mailOptions = {
      from: '"Restock" <auth@restock.com>',
      to: email,
      subject: 'Your Password been Changed',
      

      text: `Hi ${user.first_name},\n\nYour password has been changed successfully. If you did not request this, please notify us at support@restockapp.com. Thank you for using our service.`,
      html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #c8f3e6; /* Light primary */
              color: #333333; /* Gray dark */
            }
            .email-container {
              max-width: 600px;
              margin: 30px auto;
              background-color: #ffffff; /* White */
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #00A57A; /* Primary */
            }
            .email-header {
              background-color: #00A57A; /* Primary */
              color: #ffffff; /* White text */
              padding: 20px;
              text-align: center;
              font-size: 24px;
              font-weight: bold;
            }
            .email-body {
              padding: 20px;
            }
            .email-body p {
              margin: 0 0 15px;
              line-height: 1.5;
              color: #333333; /* Gray dark */
            }
            .email-body strong {
              color: #015E3F; /* Secondary */
            }
            .email-footer {
              text-align: center;
              padding: 15px;
              font-size: 12px;
              color: #888888; /* Gray */
              background-color: #f9f9f9; /* Light gray for footer */
            }
            .token {
              font-size: 32px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">Password Reset</div>
            <div class="email-body">
              <p>Hi ${user.first_name},</p>
              <p>Your password has been changed successfully
              </p>
              <p>If you did not request this, please notify us at support@restockapp.com</p>
            </div>
            <div class="email-footer">
              <p>Thank you for using our service.</p>
            </div>
          </div>
        </body>
        </html>`,
    };
    await transporter.sendMail(mailOptions);
    return res.json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error resetting password:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});





// Get User Details (Protected Route)
router.get('/me', authenticateToken, async (req, res) => {
  // console.log('Route Hit!');
  try {
    const userRes = await req.db.query(
      'SELECT id, first_name, last_name, email, phone, gender, dob FROM users WHERE id = ?',
      [req.user.id]
    );
    const user = userRes[0];
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get User Details (Protected Route)
router.get('/billing-info', authenticateToken, async (req, res) => {
  // console.log('Route Hit!', req.user);
  try {
    const userRes = await req.db.query(
      'SELECT id, name, address_line1, address_line2, city, state, zip, phone_of_contact_person, country FROM billingaddresses WHERE user_id = ?',
      [req.user.id]
    );
    if (userRes.length === 0) {
      return res.status(404).json({ message: 'User billing info not found' });
    }
    const user = userRes[0];
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Google OAuth Routes
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        // Generate JWT
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Redirect or send token as response
        res.json({ token, user: req.user });
    }
);

// Facebook OAuth Routes
router.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { session: false }),
    (req, res) => {
        // Generate JWT
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Redirect or send token as response
        res.json({ token, user: req.user });
    }
);


router.post('/auth/google', async (req, res, next) => {
    passport.authenticate('google-token', { session: false }, (err, user, info) => {
        if (err) return res.status(400).json(err);
        if (!user) return res.status(404).json({ message: 'User not found' });
        // Generate JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    })(req, res, next);
});

// Facebook OAuth Handler
router.post('/auth/facebook', async (req, res, next) => {
    passport.authenticate('facebook-token', { session: false }, (err, user, info) => {
        if (err) return res.status(400).json(err);
        if (!user) return res.status(404).json({ message: 'User not found' });
        // Generate JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    })(req, res, next);
});












router.post("/update-personal-info", async (req, res) => {
  const { email, firstName, lastName, phone, gender, dob, } = req.body;
  try {
    // Check if the user exists
    const userRes = await req.db.query("SELECT id FROM users WHERE email = ?", [email]);
    const user = userRes[0];

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // Update personal information
    await req.db.query(
      "UPDATE users SET first_name = ?, last_name = ?, phone = ?, gender = ?, dob = ? WHERE email = ?",
      [firstName, lastName, phone, gender, dob, email]
    );
    return res.json({ message: "Information Saved." });
  } catch (error) {
    console.error("Error updating personal information:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});



router.post("/update-billing-info", async (req, res) => {

  const { name, email, address_line1, address_line2, city, state, phone_of_contact_person, zip, country } = req.body;

  try {
    // Check if the user exists
    const userRes = await req.db.query("SELECT id FROM users WHERE email = ?", [email]);
    const user = userRes[0];

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const userId = user.id;

    // Check if the user already has billing information
    const billingRes = await req.db.query("SELECT id FROM billingaddresses WHERE user_id = ?", [userId]);
    
    if (billingRes.length > 0) {
      // Update existing billing information
      await req.db.query(
        "UPDATE billingaddresses SET name = ?, address_line1 = ?, address_line2 = ?, city = ?, state = ?, phone_of_contact_person = ?, zip = ?, country = ? WHERE user_id = ?",
        [name, address_line1, address_line2, city, state, phone_of_contact_person, zip, country, userId]
      );
      return res.json({ message: "Billing information updated successfully." });
    } else {
      // Insert new billing information
      await req.db.query(
        "INSERT INTO billingaddresses (user_id, name, address_line1, address_line2, city, state, phone_of_contact_person, zip, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [userId, name, address_line1, address_line2, city, state, phone_of_contact_person, zip, country]
      );
      return res.json({ message: "Billing information added successfully." });
    }
  } catch (error) {
    console.error("Error updating billing information:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});





router.post("/add-payment-method", async (req, res) => {
  const { userId, cardNumber, expDate, cvv, cardHolderName } = req.body;
  // console.log("TARGET HIT!", req.body);
  try {
    // Validate input
    if (!userId || !cardNumber || !expDate || !cvv || !cardHolderName) {
      return res.status(400).json({ message: "All fields are required." });
    }
    // Check if the user exists
    const userRes = await req.db.query("SELECT id FROM users WHERE id = ?", [userId]);
    const user = userRes[0];
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // Encrypt sensitive payment information
    const saltRounds = 10;
    const hashedCardNumber = await encrypt(cardNumber);
    const hashedCVV = await bcrypt.hash(cvv, saltRounds);
    const hashedExpiryDate = await bcrypt.hash(expDate, saltRounds);
    // Store encrypted payment details in the database
    await req.db.query(
      "INSERT INTO cards (user_id, card_number, expiry_date, cvv, card_holder_name) VALUES (?, ?, ?, ?, ?)",
      [userId, hashedCardNumber, hashedExpiryDate, hashedCVV, cardHolderName]
    );
    return res.json({ message: "Payment method added successfully." });
  } catch (error) {
    console.error("Error adding payment method:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});







module.exports = router;

// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');



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
  const { emailOrPhone, firstName, lastName, password} = req.body;
  try {
    let userExists;
    if (emailOrPhone.includes('@')) {
      userExists = await req.db.query('SELECT * FROM Users WHERE email = ?', [emailOrPhone]);
    } else {
      userExists = await req.db.query('SELECT * FROM Users WHERE phone = ?', [emailOrPhone]);
    }
    if (userExists[0]) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
     // Insert new user based on the type of input
    if (emailOrPhone.includes('@')) {
      await req.db.query('INSERT INTO Users (email, phone, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)', [emailOrPhone, null, hashedPassword, firstName, lastName]);
    } else {
      await req.db.query('INSERT INTO Users (phone, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)', [emailOrPhone, null, hashedPassword, firstName, lastName]);
    }
    // Retrieve the newly created user
    const newUserRes = await req.db.query(
      'SELECT * FROM Users WHERE email = ? OR phone = ?', [emailOrPhone, emailOrPhone]
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
  const { emailOrPhone, password } = req.body;
  // console.log(req.body);
  try {
    // Check if user exists
    let userRes = await req.db.query('SELECT * FROM users WHERE email = ?', [emailOrPhone]);
    
    // Check if phone number exists
    if (!userRes[0]) {
      userRes = await req.db.query('SELECT * FROM users WHERE phone = ?', [emailOrPhone]);
    }
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
router.post('/recover-password', async (req, res) => {
  const { email } = req.body;
  try {
    // Check if user exists
    const userRes = await req.db.query('SELECT * FROM Users WHERE email = ?', [email]);
    const user = userRes[0]; // Adjust for SQL result format

    if (user.length === 0) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // TODO: Implement email sending with a reset token
    // For simplicity, we'll assume password reset is done

    res.json({ message: 'Password recovery instructions sent to your email.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get User Details (Protected Route)
router.get('/me', authenticateToken, async (req, res) => {
  // console.log('Route Hit!');
  try {
    const userRes = await req.db.query(
      'SELECT id, name, email, phone FROM Users WHERE id = ?',
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

module.exports = router;

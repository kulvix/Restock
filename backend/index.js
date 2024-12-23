// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const passport = require('./config/passport');
// const authRoutes = require('./routes/auth');
// const serverApp = require('./routes/server');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(passport.initialize());

// // API Routes
// app.use('/', authRoutes);
// app.use('/api', serverApp);

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });




const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./config/passport');
const db = require('./db'); // Import the centralized database connection
const authRoutes = require('./routes/auth');
const serverApp = require('./routes/server');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// Middleware to attach the database to each request
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/server', serverApp);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

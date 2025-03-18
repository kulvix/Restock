
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./config/passport');
const db = require('./db'); // Import the centralized database connection
const authRoutes = require('./routes/auth');
const serverApp = require('./routes/server');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
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
app.get("/", (req, res) => res.send("Server is LIVE!"));

// Vercel requires exporting the app instead of listening on a port
module.exports = app;





// const express = require("express");
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const passport = require('./config/passport');
// const db = require('./db'); // Import the centralized database connection
// const authRoutes = require('./routes/auth');
// const serverApp = require('./routes/server');

// // Middleware
// app.use(cors({ origin: '*' }));
// // app.use(bodyParser.json());
// // app.use(passport.initialize());

// // // Middleware to attach the database to each request
// // app.use((req, res, next) => {
// //     req.db = db;
// //     next();
// // });


// // Routes
// app.use('/auth', authRoutes);
// app.use('/server', serverApp);

// app.get("/", (req, res) => res.send("Express on Vercel test with auth"));
// // app.listen(3001, () => console.log("Server ready on port 3000."));

// module.exports = app;

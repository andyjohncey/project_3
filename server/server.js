const express = require("express");
// const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const routes = require("../routes");
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const passport = require('./passport')
const PORT = process.env.PORT || 3001;
const app = express();

// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
    console.log('loading dev environments')
    require('dotenv').config()
}
require('dotenv').config()

// Ddefine middleware here
app.use(express.urlencoded({ exteneded: true }));
app.use(express.json());

app.use(morgan('dev'))
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(bodyParser.json())
app.use(
    session({
        secret: process.env.APP_SECRET || 'this is the default passphrase',
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false,
        saveUninitialized: false
    })
)

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//Add routes, both API and view 
app.use(routes);

// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"))
// });

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// ===== testing middleware =====
// app.use(function(req, res, next) {
// 	console.log('===== passport user =======')
// 	console.log(req.session)
// 	console.log(req.user)
// 	console.log('===== END =======')
// 	next()
// })
// testing
// app.get(
// 	'/auth/google/callback',
// 	(req, res, next) => {
// 		console.log(`req.user: ${req.user}`)
// 		console.log('======= /auth/google/callback was called! =====')
// 		next()
// 	},
// 	passport.authenticate('google', { failureRedirect: '/login' }),
// 	(req, res) => {
// 		res.redirect('/')
// 	}
// )

// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
    const path = require('path')
    console.log('YOU ARE IN THE PRODUCTION ENV')
    app.use('/static', express.static(path.join(__dirname, '../build/static')))
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../build/'))
    })
}

/* Express app ROUTING */
app.use('/auth', require('./auth'))

// ====== Error handler ====
app.use(function (err, req, res, next) {
    console.log('====== ERROR =======')
    console.error(err.stack)
    res.status(500)
})

// Connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Post", { useNewUrlParser: true });

// Start the APP server
app.listen(PORT, () => {
    console.log(`🌎 ==> App listening on PORT: ${PORT}`);
});
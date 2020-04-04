const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const isAuth = require("./middleware/is-auth");
const PORT = process.env.PORT || 3001;
const app = express();

// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
    console.log('loading dev environments')
    require('dotenv').config()
}
require('dotenv').config()

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(isAuth);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Add routes, both API and view 
app.use(routes);

// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"))
// });

// // ==== if its production environment!
// if (process.env.NODE_ENV === 'production') {
//     const path = require('path')
//     console.log('YOU ARE IN THE PRODUCTION ENV')
//     app.use('/static', express.static(path.join(__dirname, '../build/static')))
//     app.get('/', (req, res) => {
//         res.sendFile(path.join(__dirname, '../build/'))
//     })
// }


// Connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/agedcareassist");

// Start the APP server
app.listen(PORT, () => {
    console.log(`🌎 ==> App listening on PORT: ${PORT}`);
});
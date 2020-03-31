const express = require("express");
const path = require("path");

// set up the express app
const routes = require("./routes");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;



// set up the express app to handle data parsing
app.use(express.urlencoded({ exteneded: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//use apiRoutes
app.use(routes);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
});

// Connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost");

app.listen(PORT, function () {
    console.log(`🌎  ==> API server now listening on PORT ${PORT}!`);
});
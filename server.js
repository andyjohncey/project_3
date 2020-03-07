const express = require("express");
const path = require("path");

// set up the express app
const app = express();
const PORT = process.env.PORT || 8080;
const apiRoutes = require("./routes/apiRoutes");


// set up the express app to handle data parsing
app.use(express.urlencoded({ exteneded: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//use apiRoutes
app.use("/api", apiRoutes);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
});

app.listen(PORT, function () {
    console.log('🌎==> API server now on port ${PORT}!');
});
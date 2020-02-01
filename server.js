require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Parse requests of content-type: application/json
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/favicon.ico", (req, res) => {});
require("./app/routes/api.js")(app);


// Set port, listen for requests
app.listen(process.env.PORT, process.env.HOST, () => {
	console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
});
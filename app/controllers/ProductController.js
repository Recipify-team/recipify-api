const axios = require("axios");

// Controller Base Class 
const Controller = require("./Controller");

// Models
const Product = require("../models/Product");

class ProductController extends Controller {
	
	show(req, res) {
		Product.prototype.find(req.params.id, (err, data) => {
			res.json(data);
		});
	}
}

module.exports = new ProductController;
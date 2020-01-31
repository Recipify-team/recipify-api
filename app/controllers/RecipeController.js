const axios = require("axios");

// Controller Base Class 
const Controller = require("./Controller");

// Models
const Product = require("../models/Product");
const Recipe = require("../models/Recipe");

class RecipeController extends Controller {
	
	show(req, res) {
		// axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=Chicken`)
		// 		.then(function (response) {
		// 			res.json(response.data);
		// 		})
		// 		.catch(function (err) {
		// 			console.log("error: ", err);
		// 			// result(err, null);
		// 			return;
		// 		})
		// 		.finally(function () {
		// 			// always executed
		// 		});
		Product.prototype.find(req.params.id, (err, data) => {
			res.json(data);
			
		});
	}

	search(req, res) {
		Recipe.prototype.search(req.params.name, (err, data) => {
			res.json(data);
		})
	}
}

module.exports = new RecipeController;
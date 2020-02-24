const axios = require("axios");

// Controller Base Class 
const Controller = require("./Controller");

// Models
const Product = require("../models/Product");
const Recipe = require("../models/Recipe");

class RecipeController extends Controller {
	
	show(req, res) {
		Recipe.prototype.find(req.params.id, (err, data) => {
			res.json(data);
		});
	}

	search(req, res) {
		Recipe.prototype.search(req.params.name, (err, data) => {
			res.json(data);
		})
	}

	searchFromProduct(req, res) {
		Product.prototype.find(req.params.id, (err, data) => {
			const categories = data.data.categories.filter(value => value.substring(0, 2) === "en").map(value => value.substring(3));
			console.table(categories);
			let loadedCategories = 0;
			let recipes = [];

			for (const category of categories) {
				Recipe.prototype.search(category, (err, data) => {
					loadedCategories++;
					recipes.concat(data);
					console.log(recipes);
					if (categories.length <= loadedCategories) {
						res.send(recipes);
					}
				});
			}
		});
	}
}

module.exports = new RecipeController;
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
		// console.log(req.query);
		if (req.query.name) {
			Recipe.prototype.search(req.query.name, (err, data) => {
				res.json(data);
			})
		}
		else if (req.query.product) {
			Product.prototype.find(req.query.product, (err, data) => {
				const categories = data.data.categories.filter(value => value.substring(0, 2) === "en").map(value => value.substring(3));
				// console.table(categories);
				let loadedCategories = 0;
				let recipes = [];
	
				for (const category of categories) {
					Recipe.prototype.search(category, -1, 1, (err, data) => {
						loadedCategories++;
						recipes.push.apply(recipes, data);
						if (categories.length <= loadedCategories) {
							if (req.query.page && req.query.limit) {
								req.query.limit = parseInt(req.query.limit);
								req.query.page = parseInt(req.query.page);
								res.json(recipes.slice(req.query.page * req.query.limit, req.query.page * req.query.limit + req.query.limit));
							}
							else if (req.query.page) {
								req.query.page = parseInt(req.query.page);
								res.json(recipes.slice(req.query.page * 5, req.query.page * 5 + 5));
							}
							else {
								res.json(recipes);
							}
						}
					});
				}
			});
		}
	}
}

module.exports = new RecipeController;
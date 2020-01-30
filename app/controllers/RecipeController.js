const axios = require("axios");

const Controller = require("./Controller");

class RecipeController extends Controller {
	
	show(req, res) {
		console.log(req.params);
		axios.get(`https://world.openfoodfacts.org/api/v0/product/${req.params.id}.json`)
			.then(function (response) {
				// console.log(response.data);
				const product = {
					id: response.data.code,
					name: response.data.product.product_name,
					brand: response.data.product.brands
				}
				res.json(product);
			})
			.catch(function (error) {
				console.log(error);
			})
			.finally(function () {
				// always executed
			}); 
	}
}

module.exports = new RecipeController;
const axios = require("axios");
const Validator = require('validatorjs');

const Model = require("./Model");

class Product extends Model {

	static table = "";

	constructor(data) {
		super();
		this.validationRules = {
			id : 'required',
			name: 'required',
			// brand: 'required'
		}
		let validation = new Validator(data, this.validationRules);
		if (validation.passes()) {
			this.id = data.id;
			this.data = data;
		}
		if (validation.fails()) {
			console.log(validation.errors);
			throw Error('Cannot construct product with given data');
		}
	}

	create(data, result) {
		throw Error('Cannot create products');
	}

	update(data, result) {
		throw Error('Cannot update products');
	}

	delete(id, result) {
		throw Error('Cannot delete products');
	}

	deleteAll(result) {
		throw Error('Cannot delete products');
	}

	find(id, result) {
		axios.get(`https://world.openfoodfacts.org/api/v0/product/${id}.json`)
			.then(function (response) {
				const resProduct = {
					id: response.data.code,
					name: response.data.product.product_name,
					brand: response.data.product.brands,
					image: response.data.product.image_url,
					categories: response.data.product.categories_tags,
				}

				if (response.data.status === 1) {
					let product = new Product(resProduct);
					// console.log("Found: ", product);
					result(null, product);
					return;
				}

				// not found product with the id
				result({ kind: "not_found" }, null);
			})
			.catch(function (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			})
			.finally(function () {
				// always executed
			}); 
	}

	all(result) {
		throw Error('Cannot find all products');
	}
}

module.exports = Product;
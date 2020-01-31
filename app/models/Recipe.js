const axios = require("axios");
const Validator = require('validatorjs');

const Model = require("./Model");

class Recipe extends Model {

	constructor(data) {
		super();
		this.validationRules = {
			id : 'required',
			name: 'required',
			brand: 'required'
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
		throw Error('Cannot create recipes');
	}

	update(data, result) {
		throw Error('Cannot update recipes');
	}

	delete(id, result) {
		throw Error('Cannot delete recipes');
	}

	deleteAll(result) {
		throw Error('Cannot delete recipes');
	}

	search(name, result) {
		axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
			.then(function (response) {
				let recipes = [];
				for (const meal of response.data.meals) {
					recipes.push(new Recipe({
						id: meal.idMeal,
						name: meal.strMeal,
						instructions: meal.strInstructions
					}));
				}

				if (recipes.length > 0) {
					// console.log("Found: ", product);
					result(null, recipes);
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

	find(id, result) {
		axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
			.then(function (response) {
				const resRecipe = {
					id: response.data.meals[0].idMeal,
					name: response.data.meals[0].strMeal,
					instructions: response.data.meals[0].strInstructions
				}

				if (response.data.meals.length > 0) {
					let recipe = new Recipe(resRecipe);
					// console.log("Found: ", product);
					result(null, recipe);
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
		throw Error('Cannot find all recipes');
	}
}

module.exports = Product;
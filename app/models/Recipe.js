const axios = require("axios");
const Validator = require('validatorjs');

const Model = require("./Model");

const db = require("./db");

class Recipe extends Model {

	static table = "recipe";

	constructor(data) {
		super();
		this.validationRules = {
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
		db.query(`SELECT * FROM ${Recipe.table} WHERE ingredients LIKE '%${name}%'`, (err, res) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}

			if (res.length) {
				let recipes = [];
				for (const recipe of res) {
					recipes.push(new Recipe(recipe));
				}
				console.log("Found: ", recipes);
				result(null, recipes);
				return;
			}

			// not found row with the id
			result({ kind: "not_found" }, null);
		});
	}

	find(id, result) {
		axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
			.then(function (response) {
				const resRecipe = {
					id: response.data.meals[0].idMeal,
					name: response.data.meals[0].strMeal,
					instructions: response.data.meals[0].strInstructions,
					image: response.data.meals[0].strMealThumb,
					source: response.data.meals[0].strSource,
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

module.exports = Recipe;
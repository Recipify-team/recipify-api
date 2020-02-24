
// Controllers:
const recipe = require("../controllers/RecipeController");
const product = require("../controllers/ProductController");

module.exports = app => {
	// Routes:
	app.get("/product/:id", product.show);
	app.get("/recipe/product/:id", recipe.searchFromProduct);
	app.get("/recipe/:name", recipe.search);
};
module.exports = app => {
	// const customers = require("../controllers/customer.controller.js");
	const recipe = require("../controllers/RecipeController");
  
	// // Create a new Customer
	// app.post("/customers", customers.create);
  
	// // Retrieve all Customers
	// app.get("/customers", customers.findAll);
  
	// // Retrieve a single Customer with customerId
	// app.get("/customers/:customerId", customers.findOne);
  
	// // Update a Customer with customerId
	// app.put("/customers/:customerId", customers.update);
  
	// // Delete a Customer with customerId
	// app.delete("/customers/:customerId", customers.delete);
  
	// // Create a new Customer
	// app.delete("/customers", customers.deleteAll);

	// app.get("/", (req, res) => {
	// 	res.json({ message: "Welcome to Recipify API." });
	// })
	app.get("/product/:id", recipe.show);
	app.get("/recipe/:name", recipe.search);
};
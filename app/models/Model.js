const Validator = require('validatorjs');

const db = require("./db");

class Model {

	constructor() {
		this.validationRules = {};
		this.table = "";
	}

	create(data, result) {
		let validation = new Validator(data, this.validationRules);
		if (validation.passes()) {
			db.query(`INSERT INTO ${this.table} SET ?`, data, (err, res) => {
				if (err) {
					console.log("error: ", err);
					result(err, null);
					return;
				}

				console.log("Created: ", { id: res.insertId, ...data });
				result(null, { id: res.insertId, ...data });
			});
		}
		else {
			console.log(validation.errors);
		}
	}.bind(this);

	update(data, result) {
		let validation = new Validator(data, this.validationRules);
		if (validation.passes()) {
			db.query(`UPDATE ${this.table} SET ?`, data, (err, res) => {
				if (err) {
					console.log("error: ", err);
					result(err, null);
					return;
				}

				if (res.affectedRows == 0) {
					// not found row with the id
					result({ kind: "not_found" }, null);
					return;
				}

				console.log("Updated: ", { id: id, ...data });
				result(null, { id: id, ...data });
			});
		}
		else {
			console.log(validation.errors);
		}
	}

	delete(id, result) {
		db.query(`DELETE FROM ${this.table} WHERE id = ?`, id, (err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found row with the id
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("Deleted with id: ", id);
			result(null, res);
		});
	}

	deleteAll(result) {
		db.query("DELETE FROM customers", (err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			console.log(`Deleted ${res.affectedRows}`);
			result(null, res);
		});
	}

	find(id) {
		db.query(`SELECT * FROM ${this.table} WHERE id = ${id}`, (err, res) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}

			if (res.length) {
				console.log("Found: ", res[0]);
				result(null, res[0]);
				return;
			}

			// not found row with the id
			result({ kind: "not_found" }, null);
		});
	}

	all() {
		db.query(`SELECT * FROM ${this.table}`, (err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			console.log(`${this.table}: `, res);
			result(null, res);
		});
	}
}

module.exports = Model;
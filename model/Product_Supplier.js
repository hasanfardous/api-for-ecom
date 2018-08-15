const mongoose = require('mongoose');

const supplier_schema = new mongoose.Schema(
{
	name: {
		type: String,
		required: "Supplier name is Required!"
	},
	description: {
		type: String,
		required: "Supplier description is Required!"
	}
},
{
	timestamps: true
}
);

module.exports = mongoose.model('Product_Supplier', supplier_schema);
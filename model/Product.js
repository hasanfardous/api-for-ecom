const mongoose = require('mongoose');

const product_schema = new mongoose.Schema(
{
	name: {
		type: String,
		required: "Product name is Required!"
	},
	category: {
		type: String,
		required: "Category is required!"
	},
	supplier: {
		type: String,
		required: "Supplier is required!"
	},
	price: {
		type: String,
		required: "Price is required!"
	},
	negotiable: {
		type: String,
		required: "Negotiable is required!"
	},
	image: {
		type: String,
		required: "Image is required!"
	},
	description: {
		type: String,
		required: "Product description is Required!"
	}
},
{
	timestamps: true
}
);

module.exports = mongoose.model('Product', product_schema);
const mongoose = require('mongoose');

const product_schema = new mongoose.Schema(
{
	name: {
		type: String,
		required: "Product name is Required!"
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
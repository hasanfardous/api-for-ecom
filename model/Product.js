const mongoose = require('mongoose');

const product_schema = new mongoose.Schema(
{
	name: {
		type: String,
		required: "Product name is Required!"
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
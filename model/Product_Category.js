const mongoose = require('mongoose');

const category_schema = new mongoose.Schema(
{
	name: {
		type: String,
		required: "Category name is Required!"
	},
	description: {
		type: String,
		required: "Category description is Required!"
	}
},
{
	timestamps: true
}
);

module.exports = mongoose.model('Product_Category', category_schema);
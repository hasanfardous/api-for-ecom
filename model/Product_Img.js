const mongoose = require('mongoose');

const product_img_schema = new mongoose.Schema(
{
	path: {
		type: String,
		required: "Image path is required!"
	}
},
{
	timestamps: true
}
);

module.exports = mongoose.model('ProductImg', product_img_schema);
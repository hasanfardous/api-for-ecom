const mongoose = require('mongoose');

const users_schema = new mongoose.Schema(
{
	name: {
		type: String,
		required: "Username is Required!"
	},
	password: {
		type: String,
		required: "Password is Required!"
	}
},
{
	timestamps: true
}
);

module.exports = mongoose.model('User', users_schema);
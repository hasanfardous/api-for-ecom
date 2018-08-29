const mongoose = require("mongoose");
const mongoDBErrors = require('mongoose-mongodb-errors');
require("dotenv").config();
mongoose.Promise = global.Promise;
mongoose.plugin(mongoDBErrors);
mongoose.connect('mongodb://127.0.0.1:27017/sim-ecom');
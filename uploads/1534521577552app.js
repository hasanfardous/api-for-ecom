const express = require('express');
require('express-async-errors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//DB Connection
require('./mongo');

//Models
require('./model/Users');
require('./model/Product');
require('./model/Product_Img');
require('./model/Product_Category');
require('./model/Product_Supplier');

//Middleware
app.use(bodyParser.json())
	.use(morgan());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Routes
app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));
app.use('/suppliers', require('./routes/suppliers'));

//While routes goes to wrong
// app.use((req, res, next) => {
//     req.status = 404;
//     const error = new Error('Routes not found!');
//     next(error);
// });

// // Error handler
// if(app.get('env') === 'production'){
//     app.use((error, req, res, next) => {
//         res.status(req.status || 500).send({
//             message: error.message
//         });
//     });
// }

// app.use((error, req, res, next) => {
//     res.status(req.status || 500).send({
//         message: error.message,
//         stack: error.stack
//     });
// });


//Server
app.listen(3002, () => {
	console.log('Server is running on port 3002');
});
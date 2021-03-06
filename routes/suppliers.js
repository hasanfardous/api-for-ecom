const router = require('express').Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Product_Supplier = mongoose.model('Product_Supplier');  

//get all product Suppliers
router.get('/', async(req, res) => {
    const suppliers = await Product_Supplier.find({}, (err, all_suppliers) => {
        if (err) throw err;

        res.status(200).send({error: false, all_suppliers});
    });
});

//Add new product supplier
router.post('/add_new', async(req, res) => {
	var supp_name = req.body.name;
	var supp_description = req.body.description;

	if (supp_name !== '' && supp_description !== '') {
            
            const supp_add = new Product_Supplier();
            supp_add.name = supp_name;
            supp_add.description = supp_description;
            await supp_add.save((err) =>{
                if (err) throw err;
                res.status(200).send({error: false, message: 'Supplier has been added successfully!'});
            });
               
	} else {
		res.status(200).send({error: true, message: 'Supplier Name Or Supplier Description can\'t be blank!'});
	}
	
});

//Update product supplier
router.post('/update', async(req, res) => {
	var supp_id = req.body._id;
	var supp_name = req.body.name;
	var supp_description = req.body.description;

	if (supp_name !== '' && supp_description !== '') {
            
            const supp_update = await Product_Supplier.findByIdAndUpdate({
                _id: supp_id
            }, req.body, {
                new: true,
                runValidators: true
            });
            res.status(200).send({error: false, message: 'Supplier has been updated successfully!'});
               
	} else {
		res.status(200).send({error: true, message: 'Supplier Name Or Supplier Description can\'t be blank!'});
	}
	
});


//Delete product supplier
router.post('/delete', async(req, res) => {
	var supp_id = req.body._id;

	if (supp_id) {
        const supp_delete = await Product_Supplier.findByIdAndRemove({
            _id: supp_id
        });
        res.status(200).send({error: false, message: 'Supplier has been deleted successfully!'});
               
	} else {
		res.status(200).send({error: true, message: 'Must select an id!'});
	}
	
});

function verifyToken(req, res, next){
	const bearerHeader = req.headers['authorization'];
	if(typeof bearerHeader !== 'undefined'){
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		return req.token = bearerToken;

		next();
	}else{
		res.status(200).send({error: true, message: 'Invalid token passed!'});
	}

	
}

// //Record a new user
// router.post('/register', async (req, res) => {
// 	const user = new User();
// 	user.name = req.body.name;
// 	user.password = req.body.password;
// 	await user.save();
// 	res.send(user);
// });

// //Update a user
// router.put('/update/:userId', async (req, res) => {
// 	const user = await User.findByIdAndUpdate({
// 		_id: req.params.userId
// 	}, req.body, {
// 		new: true,
// 		runValidators: true
// 	});
// 	res.send(user);
// });

// //Delete a user
// router.delete('/delete/:userId', async (req, res) => {
// 	const user = await User.findByIdAndRemove({
// 		_id: req.params.userId
// 	});
// 	res.send(user);
// });


module.exports = router;
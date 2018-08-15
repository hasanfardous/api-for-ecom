const router = require('express').Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Product_Category = mongoose.model('Product_Category');  

//get all product categories
router.get('/category', async(req, res) => {
    const categories = await Product_Category.find({}, (err, all_cats) => {
        if (err) throw err;

        res.status(200).send({error: false, all_cats});
    });
});

//Add new product category
router.post('/category/add_new', async(req, res) => {
	var cat_name = req.body.name;
	var cat_description = req.body.description;

	if (cat_name !== '' && cat_description !== '') {

            // jwt.verify(req.token, 'secretkey', (err, authData) =>{
            //     if (err) {
            //         res.status(200).send({error: true, message: 'Token invalid!'});
            //     } else {
            //         const cat_add = new Product_Category();
            //         cat_add.name = cat_name;
            //         cat_add.description = cat_description;
            //         await cat_add.save((err) =>{
            //             if (err) throw err;
            //             res.status(200).send({error: false, message: 'Category has been added successfully!', authData});
            //         });
            //     }
            // });

            
            const cat_add = new Product_Category();
            cat_add.name = cat_name;
            cat_add.description = cat_description;
            await cat_add.save((err) =>{
                if (err) throw err;
                res.status(200).send({error: false, message: 'Category has been added successfully!'});
            });
               
	} else {
		res.status(200).send({error: true, message: 'Category Name Or Category Description can\'t be blank!'});
	}
	
});

//Update product category
router.post('/category/update', async(req, res) => {
	var cat_id = req.body._id;
	var cat_name = req.body.name;
	var cat_description = req.body.description;

	if (cat_name !== '' && cat_description !== '') {
            
            const cat_update = await Product_Category.findByIdAndUpdate({
                _id: cat_id
            }, req.body, {
                new: true,
                runValidators: true
            });
            res.status(200).send({error: false, message: 'Category has been updated successfully!'});
               
	} else {
		res.status(200).send({error: true, message: 'Category Name Or Category Description can\'t be blank!'});
	}
	
});


//Delete product category
router.post('/category/delete', async(req, res) => {
	var cat_id = req.body._id;

	if (cat_id) {
        const cat_delete = await Product_Category.findByIdAndRemove({
            _id: cat_id
        });
        res.status(200).send({error: false, message: 'Category has been deleted successfully!'});
               
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
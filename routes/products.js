const router = require('express').Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const multer = require('multer');
const Product = mongoose.model('Product');  
const ProductImg = mongoose.model('ProductImg');  
const Product_Category = mongoose.model('Product_Category');  

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//get all products
router.get('/', async(req, res) => {
    const products = await Product.find({}, (err, all_products) => {
        if (err) throw err;

        res.status(200).send({error: false, all_products});
    });
});

//Add new product
router.post('/add_new', upload.single('singleImage'), async(req, res) => {
	var product_name = req.body.name;
	var product_image = req.file.path;
	var product_description = req.body.description;

	if (product_name && product_description) {

            const product_add = new Product();
            product_add.name = product_name;
            product_add.image = product_image;
            product_add.description = product_description;
            await product_add.save((err) =>{
                if (err) throw err;
                res.status(200).send({error: false, message: 'Product has been added successfully!'});
            });
               
	} else {
		res.status(200).send({error: true, message: 'Fields can\'t be blank!'});
	}
	
});

//Add product image
// router.post('/add_image', async(req, res) => {
// 	var productImg = req.body.image;

// 	if (productImg) {

//             const img_add = new ProductImg();
//             img_add.path = productImg;
//             await img_add.save((err) =>{
//                 if (err) throw err;
//                 res.status(200).send({error: false, message: 'Product image has been added successfully!'});
//             });
               
// 	} else {
// 		res.status(200).send({error: true, message: 'Image path field can\'t be blank!'});
// 	}
	
// });

//Update product
router.post('/update', async(req, res) => {
	var product_id = req.body._id;
	var product_name = req.body.name;
	var product_description = req.body.description;

	if (product_name && product_description) {
            
            const product_update = await Product.findByIdAndUpdate({
                _id: product_id
            }, req.body, {
                new: true,
                runValidators: true
            });
            res.status(200).send({error: false, message: 'Product has been updated successfully!'});
               
	} else {
		res.status(200).send({error: true, message: 'Fields can\'t be blank!'});
	}
	
});


//Delete product
router.post('/delete', async(req, res) => {
	var product_id = req.body._id;

	if (product_id) {
        const product_delete = await Product.findByIdAndRemove({
            _id: product_id
        });
        res.status(200).send({error: false, message: 'Product has been deleted successfully!'});
               
	} else {
		res.status(200).send({error: true, message: 'Must select an id!'});
	}
	
});


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

	if (cat_name && cat_description) {

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

	if (cat_name && cat_description) {
            
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
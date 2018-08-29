const router = require('express').Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');  

//User Login
router.post('/login', async (req, res) => {
	var username = req.body.username;
	var password = req.body.password;

	if (username && password) {
		const user = await User.findOne({name: username, password: password}, (err, userInfo) =>{
			if (err) throw err;

			if (!userInfo) {
				res.status(200).send({error: true, message: 'Username or Password is wrong!'});
			} else{
				jwt.sign({userInfo}, 'secretkey', (err, token) =>{
					res.status(200).send({error: false, message: 'Logged in Successfully!', token: token});
				});
				
			};
		});
	} else {
		res.status(200).send({error: true, message: 'Username or Password can\'t be blank!'});
	}
	
});


//Record a new user
router.post('/register', async (req, res) => {
	var username = req.body.username;
	var password = req.body.password;

	if (username && password) {
		const add_user = new User();

		add_user.name = username;
		add_user.password = password;
		await add_user.save()
		.then(data => {
			res.status(200).send({error: false, message: 'New user created!'})
		})
		.catch(err => {
			res.status(200).send({error: true, message: err})
		});
			
	} else {
		res.status(200).send({error: true, message: 'Username or Password can\'t be blank!'});
	}
	
});


//Get all users
router.get('/', async (req, res) => {

	const all_users = await User.find({}, (err, all_users) => {
		if (err) throw err;

		if (all_users) {
			res.status(200).send({error: false, all_users});
		} else {
			res.status(200).send({error: true, message: 'No user found!'});
		}
	});
	
});

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
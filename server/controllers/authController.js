const User = require('../models/User');

const { sign, verify } = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const existUser = await User.findOne({ email });

		if (existUser) {
			return res.status(400).json({
				message:
					'You were already this site member. Please login',
			});
		}

		const newUser = new User({ username, email, password });
		await newUser.save();

		return res.status(201).json({
			message: 'Signup successfully!! Please login.',
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				message: 'Email address or Password does not match',
			});
		}

		const isValidPassword = await user.comparePassword(
			password
		);
		if (!isValidPassword) {
			return res.status(400).json({
				message: 'Email address or Password does not match',
			});
		}

		const payload = { id: user._id, name: user.username };

		const token = sign(payload, JWT_SECRET, {
			expiresIn: '1h',
		});

		return res
			.status(200)
			.json({ message: 'Login successfully!!!', token });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.verifiedUser = async (req, res) => {
	try {
		const token = req.header('Authorization');
		if (!token) {
			return res.send(false);
		}
		verify(token, JWT_SECRET, async (err, verified) => {
			if (err) return res.send(false);

			const user = await User.findById(verified.id);
			if (!user) return res.send(false);

			return res.send(true);
		});
	} catch (error) {
		return res.send(false);
	}
};

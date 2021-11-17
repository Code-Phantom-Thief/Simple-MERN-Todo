const { verify } = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization');
		if (!token) {
			return res.status(403).json({
				message: 'Invalid Authentication',
			});
		}
		verify(token, JWT_SECRET, (err, payload) => {
			if (err) {
				return res.status(403).json({
					message: 'Authorization not valid',
				});
			}
			req.user = payload;
			next();
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

module.exports = auth;

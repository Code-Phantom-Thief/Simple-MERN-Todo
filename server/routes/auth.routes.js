const router = require('express').Router();
const {
	registerUser,
	loginUser,
	verifiedUser
} = require('../controllers/authController');
const Validator = require('../middlewares/Validator');

router.post('/register', Validator('register'),registerUser);
router.post('/login', Validator('login'),loginUser);
router.get('/verify', verifiedUser);

module.exports = router;

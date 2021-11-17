const router = require('express').Router();
const {
	getAllTodos,
	createTodo,
	getATodo,
	updateTodo,
	deleteTodo,
} = require('../controllers/todoController');
const Validator = require('../middlewares/Validator');
const auth = require('../middlewares/Auth');

router
	.route('/')
	.get(auth, getAllTodos)
	.post(auth, Validator('todo'), createTodo);
router
	.route('/:id')
	.get(auth, getATodo)
	.put(auth, updateTodo)
	.delete(auth, deleteTodo);

module.exports = router;

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const http = require('http');
const createHttpError = require('http-errors');

const app = express();
const httpServer = http.createServer(app);

const connectDB = require('./config/db');

const authRouter = require('./routes/auth.routes');
const todoRouter = require('./routes/todo.routes');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(
	cors({
		origin: [
			'http://localhost:3000',
			'https://simple-mern-todo.netlify.app',
		],
		credentials: true,
	})
);
app.use(helmet());

connectDB();

app.get('/', (req, res) => {
    res.status(200).json({message: 'This API works correctlly!!!'})
})

app.use('/api/auth', authRouter);
app.use('/api/todos', todoRouter);

app.use((req, res, next) => {
    next(createHttpError(404))
})

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		message: err.message,
	});
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
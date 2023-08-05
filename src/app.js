const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const userRouter = require('./routes/usersRoute')
const transferRouter = require('./routes/transferRoute')

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV = 'development') {
    app.use(morgan('dev'));
}

//routes

app.use('/api/v1/users', userRouter);
app.use('/api/v1/transfer', transferRouter);

app.all('*', (req, res, next) => {
    return next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler);

module.exports = app;
const User = require('../models/userModel')
const accountNumberGeneretor = require("../utils/accountNumberGenerator");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require('bcryptjs');
const generateJWT = require("../utils/jwt");
const AppError = require('../utils/appError');


exports.signup = catchAsync(async (req, res, next) => {
    const { name, password } = req.body;

    const accountNumber = accountNumberGeneretor();

    const user = await User.create({
        name,
        password,
        accountNumber,
    })

    const token = await generateJWT(user.id);


    return res.status(201).json({
        status: 'success',
        token,
        user,
    })

})
exports.login = catchAsync(async (req, res, next) => {
    const { password } = req.body;
    const { user } = req;
    if (!(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Incorrect account number or password'));
    }

    const token = await generateJWT(user.id);

    res.status(200).json({
        status: 'success',
        token,
        user,
    })
});
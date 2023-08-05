const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync")

exports.validUser = catchAsync(async (req, res, next) => {
    const { accountNumber } = req.body;

    const user = await User.findOne({
        where: {
            accountNumber,
            status: 'active',
        },
    });

    if (!user)
        return next(
            new AppError(`user with accountNumber: ${accountNumber} not found`)
        );

    req.user = user;
    next();
})
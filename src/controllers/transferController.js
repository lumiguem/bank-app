const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const UserService = require("../services/userService");
const TransferService = require("../services/transferService");

const userService = new UserService();
const transferService = new TransferService();

exports.transfer = catchAsync(async (req, res, next) => {
    const { amount, accountNumberTransfer, accountNumberReceiver } = req.body;

    if (accountNumberReceiver === accountNumberTransfer) {
        return next(new AppError('The sender account cannot be the same as the destination account'))
    }

    const sendingUser = await userService.findOne(accountNumberTransfer);

    const receivingUser = await userService.findOne(accountNumberReceiver);

    if (sendingUser.amount < amount) {
        return next(new AppError('insufficient funds'));
    }

    const amountSendingUser = sendingUser.amount - amount;
    const amountReceivingUser = receivingUser.amount + amount;

    const updateSendingUserPromise = userService.updateAmount(
        sendingUser,
        amountSendingUser
    );
    const updateReceivingUserPromise = userService.updateAmount(
        receivingUser,
        amountReceivingUser
    );

    const transferPromise = transferService.create({
        amount,
        senderUserId: sendingUser.id,
        receiverUserId: receivingUser.id
    })

    await Promise.all([
        updateReceivingUserPromise,
        updateSendingUserPromise,
        transferPromise,
    ]);

    return res.status(201).json({
        status: 'success',
        message: 'Transfer done correctly'

    })
})
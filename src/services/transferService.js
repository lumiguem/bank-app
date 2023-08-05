const Transfer = require("../models/transferModel");


class TransferService {
    async create(transferData) {

        try {
            return await Transfer.create(transferData)
        } catch (error) {
            throw Error('Something went very wrong!');
        }

    }
}

module.exports = TransferService
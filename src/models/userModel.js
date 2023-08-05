const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const bcrypt = require('bcryptjs');

const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    accountNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1000,
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
    },
},
    {
        hooks: {
            beforeCreate: async (user) => {
                const salt = await bcrypt.genSalt(10)
                const secretPassword = await bcrypt.hash(user.password, salt);
                user.password = secretPassword;
            }
        }
    }
)

module.exports = User;
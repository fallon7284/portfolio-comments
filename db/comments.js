const db = require('./database')
const Sequelize = require('sequelize')

const Comments = db.define('comments', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    isReplyTo: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

})

module.exports = Comments
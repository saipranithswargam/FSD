const { Sequelize} = require("sequelize")

const sequelize = new Sequelize('chs', 'user', 'pass', {
    dialect: 'sqlite',
    host: "./chs.sqlite"
})


module.exports = sequelize;
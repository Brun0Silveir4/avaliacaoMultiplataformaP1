const Sequelize = require('sequelize')
const sequelize = new Sequelize('avaliacao', 'root', '', {
    host: 'localhost', 
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
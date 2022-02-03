const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Category = sequelize.define('categories', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
}, { timestamps: false })

module.exports = Category
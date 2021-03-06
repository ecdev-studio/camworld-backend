const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Spec = sequelize.define('spec', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  key: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  productId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
}, {timestamps: false});

module.exports = Spec;
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Product = sequelize.define('product', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sku: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  youtubeEmbed: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  categoryId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  rating: {
    allowNull: true,
    type: Sequelize.INTEGER,
  },
  numReviews: {
    allowNull: true,
    type: Sequelize.INTEGER,
  },
}, {timestamps: true});

module.exports = Product;
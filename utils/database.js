const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const DB_NAME = process.env.DB_NAME;
const USER_NAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASS;
const HOST = process.env.DB_HOST;
const PORT = 5432;

const sequelizeDB = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres',
  logging: false,
  language: 'en',
});

module.exports = sequelizeDB;

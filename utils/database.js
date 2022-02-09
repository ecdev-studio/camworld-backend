const Sequelize = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()
const DB_NAME = process.env.DB_NAME
const USER_NAME = process.env.DB_USER
const PASSWORD = process.env.DB_PASS
const HOST = process.env.DB_HOST
const PORT = process.env.DB_PORT

const sequelizeDB = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres',
  logging: console.log,
  // logging: false,
  maxConcurrentQueries: 100,
  ssl: 'Amazon RDS',
  pool: { maxConnections: 5, maxIdleTime: 300 },
  language: 'en',
})

module.exports = sequelizeDB
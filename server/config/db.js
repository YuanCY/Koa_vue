// 创建sequelize并与数据库连接
const Sequelize = require('sequelize')
const config = require('./config')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: 'mysql', // 数据库名称，mysql
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
})

module.exports = sequelize

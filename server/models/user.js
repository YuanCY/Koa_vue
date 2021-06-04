const initModels = require('../schema/init-models')
const db = require('../config/db')

const models = initModels(db) // 依据sequelize-auto自动生成的model

/**
 * 通过传入用户uid，在数据库中查找id为uid的，返回用户名字
 * @param {int} uid 用户id
 * @returns {string} name 用户名
 */
async function getNameById(uid) {
  if (uid !== undefined) {
    const name = await models.users.findOne({
      where: {
        id: uid
      }
    })
    return name
  }
}
/**
 * 该函数为获取数据库数据，根据不同参数返回不同结果
 * @param {*} pagenum 当前页码 不能为空
 * @param {*} pagesize 每页显示条数
 * @param {*} query 查询参数 可以为空
 * @returns users, 按要求返回的用户
 */
async function getAllUser(pagenum, pagesize, query) {
  const num = parseInt(pagenum) // 传入的参数为string类型，需要转换为number类型
  const size = parseInt(pagesize)
  const users = await models.users.findAll({
    offset: (num - 1) * size, // offset是跳过多少条数据
    limit: size // limit是查询多少条数据
  })
  return users
}

/**
 * 通过用户的名字，在数据库中获取user信息
 * @param { string } uName 用户的用户名
 * @returns { * } user 用户信息
 */
async function getUserByName(uName) {
  if (uName !== undefined) {
    const user = await models.users.findOne({
      where: {
        username: uName
      }
    })
    return user
  }
}
async function addUser(userObj) {
  if (userObj !== undefined) {
    const user = await models.users.create(userObj)
    return user
  }
}
module.exports = {
  getNameById,
  getUserByName,
  getAllUser,
  addUser
}

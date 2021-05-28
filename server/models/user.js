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
  addUser
}

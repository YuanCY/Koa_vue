const initModels = require('../schema/init-models')
const db = require('../config/db')

const models = initModels(db) // 依据sequelize-auto自动生成的model

/**
 * 通过传入用户uid，在数据库中查找id为uid的，返回用户名字
 * @param {int} uid 用户id
 * @returns {string} name 用户名
 */
async function getNameById(uid) {
  const name = await models.users.findOne({
    where: {
      id: uid
    }
  })
  return name
}

module.exports = {
  getNameById
}

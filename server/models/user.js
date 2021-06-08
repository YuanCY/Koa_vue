const initModels = require('../schema/init-models')
const db = require('../config/db')
const Sequelize = require('sequelize')
const models = initModels(db) // 依据sequelize-auto自动生成的model
const Op = Sequelize.Op
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
      },
      attributes: ['username', 'id', 'email', 'phone', 'createTime', 'updateTime'] // attributes，在里面写入你需要返回的字段即可，其他字段就可以过滤掉了
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
  const where = {
    username: {
      [Op.like]: `%${query.trim()}%` // 模糊搜索，在username中模糊搜索 trim()可以去除字符串前后空格
    }
  }
  const users = await models.users.findAll({
    where,
    offset: (num - 1) * size, // offset是跳过多少条数据
    limit: size, // limit是查询多少条数据
    attributes: ['username', 'id', 'email', 'phone', 'createTime', 'updateTime'] // attributes，在里面写入你需要返回的字段即可，其他字段就可以过滤掉了
  })
  const total = await models.users.findAndCountAll()
  return {
    users: users,
    pagenum: num,
    total: total.count
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

/**
 * 添加一名用户
 * @param {*} userObj 用户对象，储存有用户名，密码等。
 * @returns 返回用户信息
 */
async function addUser(userObj) {
  if (userObj !== undefined) {
    const createInfo = await models.users.create(userObj)
    return createInfo
  }
}

async function editUser(userObj) {
  if (userObj !== undefined) {
    const editInfo = await models.users.update(userObj, {
      where: {
        id: userObj.id
      }
    })
    return editInfo
  }
}

/**
 * 提供id给函数，函数在数据库中删除对应
 * @param {*} uid 用户的id
 * @returns 返回删除的信息
 */
async function deleteUserInfo(uid) {
  if (uid !== undefined) {
    const deleteInfo = await models.users.destroy({
      where: {
        id: uid
      }
    })
    return deleteInfo
  }
}
module.exports = {
  getNameById,
  getUserByName,
  getAllUser,
  addUser,
  editUser,
  deleteUserInfo
}

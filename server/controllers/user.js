const userModel = require('../models/user')

/**
 * 通过获取url中的id，在数据库中查找用户名，并返回到网页中
 * @param {*} ctx
 *
 */
async function getUserName(ctx) {
  const id = ctx.params.id
  const name = await userModel.getNameById(id)
  ctx.body = name
}

module.exports = {
  getUserName
}

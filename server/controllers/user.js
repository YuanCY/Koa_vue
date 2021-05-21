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

async function postUserLogin(ctx) {
  const data = ctx.request.body // 获取ctx中post传入的参数
  console.log(data)
  const userInfo = await userModel.getUserByName(data.name) // 获取从数据库中获取到的用户信息
  if (userInfo != null && userInfo.password === data.password) { // 若userInfo不为空，表示用户名正确，并且输入密码等于数据库用户密码
    // 表示登陆成功
    ctx.body = '登陆成功'
  } else if (userInfo === null) {
    // 表示用户不存在
    ctx.body = '用户不存在'
  } else {
    // 密码错误
    ctx.body = '密码错误'
  }
}

module.exports = {
  getUserName,
  postUserLogin
}

const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
// const koajwt = require('koa-jwt')
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

/**
 * login登陆校验，通过post传入username和password，针对数据库数据进行校验
 * @param {*} ctx
 */
async function postUserLogin(ctx) {
  const data = ctx.request.body // 获取ctx中post传入的参数
  console.log(data)
  const userInfo = await userModel.getUserByName(data.username) // 获取从数据库中获取到的用户信息
  if (userInfo != null && userInfo.password === data.password) { // 若userInfo不为空，表示用户名正确，并且输入密码等于数据库用户密码
    // 表示登陆成功
    const userTokenInfo = {
      name: userInfo.username,
      id: userInfo.id
    }
    const secret = 'yuanyuan'
    const token = jwt.sign(userTokenInfo, secret, { expiresIn: '3h' })
    ctx.body = {
      success: true,
      token: token,
      username: userInfo.username,
      info: '登陆成功'
    }
  } else if (userInfo === null) {
    // 表示用户不存在
    ctx.body = {
      success: false,
      info: '用户不存在'
    }
  } else {
    // 密码错误
    ctx.body = {
      success: false,
      info: '密码错误'
    }
  }
}

module.exports = {
  getUserName,
  postUserLogin
}

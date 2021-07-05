const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const moment = require('moment')
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
  /***
   * bcryptjs是nodejs中比较好的一款加盐(salt)加密的包
      bcrypt.hashSync(数据or密码) 生成hash值，加盐的hash值。
      bcrypt.compareSync(原始值(也可以理解为明文密码), 生成的hash值) 虽然每次生成的hash值都不一样，但是这个compareSync函数可以比对出密码和hash值。
      注意：此时数据库中传入的值，必须要是生成的hash值，数据库中不要加明文密码，防止因为数据库泄漏导致密码明文泄漏。
   * =====================================================
   *    const hasPwd = bcrypt.hashSync(data.password) // 生成的值每次都不一样
        const result = bcrypt.compareSync(data.password, userInfo.password)
        console.log(result)
   */

  if (userInfo !== null && bcrypt.compareSync(data.password, userInfo.password)) { // 若userInfo不为空，表示用户名正确，并且输入密码等于数据库用户密码
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
      id: userInfo.id,
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

/**
 * 通过post新增用户
 * @param {*} ctx
 */
async function postAddUser(ctx) {
  const data = ctx.request.body // 获取ctx中post传入的参数
  // 1、先校验数据库中是否有一样的用户名
  const userInfo = await userModel.getUserByName(data.regName) // 获取从数据库中获取到的用户信息
  if (userInfo === null) {
    // 2、校验无此用户后，创建用户根据用户数据输入
    // 创建用户
    const userObj = {
      username: data.regName,
      password: passwordBcrypt(data.regPassword1),
      email: data.regEmail,
      phone: data.regPhone,
      createTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      updateTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
    const addMsg = await userModel.addUser(userObj)
    if (addMsg !== null) {
      ctx.body = {
        success: true,
        msg: '创建成功'
      }
    } else {
      ctx.body = {
        success: false,
        msg: '未知异常：数据库'
      }
    }
  } else {
    ctx.body = {
      success: false,
      msg: '已经有该用户名存在'
    }
  }
}
async function putEditUser(ctx) {
  const data = ctx.request.body // 获取ctx中post传入的参数
  const userEdit = {
    id: data.id,
    username: data.username,
    email: data.email,
    phone: data.phone,
    updateTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  }
  console.log(userEdit.updateTime)
  const putEditInfo = await userModel.editUser(userEdit)
  if (putEditInfo[0] === 1) {
    ctx.body = {
      success: true,
      msg: '修改用户信息成功'
    }
  } else {
    ctx.body = {
      success: false,
      msg: '修改用户信息失败'
    }
  }
}

/**
 * 将用户密码传入进去，然后进行生成hash值，返回密码的hash值
 * @param {string} userPasswd 用户明文密码
 * @returns hashPasswd 用户密码的hash值
 */
function passwordBcrypt(userPasswd) {
  const hashPasswd = bcrypt.hashSync(userPasswd)
  return hashPasswd
}

/**
 * 通过获取get传入的参数，向数据库获取用户列表
 * @param {*} ctx
 */
async function getUserList(ctx) {
  const data = ctx.query // 获取get传入的参数
  const userList = await userModel.getAllUser(data.pagenum, data.pagesize, data.query)
  ctx.body = userList
}

/**
 * 删除指定id的用户
 * @param {*} ctx
 */
async function deleteUser(ctx) {
  const data = ctx.params
  console.log(typeof (data.id))
  const deleteInfo = await userModel.deleteUserInfo(data.id)
  // console.log(typeof (deleteInfo)) // number
  if (deleteInfo === 1) {
    console.log('删除成功')
    ctx.body = {
      success: true,
      info: '删除成功'
    }
  } else {
    console.log('删除失败')
    ctx.body = {
      success: false,
      info: '删除失败'
    }
  }
}

async function getAllIdAndName(ctx) {
  const idNameInfo = await userModel.getIdNameList()
  console.log(idNameInfo)
  ctx.body = {
    idNameInfo
  }
}

module.exports = {
  getUserName,
  postUserLogin,
  postAddUser,
  putEditUser,
  getUserList,
  deleteUser,
  getAllIdAndName
}

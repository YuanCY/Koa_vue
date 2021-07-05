const Router = require('koa-router')
const userMethod = require('../controllers/user')
const login = new Router()

login.post('/', userMethod.postUserLogin)

module.exports = login

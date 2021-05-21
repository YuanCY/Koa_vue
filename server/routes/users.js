const Router = require('koa-router')
const userMethod = require('../controllers/user')
const user = new Router()

// user.post('/')
user.get('/:id', userMethod.getUserName)
user.post('/', userMethod.postUserLogin)

module.exports = user

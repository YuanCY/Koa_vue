const Router = require('koa-router')
const userMethod = require('../controllers/user')
const user = new Router()

user.get('/', async ctx => {
  ctx.body = 'fuck'
})
user.get('/:id', userMethod.getUserName)

module.exports = user

const Router = require('koa-router')
const router = new Router()

// 导入一级路由
const user = require('./users')

router.get('/', async ctx => {
  ctx.body = 'hello index'
})

router.use('/user', user.routes(), user.allowedMethods())

module.exports = router

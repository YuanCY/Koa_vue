const Router = require('koa-router')
const router = new Router()

// 导入一级路由
const user = require('./users')
const login = require('./login')

router.get('/', async ctx => {
  ctx.body = 'hello index'
})

router.use('/user', user.routes(), user.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())

module.exports = router

const Router = require('koa-router')
const router = new Router()

// 导入一级路由
const user = require('./users')
const login = require('./login')
const article = require('./articles')

router.get('/', async ctx => {
  ctx.body = 'hello index'
})

router.use('/user', user.routes(), user.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())
router.use('/article', article.routes(), article.allowedMethods())

module.exports = router

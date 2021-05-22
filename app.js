// koa 后端服务器启动文件
// 引入依赖文件
const Koa = require('koa')
const json = require('koa-json')
const logger = require('koa-logger')
const router = require('./server/routes/index')
const cors = require('koa2-cors')

const app = new Koa()
app.use(require('koa-bodyparser')())
app.use(json())
app.use(logger())

/**
 * 显示执行的时间
 */
app.use(async (ctx, next) => {
  const startTime = new Date()
  await next()
  const endTime = new Date()
  const ms = endTime - startTime
  console.log(`${ctx.method} ${ctx.url} ${ms}ms`)
})

app.on('error', (err) => {
  console.log('server error', err)
})
app.use(cors())
app.use(router.routes(), router.allowedMethods()) // 将路由规则挂载到app上

app.listen(8889, () => {
  console.log('Koa is listening in 8889')
})
module.exports = app

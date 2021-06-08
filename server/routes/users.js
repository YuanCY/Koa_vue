const Router = require('koa-router')
const userMethod = require('../controllers/user')
const user = new Router()

// user.post('/')
user.get('/', userMethod.getUserList)
// user.post('/', userMethod.postUserLogin)
user.get('/:id', userMethod.getUserName)
user.put('/:id', userMethod.putEditUser)
user.delete('/:id', userMethod.deleteUser)
user.post('/adduser', userMethod.postAddUser)

module.exports = user

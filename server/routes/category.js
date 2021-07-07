const Router = require('koa-router')
const categoryMethod = require('../controllers/category')
const category = new Router()

category.get('/', categoryMethod.getCategoryList)
category.post('/', categoryMethod.postAddCategory)
category.delete('/:id', categoryMethod.deleteCategory)
category.put('/:id', categoryMethod.putEditCategory)

module.exports = category

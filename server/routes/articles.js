const Router = require('koa-router')
const articleMethod = require('../controllers/article')
const article = new Router()

article.get('/', articleMethod.getArticleList)
article.post('/', articleMethod.postAddArticle)
article.delete('/:id', articleMethod.deleteArticle)

module.exports = article

const Router = require('koa-router')
const articleMethod = require('../controllers/article')
const article = new Router()

article.get('/', articleMethod.getArticleList)
article.post('/', articleMethod.postAddArticle)

module.exports = article

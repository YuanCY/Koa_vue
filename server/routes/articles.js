const Router = require('koa-router')
const articleMethod = require('../controllers/article')
const article = new Router()

article.get('/', articleMethod.getArticleList)
article.get('/:id', articleMethod.getArticleInfoById)
article.post('/', articleMethod.postAddArticle)
article.put('/:id', articleMethod.putEditArticle)
article.delete('/:id', articleMethod.deleteArticle)

module.exports = article

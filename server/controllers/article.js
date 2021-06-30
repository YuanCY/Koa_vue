const articleModel = require('../models/article')
const moment = require('moment')

/**
 * 查：获取get传入参数，pagenum页码，pagesize每页内容，query搜索参数，返回数据库中文章的信息
 * @param {*} ctx
 */
async function getArticleList(ctx) {
  const data = ctx.query // 获取get传入的参数pagenum,pagesize,query
  const articleList = await articleModel.getAllArticle(parseInt(data.pagenum), parseInt(data.pagesize), data.query)
  ctx.body = {
    success: true,
    list: articleList,
    info: '获取文章成功'
  }
}

/**
 * 增：通过获取post参数，在数据库中新增一篇文章
 * @param {*} ctx
 */
async function postAddArticle(ctx) {
  const data = ctx.request.body // 获取ctx中post传入的参数
  const articleInfo = { // 创建了一个文章对象
    title: data.title,
    authorId: data.authorId,
    description: data.description,
    content: data.content,
    createAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    updateAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    image: data.image,
    isShow: data.isShow
  }
  const addArticleInfo = await articleModel.addArticle(articleInfo)
  console.log(addArticleInfo)
}
/**
 * 通过id删除指定文章
 * @param {*} ctx
 */
async function deleteArticle(ctx) {
  const data = ctx.params
  console.log(data)
  console.log(typeof (data.id))
  const deleteInfo = await articleModel.deleteArticle(data.id)
  console.log('删除信息：')
  console.log(deleteInfo)
  // console.log(typeof (deleteInfo)) // number
  if (deleteInfo === 1) {
    console.log('删除成功')
    ctx.body = {
      success: true,
      info: '删除文章成功'
    }
  } else {
    console.log('删除失败')
    ctx.body = {
      success: false,
      info: '删除失败'
    }
  }
}

module.exports = {
  getArticleList,
  postAddArticle,
  deleteArticle
}

const initModels = require('../schema/init-models')
const db = require('../config/db')
const Sequelize = require('sequelize')
const models = initModels(db)
const Op = Sequelize.Op

/**
 * 查：通过当前页码，以及每页展示数目和查询参数，获取到该页所有文章总数。
 * @param { int } pagenum 当前页码
 * @param { int } pagesize 每页展示数目
 * @param { string } query 查询参数
 * @returns 返回 total所有文章总数，以及当前页码pagenum，获取到的文章articles
 */
async function getAllArticle(pagenum, pagesize, query) {
  const where = {
    title: {
      [Op.like]: `%${query.trim()}%`
    }
  }
  const articles = await models.article.findAll({
    where,
    offset: (pagenum - 1) * pagesize,
    limit: pagesize
  })
  const articleTotal = await models.article.findAndCountAll()
  return {
    article: articles,
    pagenum: pagenum,
    total: articleTotal.count
  }
}

/**
 * 增：添加文章，通过传入文章对象，在数据库中创建文章实例。
 * @param {*} userObj 参数titel文章标题，authorId作者id，description文章描述，content文章内容，image文章图片链接，isShow是否显示
 * @returns 返回文章信息
 */
async function addArticle(articleObj) {
  if (articleObj !== undefined) {
    const addInfo = await models.article.create(articleObj)
    return addInfo
  }
}

/**
 * 删：通过获取文章id，将文章在数据库中删除
 * @param { int } uid 文章的id
 * @returns 返回删除信息
 */
async function deleteArticle(uid) {
  if (uid !== undefined) {
    const deleteInfo = await models.article.destroy({
      where: {
        id: uid
      }
    })
    return deleteInfo
  }
}

/**
 * 改：通过获取文章id，并接收内含文章对象
 * @param {*} articleObj 文章对象，内含改动内容。
 * @returns 返回改动信息
 */
async function editArticle(articleObj) {
  if (articleObj !== undefined) {
    const editInfo = await models.article.update(articleObj, {
      where: {
        id: articleObj.id
      }
    })
    return editInfo
  }
}

module.exports = {
  getAllArticle,
  addArticle,
  deleteArticle,
  editArticle
}

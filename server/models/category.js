const initModels = require('../schema/init-models')
const db = require('../config/db')
const Sequelize = require('sequelize')
const models = initModels(db)
const Op = Sequelize.Op

/**
 * 查：通过当前页码，以及每页展示数目和查询参数，获取到该页所有分类的总数。
 * @param { int } pagenum 当前页码
 * @param { int } pagesize 每页展示数目
 * @param { string } query 查询参数
 * @returns 返回 total所有分类的总数，以及当前页码pagenum，获取到的分类
 */
async function getAllCategory(pagenum, pagesize, query) {
  const where = {
    cagegoryName: {
      [Op.like]: `%${query.trim()}%`
    }
  }
  const category = await models.category.findAndCountAll({
    where,
    offset: (pagenum - 1) * pagesize,
    limit: pagesize
  })
  return {
    category: category,
    pagenum: pagenum,
    total: category.count
  }
}
/**
 * 根据输入分类id获取到该类
 * @param {*} uid 分类id
 * @returns 该id的分类信息
 */
async function getCategoryById(uid) {
  if (uid !== undefined) {
    const categoryInfo = await models.category.findOne({
      where: {
        id: uid
      }
    })
    return categoryInfo
  } else {
    return null
  }
}
/**
 * 增：增加分类，并会去数据库中查找是否有相同名称cagegoryName的。
 * @param {*} categoryObj 分类对象，其中cagegoryName表示该分类的名称
 * @returns 返回创建信息
 */
async function addCategroy(categoryObj) {
  if (categoryObj !== undefined) {
    const addInfo = await models.category.findOrCreate({
      where: {
        cagegoryName: categoryObj.cagegoryName
      }
    })
    console.log('需要测试一下这个返回值')
    console.log(addInfo)
    return addInfo // TODO:需要测试一下这个返回值
  }
}

/**
 * 删：删除分类，通过传入id进行删除动作。
 * @param {*} uid 分类的id
 * @returns 删除的信息
 */
async function deleteCategory(uid) {
  if (uid !== undefined) {
    const deleteInfo = await models.category.destroy({
      where: {
        id: uid
      }
    })
    return deleteInfo
  }
}

/**
 * 改：通过获取分类id，更新该id所对应的分类名称
 * @param {*} categoryObj 分类对象，其中cagegoryName表示该分类的名称
 * @returns 返回删除信息
 */
async function editCategory(categoryObj) {
  if (categoryObj !== undefined) {
    const editInfo = await models.category.update(categoryObj, {
      where: {
        id: categoryObj.id
      }
    })
    return editInfo
  }
}

module.exports = {
  getAllCategory,
  getCategoryById,
  addCategroy,
  deleteCategory,
  editCategory
}

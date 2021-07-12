const categoryModel = require('../models/category')

/**
 * 查：获取get传入参数，pagenum页码，pagesize每页内容，query搜索参数，返回数据库中分类的信息
 * @param {*} ctx
 */
async function getCategoryList(ctx) {
  const data = ctx.query
  const categoryList = await categoryModel.getAllCategory(parseInt(data.pagenum), parseInt(data.pagesize), data.query)
  if (categoryList) {
    ctx.body = {
      success: true,
      list: categoryList,
      info: '获取列表成功'
    }
  } else {
    ctx.body = {
      success: false,
      info: 'controllers：未获取到categoryList'
    }
  }
}

/**
 * 增：通过获取post参数，在数据库中新增一个分类
 * @param {*} ctx
 */
async function postAddCategory(ctx) {
  const data = ctx.request.body // 获取ctx中post传入的参数
  const categoryInfo = {
    cagegoryName: data.cagegoryName
  }
  if (categoryInfo.cagegoryName === '') {
    ctx.body = {
      success: false,
      info: '错误：分类名称为空！'
    }
  } else {
    const addCategroyInfo = await categoryModel.addCategroy(categoryInfo)
    console.log(addCategroyInfo)
    if (addCategroyInfo !== null) {
      if (addCategroyInfo[1]) {
        ctx.body = {
          success: true,
          info: '创建分类成功'
        }
      } else {
        ctx.body = {
          success: false,
          info: '已经存在该分类'
        }
      }
    } else {
      ctx.body = {
        success: false,
        info: 'model: 创建错误model层没给反馈'
      }
    }
  }
}

/**
 * 删：通过获取id，删除指定文章
 * @param {*} ctx
 */
async function deleteCategory(ctx) {
  const data = ctx.params // 获取到传入参数
  const deleteInfo = await categoryModel.deleteCategory(data.id)
  if (deleteInfo === 1) {
    ctx.body = {
      success: true,
      info: '删除分类成功'
    }
  } else {
    ctx.body = {
      uccess: false,
      nfo: 'model: 删除失败'
    }
  }
}

/**
 * 改：通过id，更改类名
 * @param {*} ctx
 */
async function putEditCategory(ctx) {
  const data = ctx.request.body
  console.log('data')
  console.log(data)
  const categoryInfo = {
    id: data.id,
    cagegoryName: data.categoryName
  }
  console.log('controller:')
  console.log(categoryInfo)
  const editCategoryInfo = await categoryModel.editCategory(categoryInfo)
  console.log(editCategoryInfo)
  if (editCategoryInfo[0] === 1) {
    ctx.body = {
      success: true,
      info: '更新分类成功'
    }
  } else {
    ctx.body = {
      success: false,
      info: 'model:更新失败'
    }
  }
}

module.exports = {
  getCategoryList,
  postAddCategory,
  deleteCategory,
  putEditCategory
}

<template>
  <div>
    <div class="userContent">
      <div class="header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/background' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>文章管理</el-breadcrumb-item>
          <el-breadcrumb-item>文章类别</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main">
          <div class="addCategroy">
            <el-input
              placeholder="请输入要添加的文章分类"
              v-model="newCategroy"
              class="inputCategory"
            >
              <el-button
                slot="append"
                icon="el-icon-finished"
                @click="addCategory"
              ></el-button>
            </el-input>
          </div>
          <div class="categoryList">
            <el-table :data="categoryTableData" style="width: 100%">
              <el-table-column type="index" width="50"> </el-table-column>
              <el-table-column prop="cagegoryName" label="文章分类">
              </el-table-column>
              <el-table-column label="操作" width="300" v-slot="props">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="editCategory(props.row.id, props.row.cagegoryName)">编辑</el-button>
                <el-button type="warning" icon="el-icon-s-operation" size="mini">配置</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </el-table-column>
            </el-table>
            <el-dialog
              title="提示"
              :visible.sync="editDialogVisible"
              width="30%"
              :before-close="editHandleClose">
              <!-- 编辑类名 -->
              <el-form :model="categoryObj" :rules="categoryRules" ref="categoryObj" label-width="100px" class="demo-ruleForm">
                <el-form-item label="类名" prop="categoryName">
                  <el-input v-model="categoryObj.categoryName"></el-input>
                </el-form-item>
              </el-form>
              <!-- 编辑类名 -->
              <span slot="footer" class="dialog-footer">
                <el-button @click="editHandleClose">取 消</el-button>
                <el-button type="primary" @click="submitEdit">确 定</el-button>
              </span>
            </el-dialog>
          </div>
          <el-drawer
            title="文章类别管理"
            :visible.sync="visibleCategroy"
            :direction="direction"
            size="70%"
          >
            <span>我来啦!</span>
          </el-drawer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryConfig: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      categoryObj: {
        id: null,
        categoryName: ''
      },
      categoryRules: {},
      visibleCategroy: false,
      direction: 'rtl',
      newCategroy: '',
      editCategoryName: '',
      editDialogVisible: false,
      categoryTableData: null,
      categoryTotal: 0
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    /**
     * 查：获取所有文章分类列表
     */
    async getCategoryList() {
      const res = await this.$http.get('/category', { params: this.categoryConfig })
      console.log(res)
      if (res.data.success) {
        this.categoryTableData = res.data.list.category.rows
        this.categoryTotal = res.data.list.category.count
      } else {
        console.log('获取分类列表失败！')
      }
    },
    /**
     * 增：添加文章分类
     */
    async addCategory() {
      console.log(this.newCategroy)
      if (this.newCategroy.trim() === '') {
        this.$message.error('文章分类不能为空')
      } else {
        const categoryInfo = {
          cagegoryName: this.newCategroy
        }
        const res = await this.$http.post('/category', categoryInfo)
        console.log(res)
        if (res.data.success) {
          this.$message.success(res.data.info)
        } else {
          this.$message.warning(res.data.info)
        }
        this.newCategroy = ''
        this.getCategoryList()
      }
    },
    /**
     * 改：修改分类的名称
     */
    editCategory(id, name) {
      this.categoryObj.id = id
      this.categoryObj.categoryName = name
      this.editDialogVisible = true
    },
    async submitEdit() {
      console.log(this.categoryObj)
      const res = await this.$http.put(`/category/${this.categoryObj.id}`, this.categoryObj)
      console.log(res)
      if (res.data.success) {
        this.$message.success(res.data.info)
      } else {
        this.$message.error(res.data.info)
      }
      this.getCategoryList()
      this.editDialogVisible = false
    },
    editHandleClose() {
      console.log('close')
      this.editDialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.addCategroy {
  margin: 20px;
}
.inputCategory {
  width: 400px;
}
</style>

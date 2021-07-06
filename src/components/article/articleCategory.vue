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
              placeholder="请输入文章分类"
              v-model="newCategroy"
              class="inputCategory"
            >
              <el-button slot="append" icon="el-icon-finished" @click="addCategory"></el-button>
            </el-input>
          </div>
          <div class="categoryList"></div>
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
      visibleCategroy: false,
      direction: 'rtl',
      newCategroy: ''
    }
  },
  methods: {
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
      }
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

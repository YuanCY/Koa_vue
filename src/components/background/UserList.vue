<template>
  <div id="app">
    <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/background' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <el-table :data="userTableData" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="用户名">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="165px">
        </el-table-column>
        <el-table-column prop="phone" label="手机"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userlistConfig.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="userlistConfig.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userlistConfig: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      userTableData: [],
      total: 0
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const res = await this.$http.get('/user', { params: this.userlistConfig })
      if (res.status === 200) {
        this.userTableData = res.data.users
        this.total = res.data.total
        console.log(res.data)
        console.log(this.total)
        console.log(this.userTableData)
      } else {
        console.log('数据获取失败')
      }
    },
    handleSizeChange(val) {
      this.userlistConfig.pagesize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.userlistConfig.pagenum = val
      this.getUserList()
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  //   margin: 20px;
  padding: 20px;
}
.main{
    margin: 0 20px;
}
</style>

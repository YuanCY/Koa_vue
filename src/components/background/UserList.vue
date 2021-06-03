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
        <el-table-column prop="date" label="日期">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userTableData: [
        { name: 'samyuan', address: '湖南省株洲市天元区', date: '1994-07-25' }
      ]
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

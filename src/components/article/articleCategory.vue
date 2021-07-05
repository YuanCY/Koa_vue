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
          <el-button
            @click="visibleCategroy = true"
            type="primary"
            class="addCategroy"
          >
            新增类别
          </el-button>
          <el-drawer
            title="我是标题"
            :visible.sync="visibleCategroy"
            :direction="direction"
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
      direction: 'rtl'
    }
  }
}
</script>

<style lang="less" scoped>
</style>

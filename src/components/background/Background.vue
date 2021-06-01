<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="title">博客后台管理</div>
        <el-button round class="logoutBtn" size="small" @click="logoutDialogVisible = true">退出登陆</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <!-- ===============退出登陆弹窗============== -->
          <el-dialog
            title="提示"
            :visible.sync="logoutDialogVisible"
            width="30%"
          >
            <span>确定是否退出登陆？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="logoutDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="logout">确 定</el-button>
            </span>
          </el-dialog>
          <!-- ===============退出登陆弹窗============== -->
        Main
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoutDialogVisible: false // 退出显示弹窗
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
      this.logoutDialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  position: relative;
  background-color: #3171ad;
  line-height: 60px;
}
.title {
  font-size: 30px;
  color: #fff;
}
.el-aside {
  background-color: #6aacde;
}
.el-main {
  background-color: #eee;
}
.logoutBtn {
  position: absolute;
  top: 50%;
  right: 1%;
  transform: translateY(-50%);
}
</style>

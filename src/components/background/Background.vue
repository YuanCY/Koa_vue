<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="title">博客后台管理</div>
        <el-button round class="logoutBtn" size="small" @click="logoutDialogVisible = true">退出登陆</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- ===============侧边栏============== -->
           <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            router
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="userlist">用户列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-management"></i>
                <span>文章管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="article">文章列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
          <!-- ===============侧边栏============== -->
        </el-aside>
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
        <router-view></router-view>
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

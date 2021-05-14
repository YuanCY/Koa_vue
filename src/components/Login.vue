<template>
  <div id="login">
    <div class="login_container">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="login_box">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="loginForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">登陆</el-button>
                <el-button>注册</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  }

}
</script>

<style lang="less" scoped>
// #login{
//     height: 100%;
// }
.login_container{
    // 页面居中
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    // 页面大小、颜色
    width: 400px;
    height: 250px;
    background-color: #f6f8fa;
    padding: 20px;
}
.login_box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
}

</style>

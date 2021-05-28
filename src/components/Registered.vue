<template>
  <div class="reg">
    <div class="regContainer">
      <div class="regTitel">用户注册</div>
      <el-form
        :model="regForm"
        :rules="regRules"
        ref="regForm"
        label-width="80px"
        class="regForm"
      >
        <el-form-item label="用户名" prop="regName" id="regName">
          <el-input v-model="regForm.regName"></el-input>
        </el-form-item>
        <!-- <div class="checkRepeat">
            <el-button icon="el-icon-search" circle @click="checkNameRepeat" ></el-button><span class="checkRepeatResult">点击检查用户名是否重复</span>
        </div> -->
        <el-form-item label="密码" prop="regPassword1">
          <el-input v-model="regForm.regPassword1"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="regPassword2">
          <el-input v-model="regForm.regPassword2"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="regEmail">
          <el-input v-model="regForm.regEmail"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="regPhone">
          <el-input v-model="regForm.regPhone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="regBtn" type="primary" @click="regUser">注册用户</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.regForm.regPassword1 !== value) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    // const checkRepeatToName = (rule, value, callback) => {
    //   if (this.checkNameRepeatFlag) {
    //     callback()
    //   } else {
    //     callback(new Error('用户名已注册！请更换用户名！！'))
    //   }
    // }
    return {
      regForm: {
        regName: '',
        regPassword1: '',
        regPassword2: '',
        regEmail: '',
        regPhone: ''
      },
      regRules: {
        regName: [
          { required: true, message: '请输入注册的用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个英文数字字符',
            trigger: 'blur'
          }
        //   { required: true, validator: checkRepeatToName, trigger: 'blur' }
        ],
        regPassword1: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        regPassword2: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { required: true, validator: equalToPassword, trigger: 'blur' }
        ],
        regEmail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ]
      }
    //   checkNameRepeatFlag: false
    }
  },
  computed: {
  },
  methods: {
    regUser() {
      this.$refs.regForm.validate(async valid => {
        if (valid) {
          console.log('提交')
          const res = await this.$http.post('/user/adduser', this.regForm)
          console.log(res)
          if (res.data.success) {
            // 创建成功
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.$router.push('login')
          } else {
            // 创建失败
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        } else {
          console.log('提交失败')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.reg {
  position: relative;
  background-color: #8acff6;
  width: 100%;
  height: 100%;
}
.regContainer {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 0 50px;
  background-color: #f6f8fa;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.regForm {
  margin: 20px;
}
.regBtn {
  width: 100%;
}
.regTitel {
  width: 200px;
  height: 60px;
  margin: 15px auto;
  font-size: 30px;
  text-align: center;
}

// .checkRepeat{
//   transform: scale(0.8);
//   margin: 10px 55px 10px;

// }
// .checkRepeatResult{
//   color: #b1b2b1;
//   margin-left: 10px;
// }
</style>

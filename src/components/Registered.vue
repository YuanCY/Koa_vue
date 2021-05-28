<template>
  <div class="reg">
    <div class="regContainer">
      <div class="regTitel">用户注册</div>
      <el-form
        :model="regForm"
        :rules="regRules"
        ref="regForm"
        label-width="100px"
        class="regForm"
      >
        <el-form-item label="用户名" prop="regName">
          <el-input v-model="regForm.regName"></el-input>
        </el-form-item>
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
    }
  },
  computed: {
  },
  methods: {
    regUser() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          console.log('提交')
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
  padding: 0 30px;
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
</style>

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
    <div class="serach">
      <!-- =============搜索================ -->
      <el-input
        placeholder="请输入查询用户名"
        v-model="userlistConfig.query"
        @change="getUserList"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="getUserList"
        ></el-button>
      </el-input>
      <!-- =============搜索================ -->
    </div>
    <div class="main">
      <el-table :data="userTableData" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="email" label="邮箱" width="165">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机"
          width="120"
        ></el-table-column>
        <el-table-column prop="createTime" label="创建时间" v-slot="props">
          {{ timeFormat(props.row.createTime) }}
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" v-slot="props">
          {{ timeFormat(props.row.updateTime) }}
        </el-table-column>
        <el-table-column label="操作" v-slot="props" width="150">
          <el-button
            type="primary"
            size="mini"
            class="editBtn"
            @click="openEditDilog(props.row.id)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确认删除该用户吗？"
            @confirm="deleteUser(props.row.id)"
          >
            <el-button slot="reference" type="danger" size="mini"
              >删除</el-button
            >
          </el-popconfirm>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userlistConfig.pagenum"
        :page-sizes="[5, 10]"
        :page-size="userlistConfig.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- ====================== 编辑修改 ====================== -->
      <el-dialog
        title="提示"
        :visible.sync="editDialogVisible"
        width="30%"
        :before-close="editUserHandleClose"
      >
        <el-form
          :model="editUserInfo"
          :rules="userEditRules"
          ref="userRuleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editUserInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="editUserInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="editUserInfo.phone"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserUpload()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- ====================== 编辑修改 ====================== -->
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      userlistConfig: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      editUserInfo: {
        // username: '',
        // email: '',
        // phone: ''
      },
      userEditRules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      userTableData: [],
      total: 0,
      editDialogVisible: false
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
    },
    /**
     * 删除用户，发起axios网络请求
     */
    async deleteUser(id) {
      const res = await this.$http.delete(`/user/${id}`)
      console.log(res)
      if (res.data.success) {
        this.$message.success(res.data.info)
        this.getUserList()
      } else {
        this.$message.error(res.data.info)
        this.getUserList()
      }
    },

    /**
     * 将时间格式化为YYYY-MM-DD HH:mm:ss这个形式
     */
    timeFormat(date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },

    /**
     * 传入id，通过id获取该行编辑文档内容，显示在编辑dilog中。并打开编辑dilog菜单
     */
    async openEditDilog(id) {
      console.log(id)
      // 通过id获取用户信息
      const res = await this.$http.get(`user/${id}`)
      console.log(res)
      this.editUserInfo = res.data
      this.editDialogVisible = true
    },
    /**
     * 当编辑用户信息窗口关闭时
     */
    editUserHandleClose() {
      this.editUserInfo = {}
      this.editDialogVisible = false
    },
    async editUserUpload() {
      console.log(this.editUserInfo.id) // 是要修改的id
      const res = await this.$http.put(
        `/user/${this.editUserInfo.id}`,
        this.editUserInfo
      )
      console.log(res)
      if (res.data.success) {
        this.$message.success(res.data.msg)
      } else {
        this.$message.error(res.data.msg)
      }
      this.editUserHandleClose()
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
.main {
  margin: 0 20px;
  margin-top: 20px;
}
.el-pagination {
  margin: 10px;
}
.editBtn {
  margin-right: 10px;
}
.serach {
  width: 300px;
  margin: 0 20px;
}
</style>

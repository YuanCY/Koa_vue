<template>
  <div id="app">
    <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/background' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/article' }"
          >文章列表</el-breadcrumb-item
        >
        <el-breadcrumb-item>新增文章</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>创建一个新文章</h1>
    </div>
    <div class="main">
      <el-form
        :model="addArticleRuleForm"
        :rules="addArticleRules"
        ref="addArticleRuleForm"
        label-width="100px"
        class="articleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="addArticleRuleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            type="textarea"
            placeholder="请输入文章描述"
            v-model="addArticleRuleForm.description"
            maxlength="140"
            show-word-limit
            rows='6'
          >
          </el-input>
        </el-form-item>
        <el-form-item label="正文" prop="content">
          <div ref="content"></div>
        </el-form-item>
        <el-form-item label="首页图片" prop="image">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="submitArticle" round>发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  data() {
    return {
      addArticleRuleForm: {
        title: '',
        description: '',
        content: ''
      },
      addArticleRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ]
      },
      editor: null
    }
  },
  computed: {
    articleContent() {
      return this.editor.txt.html()
    }
  },
  mounted() {
    // 在生命周期mounted，挂载阶段。created是创建阶段。
    /**
     * beforeCreated \ created   创建阶段
     * beforeMounted \ mounted   挂载阶段
     * beforeUpdate \ updated    运行更新阶段
     * beforeDestory \ destoryed 销毁阶段
     */
    this.editor = new E(this.$refs.content)
    this.editor.create()
  },
  methods: {
    submitArticle() {
      if (this.editor.txt.html() === '') {
        this.$message.error('请输入文章主体')
      } else {
        this.$refs.addArticleRuleForm.validate(vaild => {
          if (vaild) {
            // 将文本框中的正文内容输入赋值给content
            this.addArticleRuleForm.content = this.editor.txt.html()
            console.log(this.addArticleRuleForm)
          } else {
            console.log('meiyouyong')
          }
        })
      }
    }
  },
  beforeDestroy() {
    // 需要销毁编辑器
    this.editor.destroy()
    this.editor = null
  }
}
</script>

<style lang="less" scoped>
.header {
  padding: 20px;
}
.header h1 {
  text-align: center;
  margin: 0;
  padding: 0;
}
.main {
  padding: 20px;
}
#app{
  height: auto;
}
.articleForm{
  position: relative;
}
.submit{
  width: 100px;
}

</style>

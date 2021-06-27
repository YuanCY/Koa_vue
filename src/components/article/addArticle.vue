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
            rows="6"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="正文" prop="content">
          <ckeditor :editor="editor" :config="editorConfig" v-model="addArticleRuleForm.content"></ckeditor>
        </el-form-item>
        <el-form-item label="首页图片" prop="image"> </el-form-item>
        <el-form-item label="是否发布" prop="isShow">
          <el-switch
            v-model="addArticleRuleForm.isShow"
            active-color="#13ce66"
            inactive-color="#6e6e6e"
          >
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="submitArticle" round
            >发布</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'

export default {
  data() {
    return {
      addArticleRuleForm: {
        title: '',
        authorId: null,
        description: '',
        content: '',
        isShow: false
      },
      addArticleRules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }]
      },
      editor: ClassicEditor,
      editorConfig: {
        language: 'zh-cn'
      }
    }
  },
  components: {
    ckeditor: CKEditor.component
  },
  computed: {
  },
  created() {
    console.log('该文章的作者id', window.sessionStorage.getItem('loginId'))
    this.addArticleRuleForm.authorId = window.sessionStorage.getItem('loginId')
  },
  mounted() {
    // 在生命周期mounted，挂载阶段。created是创建阶段。
    /**
     * beforeCreated \ created   创建阶段
     * beforeMounted \ mounted   挂载阶段
     * beforeUpdate \ updated    运行更新阶段
     * beforeDestory \ destoryed 销毁阶段
     */
    // 将当前登陆的用户id，做为该文章的作者id
    // this.addArticleRuleForm.authorId = this.$store.getters.getLoginAuthorId
  },
  methods: {
    async submitArticle() {
      console.log(this.addArticleRuleForm)
      const res = await this.$http.post('/article', this.addArticleRuleForm)
      console.log(res)
    }
  },
  beforeDestroy() {
    if (this.editor) {
    }
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
#app {
  height: auto;
}
.articleForm {
  position: relative;
}
.submit {
  width: 100px;
}
</style>

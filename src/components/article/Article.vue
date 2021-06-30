<template>
  <div>
    <div class="userContent">
      <div class="header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/background' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>文章管理</el-breadcrumb-item>
          <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="serach">
        <!-- =============搜索================ -->
        <el-input
          placeholder="请输入查询文章"
          v-model="articleConfig.query"
          @change="getArticleList"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getArticleList"
          ></el-button>
        </el-input>
        <el-button type="primary" class="addArticle" @click="addArticle"
          >新增</el-button
        >
        <!-- =============搜索================ -->
      </div>
      <div class="main">
        <!-- =============表格================ -->
        <el-table :data="articleTableData" style="width: 100%" border>
          <el-table-column type="expand" v-slot="props">
            <el-form label-position="left" inline class="articleInfo">
              <el-form-item label="创建时间">
                <span>{{ timeFormat(props.row.createAt) }}</span>
              </el-form-item>
              <el-form-item label="修改时间">
                <span>{{ timeFormat(props.row.updateAt) }}</span>
              </el-form-item>
              <el-form-item class="editArticle">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  round
                  size="mini"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  round
                  size="mini"
                ></el-button>
              </el-form-item>
              <el-form-item class="articleContent" label="文章内容">
                <div v-html="props.row.content"></div>
              </el-form-item>
            </el-form>
          </el-table-column>
          <el-table-column label="文章标题" prop="title"></el-table-column>
          <el-table-column
            label="作者"
            prop="authorId"
            width="100"
          ></el-table-column>
          <el-table-column
            label="文章描述"
            prop="description"
          ></el-table-column>
          <el-table-column label="是否显示" v-slot="props" width="70">
            <el-switch
              v-model="props.row.isShow"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-table-column>
        </el-table>
        <!-- =============表格================ -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="articleConfig.pagenum"
          :page-sizes="[5, 10]"
          :page-size="articleConfig.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="articleTotal"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      articleConfig: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      articleTableData: [],
      articleTotal: 0
    }
  },
  components: {
  },
  created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      const res = await this.$http.get('/article', {
        params: this.articleConfig
      })
      if (res.data.success) {
        this.articleTableData = res.data.list.article
        this.articleTotal = res.data.list.total
        console.log(this.articleTableData)
      }
    },
    /**
     * 将时间格式化为YYYY-MM-DD HH:mm:ss这个形式
     */
    timeFormat(date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    addArticle() {
      this.$router.push('/addarticle')
    },
    handleSizeChange(val) {
      this.articleConfig.pagesize = val
      this.getArticleList()
    },
    handleCurrentChange(val) {
      this.articleConfig.pagenum = val
      this.getArticleList()
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  padding: 20px;
}
.serach {
  position: relative;
  width: 300px;
  margin: 0 20px;
}
.main {
  margin: 0 20px;
  margin-top: 20px;
}
.articleContent {
  width: 100%;
}
.content {
  padding-top: 20px;
}
.articleInfo {
  position: relative;
}
.editArticle {
  position: absolute;
  right: 0;
}
.addArticle {
  position: absolute;
  margin: 0 20px;
}
.el-pagination {
  margin: 10px;
}
</style>

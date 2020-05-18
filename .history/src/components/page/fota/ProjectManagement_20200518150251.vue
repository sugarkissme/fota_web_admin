<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>版本控制</el-breadcrumb-item>
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="设计公司" v-model="queryInfo.designName" clearable @clear="getProjectList">
            <el-button slot="append" icon="el-icon-search" @click="getProjectList"></el-button>
          </el-input>
        </el-col>
          <el-col :span="6">
          <el-input placeholder="品牌商" v-model="queryInfo.brandName" clearable @clear="getProjectList">
            <el-button slot="append" icon="el-icon-search" @click="getProjectList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="projectCreate">添加项目</el-button>
        </el-col>
      </el-row>

      <!-- table表格区域 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="设计公司" prop="goods_name" ></el-table-column>
        <el-table-column label="品牌商" prop="goods_price" ></el-table-column>
        <el-table-column label="OEM" prop="goods_weight" ></el-table-column>
        <el-table-column label="LANGUAGE" prop="goods_weight" ></el-table-column>
        <el-table-column label="OPERATOR" prop="goods_weight" ></el-table-column>
        <el-table-column label="创建时间" prop="add_time" >
          <template slot-scope="scope">
            {{scope.row.createTime | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNo" :page-sizes="[20, 30, 40, 50]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize" background>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询参数对象
      queryInfo: {
        brandName: '',
        productName: '',
        designName: '',
        pageNo: 1,
        pageSize: 10
      },
      // 项目列表
      goodslist: [],
      // 总数据条数
      totalSize: 0
    }
  },
  created() {
    this.getProjectList()
  },
  methods: {
    // 根据分页获取对应的项目列表
    async getProjectList() {
      const { data: res } = await this.$http.get('/project/queryPage', {
        params: this.queryInfo
      })

      if (res.code !== 0) {
        return this.$message.error('获取项目列表失败！')
      }

      this.$message.success('获取项目列表成功！')
      console.log(res.data)
      this.goodslist = res.data.data.list
      this.totalSize = res.data.totalSize
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getProjectList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNo = newPage
      this.getProjectList()
    },
    async removeById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该项目, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除！')
      }

      const { data: res } = await this.$http.delete('//project/delete/${id}')

      if (res.meta.status !== 200) {
        return this.$message.error('删除失败！')
      }

      this.$message.success('删除成功！')
      this.getProjectList()
    },
    projectCreate() {
      this.$router.push('/project/create')
    }
  }
}
</script>

<style lang="less" scoped>
</style>

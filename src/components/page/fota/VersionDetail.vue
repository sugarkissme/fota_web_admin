<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>版本控制</el-breadcrumb-item>
      <el-breadcrumb-item>历史版本</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="app-container">
      <el-card class="filter-container" shadow="never">
          <div>
            <el-button 
              style="float: right"
              @click="getProjectList()"
              type="primary"
              size="small">
              查询结果
            </el-button>
            <el-button
              type="primary"
              style="float: right;margin-right: 15px"
              @click="handleResetSearch()"
              size="small">
              重置
            </el-button>
            <el-button
              type="primary"
              style="float: right ;margin-right: 15px"
              class="btn-add"
              @click="addDialogVisible=true"
              size="small">
              添加
            </el-button>
            
          </div>
      <div style="margin-top: 15px">
       
      </div>
    </el-card>
    </div>
  
     <div class="table-container">
        <!-- table表格区域 -->
        <el-table :data="versionDetailList" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="源版本" prop="designName" ></el-table-column>
          <el-table-column label="文件名" prop="fileName" ></el-table-column>
          <el-table-column label="大小" prop="fileSize" ></el-table-column>
          <el-table-column label="上传升级包" ></el-table-column>
          <el-table-column label="升级策略" prop="strategy" >
              <template slot-scope="scope" >
                    <el-button type="text" size="mini"  @click="removeById(scope.row.id)">定制配置</el-button>
              </template>
          </el-table-column>
          <el-table-column label="当前状态" prop="status" >
              <template slot-scope="scope">
              <el-button type="info"  size="mini" @click="removeById(scope.row.id)"></el-button>
            </template>
          </el-table-column>
          <el-table-column label="发布时间" prop="releaseTime" ></el-table-column>
          <el-table-column label="是否启用" prop="useFlag" > </el-table-column>
          <el-table-column label="操作" width="130px">
            <template slot-scope="scope">
              <el-button type="info"  size="mini" @click="removeById(scope.row.id)">待上传</el-button>
            </template>
          </el-table-column>
        </el-table>
     </div>
     <div class="paginnation-container">
        <!-- 分页区域 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize" background>
        </el-pagination>
     </div>
  </div>
</template>

<script>


const defaultListQuery = {
        pageNo: 1,
        pageSize: 20
  }

export default {
  data() {
    return {
      // 查询参数对象
      // 项目列表
      updateVersionNo:'',
      projectName:'',
      versionDetailList: [],
      // 总数据条数
      totalSize: 0,
      queryInfo: Object.assign({}, defaultListQuery),
      // 控制添加项目对话框的显示与隐藏
      addDialogVisible: false,
      // 添加项目的表单数据
      addForm: {
        designId: '',
        brandId: '',
        oem: '',
        language: '',
        operator:'',
        productName:''
      },
      operators:[{
          value: 'other',
          label: 'other'
        },{
          value: 'CMCC',
          label: 'CMCC'
        },{
          value: 'CU',
          label: 'CU'
        }],
         languages:[{
          value: 'zh-CN',
          label: '中文'
        },{
          value: 'en-US',
          label: '英文'
        },{
          value: 'ja-JP',
          label: '日语'
        }],
      // 添加表单的验证规则对象
      addFormRules: {
        designId: [
          { required: true, message: '请选择设计公司', trigger: 'blur' },
        
        ],brandId: [
          { required: true, message: '请选择品牌商', trigger: 'blur' },
        ],
        productName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
        ],
        oem: [
          { required: true, message: '请输入OEM', trigger: 'blur' },
        ],
        language: [
          { required: true, message: '请输入语言', trigger: 'blur' },
        ],
        operator: [
          { required: true, message: '请输入OPERATOR', trigger: 'blur' },
        ]
      },


    }
  },
  created() {
    this.getParam()
    this.getVersionDetailList()
  },
  methods: {
      
      getParam(){
        const param=this.$route.query;
        this.queryInfo.versionId=param.updateVersionId
        this.updateVersionNo=param.updateVersionNo
        this.projectName=param.productName
        console.log("跳转接受的参数",param)
      },

    computeStatus(status){
        if(status=='0'){
            return '初始版本'
        }else if(status=='1'){
            return '待上传'
            
        }else if(status=='2'){
            return '待测试'
            
        }else if(status=='3'){
            return '测试不通过'
        }else if(status=='4'){
            return '待发布'
        }else if(status=='5'){
            return '已发布'
        }else if(status=='6'){
            return '已发布'
        }
        return '待上传';
    },
    getVersionDetailList() {
        this.$http.get('/version/queryVersionDetailPageByVersionId',{
                    params: this.queryInfo
                }).then(res => {
                    console.log('返回',res.data)
                    res=res.data
                    if(res.code!=0){
                        return this.$message(res.msg)
                    }
                    this.versionDetailList=res.data.list;
                    console.log('返回list',this.versionDetailList)
                });
     
    },

    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getVersionDetailList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNo = newPage
      this.getVersionDetailList()
    },
    
  }
}
</script>

<style lang="less" scoped>
</style>

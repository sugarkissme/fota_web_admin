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
        <span>项目：{{projectName}}  升级版本号:{{updateVersionNo}}</span>
          <div>
            <el-button 
              style="float: right"
              @click="getProjectList()"
              type="primary"
              size="small">
              查询结果
            </el-button>
          </div>
      <div style="margin-top: 15px">
       
      </div>
    </el-card>
    </div>
  
     <div class="table-container">
        <!-- table表格区域 -->
        <el-table :data="versionDetailList" border stripe>
          <!-- <el-table-column type="index" prop="id"></el-table-column> -->
          <el-table-column label="版本详情ID" prop="id" width="100px" ></el-table-column>
          <el-table-column label="源版本号" prop="oldVersionNo" ></el-table-column>
          <el-table-column label="文件名" prop="fileName" ></el-table-column>
          <el-table-column label="大小" prop="fileSize" ></el-table-column>
          <el-table-column label="上传升级包">
            <el-upload :action="ossUploadUrl" :data="dataObj" list-type="picture"  :before-upload="beforeUpload" :on-remove="handleRemove" :on-success="handleUploadSuccess" :on-preview="handlePreview" :limit="maxCount" >
             <i class="el-icon-upload">上传文件</i>
              </el-upload>
          </el-table-column>
          <el-table-column label="升级策略" prop="strategy" >
              <template slot-scope="scope" >
                    <el-button type="text" size="mini"  @click="removeById(scope.row.id)">定制配置</el-button>
              </template>
          </el-table-column>
          <el-table-column label="当前状态" prop="status" >
               <template slot-scope="scope" >
                 <span>{{computeStatus(scope.row.status)}}</span>
              </template>
          </el-table-column>
          <el-table-column label="发布时间" prop="releaseTime" ></el-table-column>
          <el-table-column label="是否启用" prop="useFlag" > 
            <template slot-scope="scope">
              <el-switch v-model="scope.row.useFlag" :active-value="1" :inactive-value="0" @change="handleUpdateVersion(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130px">
            <template slot-scope="scope">
              <el-button type="info" size="mini" @click="removeById(scope.row.id)">待上传<i class="el-icon-upload el-icon--right"></i></el-button>
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
import {updateVersionDetailStatus} from '@/api/versionDetail'

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
        updateVersionDetail:{
          detailId:null,
          useFlag:null,
          status:null
        },
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: '',
          // callback:'',
        },
        ossUploadUrl:'',
        useOss:true, //使用oss->true
        maxCount:1
       
        

    }
  },
  created() {
    this.getParam()
    this.getVersionDetailList()
    this.ossUploadUrl='${window.location.origin}/aliyun/oss/upload'
  },
  methods: {
      
      getParam(){
        const param=this.$route.query;
        this.queryInfo.versionId=param.updateVersionId
        this.updateVersionNo=param.updateVersionNo
        this.projectName=param.projectName
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
   async handleUpdateVersion(row){
      console.log('***updateVersion****',row)
      this.updateVersionDetail.detailId=row.id
      this.updateVersionDetail.useFlag=row.useFlag
      this.updateVersionDetail.status=row.status
      const {data:res}=  await updateVersionDetailStatus(this.updateVersionDetail)
      if(res.code!=0){
        if(row.useFlag===0){
          row.useFlag=1
        }else{
          row.useFlag=0
        }
        return this.$message(res.msg)
      }
      return this.$message.success('修改成功')


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

     
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
        this.dialogVisible = true;
      },
      beforeUpload(file) {
      },
      handleUploadSuccess(res, file) {
      
      }
  }
}
</script>

<style lang="less" scoped>
</style>

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
        <span>您正在上传{{projectName}}项目的文件，从版本{{currentVersionNo}} 升级到{{updateVersionNo}} </span>
      <div style="margin-top: 15px">
      </div>
    </el-card>
    </div>
    <uploader
      browse_button="browse_button"
      :url="server_config.url+'/BigFile/'"
      chunk_size="2MB"
      :max_retries="1"
      :filters="{prevent_duplicates:true}"
      :FilesAdded="filesAdded"
      :BeforeUpload="beforeUpload"
      :Error="error"
      :UploadComplete="uploadComplete"
      :FileUploaded="fileUploaded"
      @inputUploader="inputUploader"
    />
    <br/>
    <br/>
    <el-button type="primary" id="browse_button">选择文件</el-button>
    <br/>
    <el-table
      :data="tableData"
      style="width: 100%; margin: 10px 10px;">
      <el-table-column
        label="文件名">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="大小">
        <template slot-scope="scope">
          <span>{{scope.row.size}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === -1">正在加载数据</span>
          <span v-if="scope.row.status === 1 && scope.row.percent === 0">加载完成请上传</span>
          <span v-if="scope.row.status === 4" style="color: brown">上传失败</span>
          <span v-if="scope.row.status === 5" style="color: blue">上传成功</span>
          <el-progress v-if="scope.row.status === 2 || scope.row.status === 1 && scope.row.percent > 0" :text-inside="true" :stroke-width="20" :percentage="scope.row.percent"></el-progress>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteFile(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br/>
    <el-button :disabled="uploading" type="danger" @click="uploadStart()">开始上传</el-button>
    <el-button :disabled="!uploading" type="warring" @click="uploadStop()">暂停上传</el-button>
  </div>
</template>

<script>
  import FileMd5 from '@/models/file-md5.js'
  import Uploader from '@/components/upload/Uploader'
import {updateVersionDetailStatus,updateVersionDetail} from '@/api/versionDetail'
  export default {
    name: "StopUpload",
    data() {
      return {
        server_config: this.global.server_config,
        up: {},
        files:[],
        tableData: [],
        uploading: false,
        projectName:'',
        currentVersionNo:'',
        updateVersionNo:'',
        updateVersionDetail:{
          detailId:null,
          status:null,
          fileName:null,
          fileSize:null,
          downloadUrl:null,
        },
      }
    },
    components: {
      'uploader': Uploader
    },
    watch: {
      files: {
        handler() {
          this.tableData = [];
          this.files.forEach((e) => {
            this.tableData.push({
              name: e.name,
              size: e.size,
              status: e.status,
              id: e.id,
              percent: e.percent
            });
          });
        },
        deep: true
      }
    },
  created(){
    this.getParam();//重新调用加载函数
  },
    methods: {
      inputUploader(up) {
        this.up = up;
        this.files = up.files;
      },
      filesAdded(up, files) {
        files.forEach((f) => {
          f.status = -1;
          FileMd5(f.getNative(), (e, md5) => {
            f["md5"] = md5;
            f.status = 1;
          });
        });
      },
      deleteFile(id) {
        let file = this.up.getFile(id);
        this.up.removeFile(file);
      },
      beforeUpload(up, file) {
        up.setOption("multipart_params", {"size":file.size,"md5":file.md5});
      },
      uploadStart() {
        this.uploading = true;
        this.up.start();
      },
      uploadStop() {
        this.uploading = false;
        this.up.stop();
      },
      error() {
        this.uploading = false;
      },
      uploadComplete() {
        this.uploading = false;
        console.log("上传后回调",this.tableData[0].status)
        if(this.tableData[0].status===5){
          this.handleUpdateVersioStatus();
        }else if(this.tableData[0].status===4){}
      },
      //每个次切片文件上产返回值
      fileUploaded(up,files,info){
        var res=JSON.parse(info.response)
        if(res.code===0&&res.data!=null){
          this.updateVersionDetail.downloadUrl=res.data
          console.log("上传文件返回URL",res.data)
        }
      },
      //其他页面跳转过来的参数
      getParam(){
        const param=this.$route.query;
        this.currentVersionId=param.currentVersionId
        this.currentVersionNo=param.currentVersionNo
        this.updateVersionNo=param.updateVersionNo
        this.projectName=param.projectName
        console.log("上产文件接收的参数",param)
      },
        async handleUpdateVersioStatus(){
           this.updateVersionDetail.detailId=this.currentVersionId
          this.updateVersionDetail.status=2,
          this.updateVersionDetail.fileName=this.tableData[0].name
          var num=this.tableData[0].size/ 1024 / 1024
          var flag=false;
            if(num<0.01){
              flag=true
              num=this.tableData[0].size/ 1024
            }
          this.updateVersionDetail.fileSize=num.toFixed(2)+""+(flag==true?"Kb":"M")
          console.log("请求参数updateVersionDetail",this.updateVersionDetail)
          const {data:res}=  await updateVersionDetailStatus(this.updateVersionDetail)
          console.log("更新文件",res)
          if(res.code!=0){
            return this.$message.error(res.msg)
          }
     },
    },
   
  }
</script>

<style scoped>

</style>

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
      <div style="margin-top: 15px">
       
      </div>
    </el-card>
    </div>
  
     <div class="table-container">
        <!-- table表格区域 -->
        <el-table :data="versionDetailList" border stripe>
          <!-- <el-table-column type="index" prop="id"></el-table-column> -->
          <el-table-column label="版本详情ID" prop="id" width="100px" ></el-table-column>
          <el-table-column label="源版本号" prop="oldVersionNo" width="385px" ></el-table-column>
          <el-table-column label="文件名" prop="fileName" width="250px" ></el-table-column>
          <el-table-column label="大小" prop="fileSize" width="120px" ></el-table-column>
          <el-table-column label="上传升级包" width="350px">
            <template slot-scope="scope">
              <div>
                    <uploader   browse_button="browse_button"  :url="server_config.url+'/BigFile/'"   chunk_size="2MB"   :max_retries="1"   :filters="{prevent_duplicates:true}"   :FilesAdded="filesAdded"   :BeforeUpload="beforeUpload"   :Error="error"   :UploadComplete="uploadComplete"   @inputUploader="inputUploader" />
                    <el-button type="primary" id="browse_button" size='mini' >选择文件</el-button>
                    <el-button :disabled="uploading" type="danger"size='mini'  @click="uploadStart()">上传</el-button>
                    <el-button :disabled="!uploading" type="warring"  size='mini' @click="uploadStop()">暂停</el-button>
                    <span v-if="scope.row.upStatus === -1">正在计算MD5</span>
                    <span v-if="scope.row.upStatus === 1 && scope.row.percent === 0">MD5计算完成，准备上传</span>
                    <span v-if="scope.row.upStatus === 4" style="color: brown">上传失败</span>
                    <span v-if="scope.row.upStatus === 5" style="color: chartreuse">已上传</span>
                    <el-progress v-if="scope.row.upStatus === 2 || scope.row.upStatus === 1 && scope.row.percent > 0" :text-inside="true" :stroke-width="20" :percentage="scope.row.percent"></el-progress>  
                </div>
            </template>
          </el-table-column>
          <el-table-column label="升级策略" prop="strategy"  width="120px" >
              <template slot-scope="scope" >
                    <el-button  :disabled="scope.row.status===1||scope.row.status===0" type="text" size="mini"  @click="versionStrategy(scope.row)"> 定制配置</el-button>
              </template>
          </el-table-column>
          <el-table-column label="当前状态"  width="130px" prop="status" >
               <template slot-scope="scope" >
                 <span>{{computeStatus(scope.row.status)}}</span>
              </template>
          </el-table-column>
          <el-table-column label="发布时间" prop="releaseTime"  width="190px" ></el-table-column>
          <el-table-column label="是否启用" prop="useFlag" width="110px" > 
            <template slot-scope="scope">
              <el-switch v-model="scope.row.useFlag" :active-value="1" :inactive-value="0" @change="handleUpdateUseFlag(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button  v-if="scope.row.status===1" size="mini" disabled>待上传<i class="el-icon--right"></i></el-button>
              <el-button  v-if="scope.row.status===2" size="mini" @click="handleUpdateVersioStatus(scope.row,4)">测试通过</el-button>
              <el-button  v-if="scope.row.status===2" size="mini" @click="handleUpdateVersioStatus(scope.row,3)">测试不通过</el-button>
              <el-button  v-if="scope.row.status===3" size="mini" disabled >测试不通过</el-button>
              <el-button  v-if="scope.row.status===4" size="mini" @click="handleUpdateVersioStatus(scope.row,5)">发布</el-button>
              <el-button  v-if="scope.row.status===5" size="mini" @click="handleUpdateVersioStatus(scope.row,2)">取消发布</el-button>
            </template>
          </el-table-column>
        </el-table>
     </div>
     <div class="paginnation-container">
        <!-- 分页区域 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize" background>
        </el-pagination>
     </div>


    <div class="config-container">
      <el-dialog title="版本定制策略" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <!-- 内容主体区域 -->
        <el-form :model="addStrategyForm" ref="addFormRef" label-width="70px">
          
          <el-form-item label="当前版本号" prop="currentVersionNo" label-width="120px" >
            {{addStrategyForm.currentVersionNo}}
          </el-form-item>
           <el-form-item label="升级版本号" prop="updateVersionNo" label-width="120px" >
             {{addStrategyForm.updateVersionNo}}
          </el-form-item>
          <el-form-item label="升级包名称" prop="fileName" label-width="120px"  >
            {{addStrategyForm.fileName}}
          </el-form-item>
          <el-form-item label="升级包大小" prop="fileSize" label-width="120px">
            {{addStrategyForm.fileSize}}
          </el-form-item>
          <el-form-item label="新版本提示" prop="updateTips" label-width="120px">
              <template>
                  <el-radio-group v-model="addStrategyForm.updateTips">
                    <el-radio :label="1">无提示</el-radio>
                    <el-radio :label="2">桌面图标</el-radio>
                    <el-radio :label="3">对话框</el-radio>
                    <el-radio :label="4">通知栏普通</el-radio>
                    <el-radio :label="5">通知栏常驻</el-radio>
                  </el-radio-group>
              </template>
          </el-form-item>
          <el-form-item label="安装提示" prop="installTips" label-width="120px">
            <template>
                  <el-radio-group v-model="addStrategyForm.installTips">
                    <el-radio :label="1">无提示</el-radio>
                    <el-radio :label="2">桌面图标</el-radio>
                    <el-radio :label="3">对话框</el-radio>
                    <el-radio :label="4">通知栏普通</el-radio>
                    <el-radio :label="5">通知栏常驻</el-radio>
                  </el-radio-group>
              </template>
          </el-form-item>
          <el-form-item label="是否按地区升级" prop="updateRegionalFlag" label-width="120px">
              <template>
                  <el-radio-group v-model="addStrategyForm.updateRegionalFlag">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
              </template>
          </el-form-item>
          <el-form-item label="自动下载" prop="autoDownloadFlag" label-width="120px">
              <template>
                  <el-radio-group v-model="addStrategyForm.autoDownloadFlag">
                    <el-radio :label="1">仅wifi</el-radio>
                    <el-radio :label="2">任意网络</el-radio>
                    <el-radio :label="3">否</el-radio>
                    <el-radio :label="4">以客户端为准</el-radio>
                  </el-radio-group>
              </template>
          </el-form-item>
          <el-form-item label="自动升级" prop="autoUpdateFlag" label-width="120px">
             <template>
                  <el-radio-group v-model="addStrategyForm.autoUpdateFlag ">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
              </template>
          </el-form-item>
          <el-form-item label="升级成功提示" prop="successTipsFlag" label-width="120px">
            <template>
                  <el-radio-group v-model="addStrategyForm.successTipsFlag ">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
              </template>
          </el-form-item>
          <el-form-item label="升级电量要求" prop="updatePowerNeed" label-width="120px">
            <template>
                  <div class="block">
                    <el-slider  v-model="addStrategyForm.updatePowerNeed"  :step="5"  show-stops>
                    </el-slider>
                </div>
              </template>
          </el-form-item>
          <el-form-item label="是否按IMEI升级" prop="updateImeiFlag" label-width="120px">
             <template>
                  <el-radio-group v-model="addStrategyForm.updateImeiFlag ">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
              </template>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary"  :style="{ display: showConfirm}" @click="configStrategy">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import {updateVersionDetailStatus,updateVersionDetail} from '@/api/versionDetail'
import {getVersionStrategyByVersionDetailId,updateVersionDetailStrategy} from '@/api/versionDetailStrategy'
  import FileMd5 from '@/models/file-md5.js'
  import Uploader from '@/components/upload/Uploader'
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
      showConfirm:'',
      // 添加的表单数据
      addStrategyForm: {
        "id": null,
        "detailVersionId": null,
        "versionId": null,
        "updateTips": null,
        "installTips": null,
        "updateRegionalFlag": null,
        "updateRegional": null,
        "autoDownloadFlag": null,
        "autoUpdateFlag": null,
        "autoUpdateStartTime": null,
        "autoUpdateEndTime": null,
        "updatePowerNeed": null,
        "successTipsFlag": null,
        "updateImeiFlag": null,
        currentVersionNo:null,
        updateVersionNo:null,
        fileName:null,
        fileSize:null,
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
          status:null,
          fileName:null
        },
        dataObj: {
        
        },
        ossUploadUrl:'api/aliyun/oss/upload',
        // ossUploadUrl:'/aliyun/oss/uploadToLocal',
        maxCount:1,
       
        //plupload文件上传
          server_config: this.global.server_config,
        up: {},
        files:[],
        tableData: [],
        uploading: false

    }
  },
  components: {
      'uploader': Uploader
  },
  created() {
    this.getParam()
    this.getVersionDetailList()
  },
  watch: {
      files: {
        handler() {
          this.tableData = [];
          this.files.forEach((e) => {
            this.tableData.push({
              name: e.name,
              size: e.size,
              upStatus: e.upStatus,
              id: e.id,
              percent: e.percent
            });
          });
        },
        deep: true
      }
  },
  components: {
      'uploader': Uploader
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
  //修改状态
 async handleUpdateVersioStatus(row,status){
    this.updateVersionDetail.detailId=row.id
    this.updateVersionDetail.status=status
      const {data:res}=  await updateVersionDetailStatus(this.updateVersionDetail)
      if(res.code!=0){
        return this.$message.error(res.msg)
      }
      this.getVersionDetailList()
  },
   async handleUpdateUseFlag(row){
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
        return this.$message.error(res.msg)
      }
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
    getUploadFileData(row){
      console.log("获取行",row)
      this.updateVersionDetail.detailId=row.id
      this.updateVersionDetail.status=2

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

    let types = ['application/x-zip-compressed','application/x-zip','application/zip'];
    console.log('文件类型',file.type)
        const isImage = types.includes(file.type);

        const isLtSize = file.size / 1024 / 1024 <= 1024;

        if (!isImage) {

          this.$message.error('上传文件只能是zip格式!');

          return false;

        }
        if (!isLtSize) {

          this.$message.error('上传文件不能超过 1G!');

          return false;
        }

        return true;
    },
      //上传文件成功后回调
    async handleUploadSuccess(res, file) {
      console.log('--res---',res)
      console.log("文件大小",file.size)
      console.log("文件类型",file.type)
      if(res.code!=0){
        return this.$message.error("上传文件失败，稍后重试")
      }
      //上传成功后更新上传数据
      this.updateVersionDetail.downloadUrl=res.data
      this.updateVersionDetail.fileName=file.name
      var num=file.size/ 1024 / 1024
      var flag=false;
      if(num<0.01){
        flag=true
        num=file.size/ 1024
      }
      this.updateVersionDetail.fileSize=num.toFixed(2)+""+(flag==true?"Kb":"M")
      const {data:res2} =  await updateVersionDetail(this.updateVersionDetail)
      this.getVersionDetailList()
    },  
    
    // 监听添加项目对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    //获取定制配置信息
    async versionStrategy(row){
      const{data:res}= await getVersionStrategyByVersionDetailId(row.id)
      console.log('策略返回',res)
      if(res.code!=0){
        this.$message.error(res.msg)
      }
      Object.assign(this.addStrategyForm,res.data)
      this.addDialogVisible=true
      if(row.status===3||row.status===5){//控制对话框确定按钮的显示、隐藏
        this.showConfirm='none'
      }else{
         this.showConfirm=''
      }
      console.log("策略详细信息",this.addStrategyForm)
    },

    // 更新定制策略
    configStrategy() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加项目的网络请求
        const { data: res } = await updateVersionDetailStrategy(this.addStrategyForm)
        if (res.code !== 0) {
          this.$message.error('修改配置失败！'+JSON.stringify(res.data))
        }
        // 隐藏添加项目的对话框
        this.addDialogVisible = false
      })
    },

    //plupload文件上传
      inputUploader(up) {
        console.log('up对象',up)
        debugger
        this.up = up;
        this.files = up.files;
          console.log('files******',this.files)
      },
      filesAdded(up, files) {
        files.forEach((f) => {
          f.upStatus = -1;
          FileMd5(f.getNative(), (e, md5) => {
            f["md5"] = md5;
            f.upStatus = 1;
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
      }
  }
}
</script>

<style lang="less" scoped>
</style>

<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>版本控制</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="app-container">
    
         <el-card  >
            <!-- 内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                
                <el-form-item label="版本号："  label-width='100px' prop="versionNo" style="width :100%">
                    <el-input type="text" :disabled="isEdit" v-model="addForm.versionNo" placeholder="版本号" ></el-input>
                </el-form-item>
                <el-form-item label="项目："  label-width='100px'  prop="projectName"   >
                       <el-select :disabled="isEdit"  v-model="addForm.projectName" style="width :100%"    :filterable="true"  @change="choosePorject($event)"  clearable>
                            <el-option  v-for="item in projectlist"  :key="item.projectName"  :label="item.projectName"  :value="item.id"   >
                            </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="版本大小：" label-width='100px' style="width: 300px"  prop="versionSize">
                        <el-input v-model="addForm.versionSize" > </el-input>
                </el-form-item>
                
                 <el-form-item label="发布日期：" label-width='100px' style="width: 300px"  prop="releaseTime" >
                     <el-date-picker   type="date"  v-model="addForm.releaseTime"      style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="备注：" label-width='100px' style="width: 300px"  prop="memo">
                        <el-input v-model="addForm.memo" > </el-input>
                </el-form-item>
                <div style="margin-bottom: 20px;">
                    <el-button size="small" @click="addLanguages(languages)" >
                         选择语言
                    </el-button>
                </div>
                <!-- -->
                <el-tabs   v-model="editableTabsValue" type="card"  @tab-remove="removeTab"  :closable="editableTabs.length>1">
                    <el-tab-pane    v-for="(item, index) in editableTabs"  :key="item.name"    :label="item.title"    :name="item.name">
                       <div>
                            <el-form-item label="升级描述：" label-width='100px'      prop="dsc">
                                    <el-input type='textarea'  v-model="item.dsc"  :autosize="{ minRows: 10, maxRows: 80}" > </el-input>
                            </el-form-item>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                
            </el-form>
         </el-card>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addOrUpdateVersion('addFormRef')">提交</el-button>
            </span>
        </div>




        <el-dialog title="选择语言" :visible.sync="addDialogVisible" width="50%"   >

            <el-checkbox-group v-model="checkList" :min="1" >
                <el-checkbox  v-for="language in languages" :key="language.languageCode" :label="language.languageName"></el-checkbox>
            </el-checkbox-group>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleCheckedLanguagesChange" >确定</el-button>
            </span>
         
      </el-dialog>
    </div>

    
</template>

<script>

import { getAllLanguages } from '@/api/versionDetail';
import {getversionInfo} from '@/api/version'
import dateFormat from "dateformat";

const baseForm={
                versionId:null,
                versionNo:null,
                releaseTime:new Date(),
                versionSize:'MB',
                memo:null,
                languages       :[
                    {
                        languageCode:'zh-cn',
                        languageName:null,
                        versionNo:null,
                        releaseTime:null,
                        versionSize:'MB',
                        dsc:null,
                        id:null
                    }
                ]
        }

export default {
 inject:['reload'],//注入reload方法，修改后刷新页面
    props:{
        isEdit:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            versionId: null,
            // 控制添加项目对话框的显示与隐藏
            addDialogVisible: false,
            queryInfo:{
                projectName: '',
                pageNo: 1,
                pageSize: 20
            },
            projectlist:[],
            addForm: {
                versionId:null,
                versionNo:null,
                releaseTime:null,
                projectId:null,
                versionSize:null,
                memo:null,
                languages:[
                    {
                        languageCode:null,
                        languageName:null,
                        versionNo:null,
                        releaseTime:null,
                        versionSize:null,
                        dsc:null,
                        id:null
                    }
                ]
            },
            checkList:['中文(中国)'],
            languages: [
                {   
                    id:'',
                    languageName:'',
                    languageCode:'',
                    versionSizeTitle:'',
                    versionNoTitle:'',
                    releaseTimeTitle:'',
                    defaultDsc:'',
                }
                
            ],
            // 添加表单的验证规则对象
            addFormRules: {
                versionNo: [{ required: true, message: '请输入版本号', trigger: 'blur' }],
                versionSize: [{ required: true, message: '请输入版本大小', trigger: 'blur' }],
                releaseTime: [{ required: true, message: '请输入发布日期', trigger: 'blur' }],
                projectName: [{ required: true, message: '请输选择项目', trigger: 'blur' }],
            },
            editableTabsValue: 'zh-cn',
            editableTabs: [{
                title:'中文(中国)',
                name:'zh-cn',
                dsc:'1.优化系统\r\n2.修复错误选择【立即安装】，设备将重启并进入升级模式，整个过程需花费几分钟时间，请您在此期间不要做任何操作，以免造成升级失败。',
                languageCode:'zh-cn'
            }],
        };
    },
    created() {
        this.chooseLanguages
        if(this.isEdit){

            this.getParam()
        }else{
            this.addForm = Object.assign({},baseForm);
            this.getProjectList();
        }
    },
     watch:{
      '$route':'getParam'
    },
    methods: {

         
         //页面初始化
       async getParam(){
            if(!this.isEdit){//新增数据不重新渲染，否则会出现'升级描述'组件加载不出来
                return;
            }
            const param=this.$route.query;
            this.versionId=param.versionId;
            this.editableTabs=[]
            if(this.versionId==null){
                return
            }
            const {data:res}= await getversionInfo(this.versionId)
            // console.log('版本信息详情',res)
            if(res.msg!='success'){
                return this.$message.error('获取版本失败',res.msg)
            }
            this.addForm=res.data
            this.checkList=[]
            for (let i = 0; i < this.addForm.languages.length; i++) {
                this.editableTabs.push({ title: this.addForm.languages[i].languageName, name: this.addForm.languages[i].languageCode+"",dsc:this.addForm.languages[i].dsc,
                id: this.addForm.languages[i].id,languageName: this.addForm.languages[i].languageName,languageCode: this.addForm.languages[i].languageCode});
                this.checkList.push(this.addForm.languages[i].languageName)//勾选已有的数据
            }
            this.editableTabsValue=res.data.languages[0].languageCode
        

        },
        //事件绑定
        choosePorject(e){
            this.addForm.projectId=e
        },
    
        // 点击按钮，添加新版本
        addOrUpdateVersion(formName) {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return;
            const confirmResult = await this.$confirm('是否提交数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => {
                console.log('提交版本失败', err);
                return err;
            });
            if (confirmResult !== 'confirm') {
                return this.$message.info('已经取消提交！');
            }
            this.addForm.languages=[]
            this.addForm.releaseTime=dateFormat(this.addForm.releaseTime,'yyyy-mm-dd HH:MM:ss')
            for (let index = 0; index < this.editableTabs.length; index++) {
                const element = this.editableTabs[index];
                this.addForm.languages.push({dsc:element.dsc,languageCode:element.languageCode,languageName:element.languageName,id:element.id,
                versionSize:this.addForm.versionSize,versionNo:this.addForm.versionNo,releaseTime:this.addForm.releaseTime
                })
            }
            if(this.isEdit){
                 const { data: res } = await this.$http.post('/version/update', this.addForm);
                
                if (res.code !== 0) {
                    this.$message.error('修改版本失败！' + JSON.stringify(res.msg));
                }else{
                    this.$message.success('修改成功')
                    this.getParam()
                }
            }else{
                const { data: res } = await this.$http.post('/version/create', this.addForm);
                
                if (res.code !== 0) {
                    this.$message.error('添加版本失败！' + JSON.stringify(res.msg));
                }else{
                    this.$refs.addFormRef.resetFields()
                    this.$message.success('添加版本成功')
                    // this.reload()
                    this.$router.push({path: '/versionManagement'})
                }
            }
            });
        },
       async chooseLanguages(){
             const { data: res }=await getAllLanguages()
             console.log('返回语言列表',res)
             if(res.code!=0){
                this.$message.error('选择语言失败:'+res.msg);
             }
             this.languages=res.data

        },

        addLanguages(languages) {
            this.addDialogVisible=true
            this.chooseLanguages();
      },
        removeTab(targetName) {
            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                        activeName = nextTab.name;
                    }
                    }
                });
            }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },
      // 根据分页获取对应的项目列表
        getProjectList() {
            this.$http
                .get('/project/queryPage', {
                    params: this.queryInfo
                })
                .then(res => {
                    res = res.data;
                    if (res.code !== 0) {
                        return this.$message.error('获取项目列表失败！');
                    }
                    this.projectlist = [];
                    let projectlist = res.data.list;
                    for (let i = 0; i < projectlist.length; i++) {
                        this.projectlist.push({ projectName: projectlist[i].projectName, id: projectlist[i].id });
                    }
                });
        },
        async versionInfoFun(versionId){
            this.editableTabs=[]
            if(versionId==null){
                return
            }
            const {data:res}= await getversionInfo(versionId)
            if(res.code!=0){
                return this.$message.error('获取版本失败',res.msg)
            }
            
            this.addForm=res.data
            for (let i = 0; i < res.data.languages      .length; i++) {
                this.editableTabs.push({ title: res.data.languages[i].languageName, name: res.data.languages[i].languageCode+"",dsc:res.data.languages[i].dsc,id:res.data.languages[i].id,languageCode:res.data.languages[i].languageCode,
                languageName:res.data.languages[i].languageName
                });
            }
        },
        handleCheckedLanguagesChange(checkList){
            this.addDialogVisible=false
            this.editableTabs=[]
            for (let index = 0; index < this.checkList.length; index++) {
                let  checked = this.checkList[index];
                //勾选值已存在数据库里
                for (let index = 0; index < this.languages.length; index++) {
                    let language = this.languages[index];
                    if(language.languageName===checked){
                        let isExist=false;
                        for (let index = 0; index <  this.addForm.languages     .length; index++) {
                            let lvo = this.addForm.languages        [index];
                            if(lvo.languageName===checked){//勾选值在数据库里，还显示原来的数据
                               this.editableTabs.push({ title: lvo.languageName, name:lvo.languageCode, dsc:lvo.dsc,id:lvo.id,languageName:lvo.languageName,languageCode:lvo.languageCode })
                               isExist=true
                            }
                        }
                        if(!isExist){
                            this.editableTabs.push({ title: language.languageName, name:language.languageCode,dsc:language.defaultDsc,id:null,languageCode:language.languageCode,languageName:language.languageName });
                        }
                    }
                }
                // console.log('editableTabs**********',this.editableTabs)
                this.editableTabsValue=this.editableTabs[this.editableTabs.length-1].name
                //  console.log('editableTabsValue**********',this.editableTabsValue)
            }
        },
        init(){
            this.editableTabsValue='zh-cn'
        }
         
    },
  
};
</script>

<style lang="less" scoped>
</style>

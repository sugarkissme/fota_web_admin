<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>版本控制</el-breadcrumb-item>
            <el-breadcrumb-item>添加最新版本</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="app-container">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                
                <el-form-item label="版本号"  label-width='100px' prop="versionNo">
                    <el-input v-model="addForm.versionNo" placeholder="版本号"></el-input>
                </el-form-item>
                <el-form-item label="项目："  label-width='100px' prop="designId">
                       <el-select   v-model="queryInfo.projectName"   placeholder="项目选择"   :filterable="true"   clearable>
                            <el-option  v-for="item in projectlist"  :key="item.value"  :label="item.label"  :value="item.label" >
                            </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item  label-width='100px' label="发布日期：" >
                    <el-date-picker  value-format="yyyy-MM-dd" type="date" placeholder="选择日期"    v-model="addForm.releaseTime" style="width: 150px">
                    </el-date-picker>
                </el-form-item>

                
                <div style="margin-bottom: 20px;">
                    <el-button size="small" @click="addLanguages(languages)">
                         选择语言
                    </el-button>
                </div>
                

                <el-tabs v-model="editableTabsValue" type="card"  @tab-remove="removeTab"  :closable="editableTabs.length>1">
                    <el-tab-pane    v-for="(item, index) in editableTabs"    :key="item.name"    :label="item.title"    :name="item.name">
                        {{item.content}}
                    </el-tab-pane>
                </el-tabs>
                 <el-form-item label="版本大小：" label-width='100px' style="width: 300px"  prop="versionSize">
                        <el-input v-model="addForm.versionSize" > </el-input>
                </el-form-item>
                 <el-form-item label="版本大小：" label-width='100px' style="width: 300px"  prop="versionSize">
                        <el-input v-model="addForm.versionSize" > </el-input>
                </el-form-item>
                 <el-form-item label="版本大小：" label-width='100px' style="width: 300px"  prop="versionSize">
                        <el-input v-model="addForm.versionSize" > </el-input>
                </el-form-item>

                <el-form-item label="升级描述：" label-width='100px'      prop="dsc">
                      <el-input type='textarea'  v-model="addForm.dsc"  :autosize="{ minRows: 10, maxRows: 80}" > </el-input>
                </el-form-item>
                
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addVersion">确 定</el-button>
            </span>
        </div>

        <el-dialog title="选择语言" :visible.sync="addDialogVisible" width="50%" @close="checkBoxClosed">
            <div  ref="languageRef"  v-for="(item,index) in languages" :key="index"> 
               <el-checkbox >
                   {{languages[index].languageName}}
                </el-checkbox>
            </div>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取消</el-button>
            <el-button type="primary"  >确定</el-button>
            </span>
      </el-dialog>
    </div>

    
</template>

<script>

import { getAllLanguages } from '@/api/versionDetail';
import {getversionInfo} from '@/api/version'

export default {
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
            // 添加项目的表单数据
            addForm: {
                versionId:null,
                versionNo:null,
                createTime:new Date(),
                projectName:null,
                versionSize:'MB',
                releaseTime:new Date,
                languageVOS:[
                    {
                        languageCode:'zh-cn',
                        versionNo:null,
                        createTime:null,
                        versionSize:'MB',
                        dsc:null,
                        id:null
                    }
                ]
            },
            languagesCheck:["中文(中国)"],
            checkList:[],
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
            //版本信息
            versionInfo:{
                versionId:null,
                versionNo:null,
                createTime:null,
                projectName:null,
                languageVOS:[
                    {
                        languageCode:null,
                        versionNo:null,
                        createTime:null,
                        versionSize:null,
                        dsc:null,
                        id:null
                    }
                ]

            },
            // 添加表单的验证规则对象
            addFormRules: {
                versionNo: [{ required: true, message: '请输入版本号', trigger: 'blur' }],
            },
            editableTabsValue: '2',
            editableTabs: [
                {
                title: '中文(中国)',
                name: '1',
                content: 'Tab 1 content'
                }
            ],
            tabIndex: 2
        };
    },
    created() {
        this.getParam()
        this.getProjectList();
    },
    methods: {
         
         //页面初始化
        getParam(){
            const param=this.$route.query;
            this.versionId=param.versionId;
            this.versionInfoFun(this.versionId)
        },
        
        addDialogClosed() {
             this.$refs.addFormRef.resetFields()
        },
        checkBoxClosed() {
             this.$refs.languageRef.resetFields()
        },
        // 点击按钮，添加新版本
        addVersion() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return;
                // 可以发起添加项目的网络请求
                const { data: res } = await this.$http.post('/project/create', this.addForm);
                if (res.code !== 0) {
                    this.$message.error('添加项目失败！' + JSON.stringify(res.data));
                }
                // 隐藏添加项目的对话框
                this.addDialogVisible = false;
                // 重新获取项目列表数据
                this.getProjectList();
            });
        },
       async chooseLanguages(){
             const { data: res }=await getAllLanguages()
             console.log('返回语言列表',res)
             if(res.code!=0){
                this.$message.error('选择原因失败:'+res.msg);
             }
             this.languages=res.data
             console.log("语言",this.languages)


        },

        addLanguages(languages) {
            let newTabName = languages[0].languageName;
            // this.editableTabs.push({
            //     title: newTabName,
            //     name: newTabName,
            //     content: languages.defaultDsc
            // });
            this.editableTabsValue = newTabName;
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
                    // console.log('返回结果',res)
                    //      console.log('项目列表查询',res.data.list)
                    if (res.code !== 0) {
                        return this.$message.error('获取项目列表失败！');
                    }
                    this.projectlist = [];
                    let projectlist = res.data.list;
                    for (let i = 0; i < projectlist.length; i++) {
                        this.projectlist.push({ label: projectlist[i].projectName, value: projectlist[i].id });
                    }
                });
        },
        async versionInfoFun(versionId){
            if(versionId==null){
                console.log('没有版本id')
                return
            }
            const {data:res}= await getversionInfo(versionId)
            console.log('版本信息详情',res)
            if(res.code!=0){
                return this.$message.error('获取版本失败',res.msg)
            }
            this.addForm=res.data
        }
    },
    
   
  
};
</script>

<style lang="less" scoped>
</style>

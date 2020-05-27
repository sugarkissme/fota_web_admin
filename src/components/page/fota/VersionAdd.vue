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
                <el-form-item label="项目"  label-width='100px' prop="designId">
                    <el-select v-model="addForm.designId" placeholder="请选择项目" filterable style="width: 100%" >
                        <el-option v-for="item in projectlist" :key="item.value" :label="item.label" :value="item.value">

                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item  label-width='100px' label="发布日期：" >
                    <el-date-picker  value-format="yyyy-MM-dd" type="date" placeholder="选择日期"    v-model="addForm.releaseTime" style="width: 150px">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="版本大小：" label-width='100px' style="width: 300px"  prop="versionSize">
                      <el-input v-model="addForm.versionSize" > </el-input>
                </el-form-item>
                
                <div style="margin-bottom: 20px;">
                    <el-button size="small" @click="addTab(editableTabsValue)">
                         选择语言
                    </el-button>
                </div>
                <el-tabs v-model="editableTabsValue" type="card"  @tab-remove="removeTab"  :closable="editableTabs.length>1">
                    <el-tab-pane    v-for="(item, index) in editableTabs"    :key="item.name"    :label="item.title"    :name="item.name">
                        {{item.content}}
                    </el-tab-pane>
                </el-tabs>
                
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

        <el-dialog title="选择语言" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <div v-for="(item,index) in languages" :key="index"> 
               <el-checkbox >
                   {{languages[index].languageName}}
                    </el-checkbox>
            </div>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary"  >确 定</el-button>
            </span>
      </el-dialog>
    </div>

    
</template>

<script>

import { getAllLanguages } from '@/api/versionDetail';
const defaultListQuery = {
    projectName: ''
};

export default {
    data() {
        return {
            // 查询参数对象
            // 项目列表
            projectlist: [],
            versionList: [],
            // 总数据条数
            totalSize: 0,
            brandList: [],
            designCompanyList: [],
            queryInfo: Object.assign({}, defaultListQuery),
            // 控制添加项目对话框的显示与隐藏
            addDialogVisible: false,
            // 添加项目的表单数据
            addForm: {
                    versionNo: '',
                    versionSize: 'M',
                    releaseTime: new Date(),
                    releaseTimeTitle: '',
                    versionSizeTitle:'',
                    versionNoTitle:'',
                    dsc:'',
            },
            languagesCheck:["中文(中国)"]
            ,
            languages: [
                {
                    versionSizeTitle:'',
                    versionNoTitle:'',
                    releaseTimeTitle:'',
                }
                
            ],
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
        this.getProjectList();
      
    },
    methods: {
        getVersionList() {
            this.$http
                .get('/version/queryVersionPage', {
                    params: this.queryInfo
                })
                .then(res => {
                    res = res.data;
                    console.log('版本返回', res);
                    if (res.code !== 0) {
                        return this.$message.error('获取版本列表失败！');
                    }
                    this.versionList = res.data.list;
                    this.totalSize = res.data.totalSize;
                    // console.log('版本设列表', this.versionList);
                });
        },
          addDialogClosed() {
             this.$refs.addFormRef.resetFields()
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

        addTab(targetName) {
            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
            title: 'New Tab1',
            name: newTabName,
            content: ""
            });
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
      }
    },
   
  
};
</script>

<style lang="less" scoped>
</style>

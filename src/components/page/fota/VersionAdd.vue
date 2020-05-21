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
                
                <el-form-item label="版本号" prop="versionNo">
                    <el-input v-model="addForm.versionNo" placeholder="版本号"></el-input>
                </el-form-item>
                <el-form-item label="项目" prop="designId">
                    <el-select v-model="addForm.designId" placeholder="请选择项目" filterable style="width: 100%" >
                        <el-option v-for="item in projectlist" :key="item.value" :label="item.label" :value="item.value">

                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="发布日期：">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.createTime" style="width: 150px">

                    </el-date-picker>
                </el-form-item>
                <el-form-item label="语言" prop="language">
                    <el-select v-model="addForm.language" placeholder="选择语言" filterable style="width: 100%">
                        <el-option
                            v-for="item in languages"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addVersion">确 定</el-button>
            </span>
        </div>
    </div>
</template>

<script>
import { deleteVersion } from '@/api/version';
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
                designId: '',
                brandId: '',
                versionNo: '',
                language: '',
                operator: '',
                productName: ''
            },
            operators: [
                {
                    value: 'other',
                    label: 'other'
                },
                {
                    value: 'CMCC',
                    label: 'CMCC'
                },
                {
                    value: 'CU',
                    label: 'CU'
                }
            ],
            languages: [
                {
                    value: 'zh-CN',
                    label: '中文'
                },
                {
                    value: 'en-US',
                    label: '英文'
                },
                {
                    value: 'ja-JP',
                    label: '日语'
                }
            ],
            // 添加表单的验证规则对象
            addFormRules: {
                designId: [{ required: true, message: '请选择设计公司', trigger: 'blur' }],
                brandId: [{ required: true, message: '请选择品牌商', trigger: 'blur' }],
                productName: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
                versionNo: [{ required: true, message: '请输入版本号', trigger: 'blur' }],
                language: [{ required: true, message: '请语言', trigger: 'blur' }],
            }
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
        }
    }
};
</script>

<style lang="less" scoped>
</style>

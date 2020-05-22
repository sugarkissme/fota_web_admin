<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>版本控制</el-breadcrumb-item>
            <el-breadcrumb-item>版本管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="app-container">
            <el-card class="filter-container" shadow="never">
                <div>
                    <el-button
                        style="float: right"
                        @click="getVersionList()"
                        type="primary"
                        size="small"
                    >查询结果</el-button>
                    <el-button
                        type="primary"
                        style="float: right;margin-right: 15px"
                        @click="handleResetSearch()"
                        size="small"
                    >重置</el-button>
                    <el-button
                        type="primary"
                        style="float: right ;margin-right: 15px"
                        class="btn-add"
                        @click="handleAddVersion()"
                        size="small"
                    >添加最新版本</el-button>
                </div>
                <div style="margin-top: 15px">
                    <el-form inline>
                        <el-form-item>
                            <el-select
                                v-model="queryInfo.designName"
                                placeholder="设计公司"
                                :filterable="true"
                                clearable
                            >
                                <el-option
                                    v-for="item in designCompanyList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.label"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-select
                                v-model="queryInfo.brandName"
                                placeholder="品牌商选择"
                                :filterable="true"
                                clearable
                            >
                                <el-option
                                    v-for="item in brandList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.label"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-select
                                v-model="queryInfo.projectName"
                                placeholder="项目选择"
                                :filterable="true"
                                clearable
                            >
                                <el-option
                                    v-for="item in projectlist"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.label"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>

            <!-- 添加项目的对话框 -->
            <el-dialog
                title="添加项目"
                :visible.sync="addDialogVisible"
                width="50%"
                @close="addDialogClosed"
            >
                <!-- 内容主体区域 -->
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                    <el-form-item label="设计公司" prop="designId">
                        <el-select
                            v-model="addForm.designId"
                            placeholder="请选择设计公司"
                            filterable
                            style="width: 100%"
                        >
                            <el-option
                                v-for="item in designCompanyList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="品牌商" prop="brandId">
                        <el-select
                            v-model="addForm.brandId"
                            placeholder="请选择品牌商"
                            filterable
                            style="width: 100%"
                        >
                            <el-option
                                v-for="item in brandList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="OEM" prop="oem">
                        <el-input v-model="addForm.oem" placeholder="原始设备制造商"></el-input>
                    </el-form-item>
                    <el-form-item label="PRODUCT" prop="productName">
                        <el-input v-model="addForm.productName" placeholder="产品名称" s></el-input>
                    </el-form-item>
                    <el-form-item label="LANGUAGE" prop="language">
                        <el-select
                            v-model="addForm.language"
                            placeholder="语言"
                            filterable
                            style="width: 100%"
                        >
                            <el-option
                                v-for="item in languages"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="OPERATOR" prop="operator">
                        <el-select
                            v-model="addForm.operator"
                            placeholder="操作"
                            filterable
                            style="width: 100%"
                        >
                            <el-option
                                v-for="item in operators"
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
                    <el-button type="primary" @click="addRroject">确 定</el-button>
                </span>
            </el-dialog>
        </div>

        <div class="table-container">
            <!-- table表格区域 -->
            <el-table :data="versionList" border stripe>
                <!-- <el-table-column type="index"></el-table-column> -->
                <el-table-column label="版本ID" width="80px" prop="versionId"></el-table-column>
                <el-table-column label="设计公司" prop="designName"  ></el-table-column>
                <el-table-column label="品牌商" prop="brandName" ></el-table-column>
                <el-table-column label="项目" prop="projectName" width="330px"></el-table-column>
                <el-table-column label="创建时间" prop="createTime"></el-table-column>
                <el-table-column label="版本号" prop="versionNo"></el-table-column>
                <el-table-column label="版本状态" prop="status"></el-table-column>
                <el-table-column label="备注" prop="memo"></el-table-column>
                <el-table-column label="操作" width="240px">
                    <template slot-scope="scope">
                        <el-button type="warning" icon="el-icon-delete" size="mini" @click="handleDeleteVersion(scope.row)">

                        </el-button>
                        <el-button  type="info"  icon="el-icon-setting" :disabled="computeStatus(scope.row.status)"  size="mini"  @click="handleBeforeVersion(scope.row)">设置</el-button>
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            @click="handleEditVersion(scope.row.versionId)"
                        >编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="paginnation-container">
            <!-- 分页区域 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNo"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalSize"
                background
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import { deleteVersion } from '@/api/version';
const defaultListQuery = {
    versionId: null,
    brandName: '',
    productName: '',
    designName: '',
    projectName: '',
    pageNo: 1,
    pageSize: 20
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
                oem: '',
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
                oem: [{ required: true, message: '请输入OEM', trigger: 'blur' }],
                language: [{ required: true, message: '请输入语言', trigger: 'blur' }],
                operator: [{ required: true, message: '请输入OPERATOR', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getProjectList();
        this.getBrandList();
        this.getDesignCompanyList();
        this.getVersionList();
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

        getBrandList() {
            this.$http
                .get('/brand/queryPage', {
                    params: this.queryInfo
                })
                .then(res => {
                    res = res.data;
                    this.brandList = [];
                    // console.log('品牌信息返回',res)
                    let brandList = res.data.list;

                    for (let i = 0; i < brandList.length; i++) {
                        this.brandList.push({ label: brandList[i].brandName, value: brandList[i].id });
                    }
                    // console.log('品牌信息列表',brandList)
                });
        },

        getDesignCompanyList() {
            this.$http
                .get('/designCompany/queryPage', {
                    params: this.queryInfo
                })
                .then(res => {
                    res = res.data;
                    this.designCompanyList = [];
                    let designCompanyList = res.data.list;
                    for (let i = 0; i < designCompanyList.length; i++) {
                        this.designCompanyList.push({ label: designCompanyList[i].designName, value: designCompanyList[i].id });
                    }
                    // console.log('设计公司列表',designCompanyList)
                });
        },

        handleSizeChange(newSize) {
            this.queryInfo.pageSize = newSize;
            this.getProjectList();
        },
        handleCurrentChange(newPage) {
            this.queryInfo.pageNo = newPage;
            this.getProjectList();
        },
        async handleDeleteVersion(row) {
            console.log('----当前版本行------', row);
            const confirmResult = await this.$confirm('此操作将永久删除该版本, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => {
                console.log('删除版本失败', err);
                return err;
            });

            if (confirmResult !== 'confirm') {
                return this.$message.info('已经取消删除！');
            }
            console.log('版本id', row.versionId);
            const { data: res } = await deleteVersion(row.versionId);
            if (res.code !== 0) {
                return this.$message.error('删除失败！');
            }
            this.$message.success('删除成功！');
            this.getVersionList();
        },

        projectCreate() {
            this.$router.push('/project/create');
        },
       
        // 重置
        handleResetSearch() {
            this.queryInfo = Object.assign({}, defaultListQuery);
            this.getVersionList();
        },

        // 监听添加项目对话框的关闭事件
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
        },
        // 点击按钮，添加新项目
        addRroject() {
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
        handleAddVersion(){
          this.$router.push({path:'/versionAdd'})
        },
        handleBeforeVersion(param) {
            this.$router.push({path:'/versionDetail',
            query:{
                updateVersionNo:param.versionNo,
                updateVersionId:param.versionId,
                projectName:param.projectName

            }
            
            });
        },
           handleEditVersion() {
            this.$router.push('/project/create');
        },
        computeStatus(status){
        if(status=='0'){
            return true
        }
        return false;
    },
    },
  
};
</script>

<style lang="less" scoped>
</style>

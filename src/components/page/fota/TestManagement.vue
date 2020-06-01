<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>测试IMEI</el-breadcrumb-item>
            <el-breadcrumb-item>测试IMEI管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="app-container">
            <el-card class="filter-container" shadow="never">
                <div>
                    
                    <el-button
                        style="float: right ;margin-right: 30px"
                        @click="delDialogVisible=true"
                        type="primary"
                        size="small"
                    >删除指定项目IMEI</el-button>
                    <el-button
                        type="primary"
                        style="float: right;margin-right: 30px"
                        @click="addDialogVisible=true"
                        size="small"
                    >添加IMEI</el-button>
                   
                    <el-button
                        type="primary"
                        style="float: right;margin-right: 30px"
                        @click="handleResetSearch()"
                        size="small"
                    >批量导入IMEI</el-button>
                   <el-button
                        type="primary"
                        style="float: right;margin-right: 30px"
                        @click="handleResetSearch()"
                        size="small"
                    >下载IEMI模板</el-button>
                   <el-button
                        type="primary"
                        style="float: right;margin-right: 30px"
                        @click="handleResetSearch()"
                        size="small"
                    >重置所有状态</el-button>

                </div>
                <div style="margin-top: -10px">
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

            <!-- 指定项目添加IMEI的对话框 -->
            <el-dialog   title="添加IMEI"     :visible.sync="addDialogVisible"     width="50%"     @close="addDialogClose" >
                <!-- 内容主体区域 -->
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                    <el-form-item label="选择项目" label-width="120px" prop="projectId">
                        <el-select  v-model="addForm.projectId"  placeholder="请选择项目"  filterable  style="width: 100%" >
                            <el-option v-for="item in projectlist" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="IMEI" prop="imei" label-width="120px"  >
                         <el-input v-model="addForm.imei" placeholder="IMEI"  ></el-input>
                     </el-form-item>
                </el-form>
                <!-- 底部区域 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addImei">确定</el-button>
                </span>
            </el-dialog>

                   <!-- 删除指定项目IMEI的对话框 -->
            <el-dialog   title="删除指定项目"    :visible.sync="delDialogVisible"     width="50%"     @close="delDialogClose" >
                <!-- 内容主体区域 -->
                <el-form :model="addForm" :rules="delFormRules" ref="delFormRef" label-width="70px">
                    <el-form-item label="选择项目" label-width="120px" prop="projectId">
                        <el-select  v-model="addForm.projectId"  placeholder="请选择项目"  filterable  style="width: 100%" >
                            <el-option v-for="item in projectlist" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <!-- 底部区域 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="delImei">确定</el-button>
                </span>
            </el-dialog>

        </div>

    


        <div class="table-container">
            <!-- table表格区域 -->
            <el-table :data="imeiList" border stripe>
                <!-- <el-table-column type="index"></el-table-column> -->
                <el-table-column label="ID" width="80px" prop="id"></el-table-column>
                <el-table-column label="设计公司" prop="designName"  ></el-table-column>
                <el-table-column label="品牌商" prop="brandName" ></el-table-column>
                <el-table-column label="项目" prop="projectName" width="330px"></el-table-column>
                <el-table-column label="IMEI" prop="imei"></el-table-column>
                <el-table-column label="最近修改时间" prop="updateTime"></el-table-column>
                 <el-table-column label="是否启用" prop="useFlag"  > 
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.useFlag" active-value="1" inactive-value="0" @change="handleUpdateUseFlag(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="260px">
                    <template slot-scope="scope">
                        <el-button type="warning" icon="el-icon-delete" size="mini" @click="handleDeleteImeiTest(scope.row)">
                        </el-button>
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
import { deleteIemiTestById,createImeiTest,deleteIemiTestByProjectId,resetAllStatus,resetStatusById } from '@/api/imeiTest';
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
            imeiList:[],
            projectlist: [],
            // 总数据条数
            totalSize: 0,
            brandList: [],
            designCompanyList: [],
            queryInfo: Object.assign({}, defaultListQuery),
            // 控制添加项目对话框的显示与隐藏
            addDialogVisible: false,
            delDialogVisible: false,
            // 添加项目的表单数据
            addForm: {
                projectId: '',
                imei: ''
            },
            delForm: {
                projectId: '',
            },
            // 添加表单的验证规则对象
            addFormRules: {
                projectId: [{ required: true, message: '请选项目', trigger: 'blur' }],
                imei: [{ required: true, message: 'IMEI必填', trigger: 'blur' }],
            },
             // 添加表单的验证规则对象
            delFormRules: {
                projectId: [{ required: true, message: '请选项目', trigger: 'blur' }],
            },
            updateUseFlag:{
                id:null,
                useFlag:null
            }
        };
    },
    created() {
        this.getProjectList();
        this.getBrandList();
        this.getDesignCompanyList();
        this.getImeiList();
    },
    methods: {
        getImeiList() {
            this.$http
                .get('/imeiTest/queryPage', {
                    params: this.queryInfo
                })
                .then(res => {
                    res = res.data;
                    console.log('测试IMEI返回', res);
                    if (res.code !== 0) {
                        return this.$message.error('获取IMEI列表失败！');
                    }
                    this.imeiList = res.data.list;
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
        async handleDeleteImeiTest(row) {
            console.log('----当前------', row);
            const confirmResult = await this.$confirm('此操作将永久删除该测试IMEI, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => {
                console.log('删除测试IMEI', err);
                return err;
            });

            if (confirmResult !== 'confirm') {
                return this.$message.info('已经取消删除！');
            }
            const { data: res } = await deleteIemiTestById(row.id);
            if (res.code !== 0) {
                return this.$message.error('删除失败！');
            }
            this.$message.success('删除成功！');
            this.getImeiList()
            
        },

           async handleUpdateUseFlag(row){
                const {data:res}=  await resetStatusById(row.id,row.useFlag)
                if(res.code!=0){
                    if(row.useFlag===0){
                    row.useFlag=1
                    }else{
                    row.useFlag=0
                    }
                    return this.$message.error(res.msg)
                }
              
        },

        projectCreate() {
            this.$router.push('/project/create');
        },
       
        // 重置
        handleResetSearch() {
            this.queryInfo = Object.assign({}, defaultListQuery);
        },

        // 监听添加IEMI对话框的关闭事件
        addDialogClose() {
            this.$refs.addFormRef.resetFields();
        },
         // 监听添加IEMI对话框的关闭事件
        delDialogClose() {
            this.$refs.delFormRef.resetFields();
        },
        // 点击按钮，添加新IEMI
        addImei() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return;
                // 可以发起添加IMEI的网络请求
                const { data: res } = await this.$http.post('/imeiTest/create', this.addForm);
                if (res.code !== 0) {
                    this.$message.error('添加IMEI失败！' + JSON.stringify(res.data));
                }
                // 隐藏添加IEMI的对话框
                this.addDialogVisible = false;
                // 重新获取IEMI列表数据
                this.getImeiList()
            });
        },
          // 点击按钮，删除指定项目IMEI
        delImei() {
            this.$refs.delFormRef.validate(async valid => {
                if (!valid) return;
                 const confirmResult = await this.$confirm('此操作将永久删除该项目的所有IMEI, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).catch(err => {
                    console.log('此操作将永久删除该项目的所有IMEI', err);
                    return err;
                });
                if (confirmResult !== 'confirm') {
                     this.delDialogVisible = false;
                    return this.$message.info('已经取消删除！');
                }
                // 可以发起添加IMEI的网络请求
                const { data: res } = await this.$http.post('/imeiTest/deleteByProjectId/'+this.delForm.projectId);
                if (res.code !== 0) {
                    this.$message.error('删除指定项目IMEI失败！' + JSON.stringify(res.data));
                }
                // 隐藏添加IEMI的对话框
                this.delDialogVisible = false;
                // 重新获取IEMI列表数据
                this.getImeiList()
            });
        }
    
    },
  
};
</script>

<style lang="less" scoped>
</style>

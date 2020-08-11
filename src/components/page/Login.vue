<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">合众思壮FOTA管理平台</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="userName">
                    <el-input v-model="param.userName" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>

                  <el-form-item prop="seccode" class="inputbar">
                        <el-input class="log-input" v-model="param.seccode" placeholder="验证码"  @keydown.enter.native="submitForm()"  >
                                  <el-button slot="append" ><span class="checkCode" @click="createCode">{{ checkCode}}</span></el-button>
                        </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data: function() {
        return {
            param: {
                userName: '',
                password: '',
                seccode: '',
            },
            checkCode:'',
            rules: {
                userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                seccode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
            },
             sessionKey:'',
        };
    },
     mounted () {
        this.createCode();
    },
    methods: {
        ...mapMutations(['changeLogin']),
        submitForm() {
            this.$refs.login.validate(valid => {
                if(this.param.seccode.toLocaleLowerCase() != this.checkCode.toLocaleLowerCase()) {
                    this.$message({
                        message: "验证码错误",
                        type: "warning"
                    });
                    this.createCode();
                    return false;
                }
                if (valid) {
                    
                    this.$http.get('/admin/login',{params:this.param,headers:{"sessionKey":" "}}).then(res =>{
                             res = res.data
                            if(res.data==null){
                           
                                return this.$message.error(res.msg);  
                            }
                            console.log("获取到sessionKey---",this.sessionKey);
                            this.changeLogin({sessionKey: res.data,userName:this.param.userName})
                            this.$router.push('/')
                       }
                    ).catch(err=>{
                        console.log("异常了---",err);
                    })
                
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        createCode() {
            var code = "";
            const codeLength = 4; //验证码的长度  
            const random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
            for(let i = 0; i < codeLength; i++) { //循环操作  
                let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）  
                code += random[index]; //根据索引取得随机数加到code上  
            }
            this.checkCode = code; //把code值赋给验证码  
	    },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
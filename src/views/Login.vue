<template>
  <!-- <div class="container">
    <el-form ref="form" :model="form" :rules="rules" class="login-box">
      <h2>欢迎登录食堂管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input
          type="text"
          placeholder="请输入用户名"
          v-model="form.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="请选择用户类型" prop="userType">
        <el-radio-group v-model="form.userType">
          <el-radio :label="2">食堂商家</el-radio>
          <el-radio :label="0">管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-button type="primary" @click="submitForm('form')">登录</el-button>
    </el-form>
  </div> -->
  
  <div class="container">
    <div class="main">
        <!-- 整个注册盒子 -->
      <div class="loginbox">
          <!-- 左侧的注册盒子 -->
          <div class="loginbox-in">
          <div class="userbox"> 
           <span class="iconfont">&#xe817;</span> 
           <input  class="user" id="user"  v-model="name" placeholder="用户名">
           </div>
          <br>
          <div class="pwdbox">
            <span class="iconfont">&#xe775;</span>
           <input  class="pwd"  id="password" v-model="pwd" type="password"  placeholder="密码">
           </div>
          <br>
          <div class="pwdbox">
            <span class="iconfont">&#xe775;</span>
           <input  class="pwd"  id="re_password"  v-model="repwd" type="password"  placeholder="确认密码">
           </div>
           
           <br>
           <button type="primary"  class="register_btn" @click="register">Register</button>
     </div>
 
        <!-- 右侧的注册盒子 -->
         <div class="background">
            <div class="title">Welcome to Student abaaba HomePage</div>
        </div>

      </div>
    </div>
  </div>



</template>
<script>
import { login } from "../api/user.js";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      form: {
        username: "",
        password: "",
        userType: 2, //用户类型
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        userType: [
          {
            required: true,
            message: "请选择用户类型",
            trigger: "change",
          },
        ]
      },
    };
  },
  methods: {
    // 提交登录信息
    submitForm(formName) {
      // 通过vuex提交登录的用户名
      // this.$store.commit('setUserName', this.form.username);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          // 调用登录接口
          login(
            this.form.username,
            this.form.password,
            this.form.userType
          ).then((res) => {
            // 商家登录成功
            if (res.data.success) {
              // console.log("对对对");
              // let result = res.data.rows[0];
              // // 应该是要储存后端传来的token
              // window.sessionStorage.setItem("token", result.token);
              // window.sessionStorage.setItem(
              //   "userInfo",
              //   JSON.stringify(result.userInfo)
              // );
              // console.log(res.data)
              this.$store.dispatch("set_token", res.data.token);
              window.sessionStorage.setItem('token', res.data.token);
              // 保存用户类型
              this.$store.dispatch("set_userType", this.form.userType);
              window.sessionStorage.setItem('userType', this.form.userType);
              // 页面跳转
              // this.$router.push(this.$store.activePath)
              // 成功登录后的缓存数据
              window.sessionStorage.setItem("isLogin", "true");
              // 由于vue的DOM更新是异步的，所以要等数据更新完之后再跳转页面
              this.$router.push({
                name: "Ordering",
                params: {
                  name: this.form.username,
                },
              });

              
            } else {
              this.$message({
                showClose: true,
                message: "用户名或密码错误!",
                type: "error",
              });
              return false;
            }
          });

          
          // 保存用户名
          // sessionStorage.setItem('userName', this.$store.state.userInfo.userName);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
/* .login-box {
  width: 400px;
  margin: 150px auto;
  padding: 50px;
  border: 1px solid #dcdfe6;
  border-radius: 15px;
  box-shadow: 0 0 50px 0 rgba(146, 146, 146, 0.63);
  background-color: #fff;
} */

.loginbox{
    position:absolute;
    width:800px;
    height:400px;
    top:40%;
    left:50%;
    transform:translate(-50%,-50%);
}

input:-webkit-autofill {
  /* 修改默认背景框的颜色 */
 box-shadow: 0 0 0px 1000px  #89AB9E inset !important;
 /* 修改默认字体的颜色 */
 -webkit-text-fill-color: #445b53;
} 

input:-webkit-autofill::first-line {
  /* 修改默认字体的大小 */
 font-size: 15px;
 /* 修改默认字体的样式 */
 font-weight:bold;
 }

 .loginbox{
    display:flex;
    position:absolute;
    width:800px;
    height:400px;
    top:40%;
    left:50%;
    transform:translate(-50%,-50%);
    box-shadow: 0 12px 16px 0  rgba(0,0,0,0.24), 0 17px 50px 0 #4E655D;
}
.loginbox-in{
     background-color:#89AB9E;
     width:240px;
}
.userbox{
    margin-top:120px ;
    height:30px;
     width:230px;
     display: flex;
     margin-left:25px;
}
.pwdbox{ 
    height:30px;
    width:225px;
    display: flex;
    margin-left:25px;
}

.background{
    width:570px;
    background-image:url('../../public/img/background.png');
    background-size:cover;
    font-family:sans-serif;
}
.title{
    margin-top:320px;
    font-weight:bold;
    font-size:20px;
    color:#dedede;
    
}
.title:hover{
     font-size:21px;
     transition: all 0.4s ease-in-out;
     cursor: pointer;
}
.uesr-text{
     position:left;
}
input{
    outline-style: none ;
    border: 0;
    border-bottom:1px solid #E9E9E9;
    background-color:transparent;
    height:20px;
     font-family:sans-serif;
    font-size:15px;
    color:#445b53;
    font-weight:bold;
}
 /* input::-webkit-input-placeholder{
    color:#E9E9E9;
 } */
input:focus{
    border-bottom:2px solid #445b53;
    background-color:transparent;
     transition: all 0.2s ease-in;
     font-family:sans-serif;
    font-size:15px;
     color:#445b53;
     font-weight:bold;
     
}
input:hover{
    border-bottom:2px solid #445b53;
    background-color:transparent;
     transition: all 0.2s ease-in;
     font-family:sans-serif;
    font-size:15px;
     color:#445b53;
     font-weight:bold;
     
}
 
input:-webkit-autofill {
  /* 修改默认背景框的颜色 */
 box-shadow: 0 0 0px 1000px  #89AB9E inset !important;
 /* 修改默认字体的颜色 */
 -webkit-text-fill-color: #445b53;
} 

input:-webkit-autofill::first-line {
  /* 修改默认字体的大小 */
 font-size: 15px;
 /* 修改默认字体的样式 */
 font-weight:bold;
 }
.log-box{
    font-size:12px;
    display: flex;
    justify-content: space-between ;
    width:190px;
    margin-left:30px;
    color:#4E655D;
    margin-top:-5px;
    align-items: center;
   
}
.log-box-text{
    color:#4E655D;
    font-size:12px;
      text-decoration:underline;
    }
.login_btn{
    background-color: #5f8276; /* Green */
    border: none;
    color: #FAFAFA;
    padding: 5px 22px;
    text-align: center;
    text-decoration: none;
    font-size: 13px;
    border-radius: 20px;
    outline:none;
}
.login_btn:hover{
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    cursor: pointer;
     background-color: #0b5137;
      transition: all 0.2s ease-in;
}

.warn{
    margin-top:60px;
    /* margin-right:120px; */
    margin-left:-120px;
    margin-bottom: 5px;
     font-weight:bold;
    font-size:17px;
}

.register_btn{
    background-color: transparent; /* Green */
    border: none;
    text-decoration: none;
    font-size: 12px;
    /* border-radius: 20px;   */
     color:#4E655D;
    font-size:12px;
    text-decoration:underline;
    display: flex;
    margin-left:25px;
    outline:none;
    
}
.register_btn:hover{
    font-weight:bold;
    cursor: pointer;
}
/* @font-face {
    font-family: "iconfont";
    src: url('./font/iconfont.eot');
    src: url('./font/iconfont.eot?#iefix') format('embedded-opentype'), 
    url('./font/iconfont.woff2') format('woff2'), url('./font/iconfont.woff') format('woff'), url('./font/iconfont.ttf') format('truetype'), 
    url('./font/iconfont.svg#iconfont') format('svg');
} */

.iconfont {
    font-family: "iconfont" !important;
    font-size: 20px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height:22px;
    color:#4E655D;
    margin-right:10px;
    margin-top:3px;
}

.icon-key:before {
    content: "\e775";
}

.icon-account:before {
    content: "\e817";
}


</style>

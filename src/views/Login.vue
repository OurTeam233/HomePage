<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" class="login-box">
      <h2>{{title}}</h2>
      <el-form-item label="账号" prop="username">
        <el-input
          type="text"
          placeholder="请输入用户名"
          v-model="form.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="type == 0">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item label="请输入密码" prop="password" v-if="type == 1">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="请确认密码" prop="againpassword" v-if="type == 1">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.newpassword"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item label="请输入原始密码" prop="password" v-if="type == 2">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="请输入新的密码" prop="newpassword" v-if="type == 2">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.newpassword"
          show-password
        ></el-input>
      </el-form-item>

      <el-button type="text" @click="changeToOne">注册</el-button>
      <el-button type="text" @click="changeToTwo">修改密码</el-button>
      <el-button type="text" @click="changeToZero">已有账号</el-button>
      <el-button type="primary" @click="submitForm('form')">登录</el-button>
    </el-form>
  </div>
  
  



</template>
<script>
import { login } from "../api/user.js";

export default {
  name: "Login",
  data() {
    // 验证密码是否一致
    const vaildatePass1 = (rule, value, callback) => {
      if(this.form.newpassword != this.form.password){
        // let it = this.form.password
        // let i = this.form.newpassword
        // console.log(it)
        // console.log(i)
        callback(new Error('两次输入的密码不一致'))
      } 
      else if(this.form.newpassword == ""){
        callback(new Error('请输入密码'));
      } else {
        callback()
      }
    }
    //验证修改密码
    const vaildatePass2 = (rule, value, callback) => {
      if(this.form.newpassword == this.form.password){
        // let it = this.form.password
        // let i = this.form.newpassword
        // console.log(it)
        // console.log(i)
        callback(new Error('请输入新的密码'))
      } 
      else if(this.form.newpassword == ""){
        callback(new Error('请输入密码'));
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        username: "",
        password: "",
        newpassword: "",
      },
      type: 0,
      title: "欢迎登录学生系统",
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
        againpassword: [
          {
            required: true,
            validator: vaildatePass1,
            // message: "请输入密码",
            trigger: "blur",
          }
        ],
        newpassword: [
          {
            required: true,
            validator: vaildatePass2,
            // message: "请输入密码",
            trigger: "blur",
          }
        ]
        
      },
    };
  },
  methods: {
    //将类型修改成注册
    changeToOne(){
      this.type = 1;
      this.title = "注册";
      this.form.username = "";
      this.form.password = "";
      this.form.newpassword = "";
    },

    //将类型修改成修改密码
    changeToTwo(){
      this.type = 2;
      this.title = "修改密码";
      this.form.username = "";
      this.form.password = "";
      this.form.newpassword = "";
    },

    //将类型修改成登录
    changeToZero(){
      this.type = 0;
      this.title = "欢迎登录学生系统";
      this.form.username = "";
      this.form.password = "";
      this.form.newpassword = "";
    },

    

    // 提交登录信息
    submitForm(formName) {
      
      // 通过vuex提交登录的用户名
      // this.$store.commit('setUserName', this.form.username);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("通过了")
          this.loading = true;
          // 调用登录接口
          login(
            this.form.username,
            this.form.password,
            this.form.newpassword,
            this.type
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
          // console.log("没通过")
          this.$message({
                showClose: true,
                message: "用户名或密码错误!",
                type: "error",
              });
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
.login-box {
  width: 400px;
  margin: 200px auto;
  padding: 50px;
  border: 1px solid #dcdfe6;
  border-radius: 15px;
  box-shadow: 0 0 50px 0 rgba(146, 146, 146, 0.63);
  background-color: #fff;
}




</style>

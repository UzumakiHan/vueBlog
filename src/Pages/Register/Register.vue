<template>
  <div class="login">
     <div class="container col-lg-8" id="wrap">
      <div class="row">
        <div class="col-lg-6 d-none d-sm-none d-md-none d-lg-block" id="left">
          <p class="text-center mt-5">
            <img src="../.././assets/image/left.jpg" alt class="img-responsive center-block" />
          </p>
        </div>
        <div class="col-lg-6 mt-4" id="right">
          <b-card style="border:none">
            <h4 class="text-center">VueBlogRegister</h4>
            <b-form-group
              id="input-group-1"
              label="username:"
              label-for="input-1"
              description="We'll never share your information with anyone else."
            >
              <b-form-input id="input-1" type="text" required placeholder="username" v-model="username"></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-2"
              label="password:"
              label-for="input-2"
              description="We'll never share your password with anyone else."
            >
              <b-form-input id="input-2" type="password" required placeholder="password" v-model="password"></b-form-input>
            </b-form-group>
            <!-- <b-button variant="outline-primary" style="width:300px; text-align:text-center" >Button</b-button> -->
             <b-button block variant="primary" class="mt-4 mb-2" @click="login">register</b-button>
             <span id="register" > <b-link @click=" returnLogin">返回登录></b-link> </span>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { toRegister } from "../../api/con";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    
  },
  methods: {
    returnLogin() {
      this.$router.push("./login");
    },
    async register() {
      if (this.username !== "" && this.password !== "") {
        const result = await toRegister(this.username, this.password);
        // console.log(result);
        if (result.data.err_code === 0) {
            this.$message.error('用户名已经被注册，请重新输入');
          this.username = "";
          this.password = "";
        } else {
          this.$message({
            message: "注册成功",
            type: "success"
          });
          this.username = "";
          this.password = "";
        }
      }else{
           this.$message({
            message: "用户名和密码不能为空",
            type: "warning"
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../.././assets/less/login.less";
</style>
<template>
  <div class="change mt-5">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-lg-8">
          <el-steps :active="active" finish-status="success" style="margin-bottom:40px;">
            <el-step title="原来密码"></el-step>
            <el-step title="确认修改"></el-step>
          </el-steps>
          <!-- 个人信息 -->
          <div class="info mt-5" v-if="active==1">
            <b-form-input
              v-model="password"
              placeholder="请输入原来的密码"
              type="password"
              style="width:92%"
            ></b-form-input>
          </div>
          <div class="info" v-if="active==2">
            <b-form-input
              v-model="changepassword"
              placeholder="请输入修改的密码"
              type="password"
              style="width:92%"
            ></b-form-input>
          </div>
          <el-button style="margin-top: 20px;" @click="next" v-if="active!=2">下一步</el-button>
          <el-button style="margin-top: 20px;" v-if="active==2" @click="surechange()">确认修改</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
import md5 from "md5";
import { mapState } from "vuex";
import { changePassword } from "../../api/con";
export default {
  data() {
    return {
      active: 1,
      password: "",
      changepassword: "",
      username: ""
    };
  },
  mounted() {
    this.username = localStorage.getItem("username");
    this.$store.dispatch("getinfo", this.username);
  },
  computed: {
    ...mapState(["owninfo"])
  },

  methods: {
    next() {
      // if (this.active++ > 2) this.active = 0;

      if (this.active == 1) {
        if (
          md5(this.password) === this.owninfo.password &&
          this.password != ""
        ) {
          this.active = 2;
        } else {
          this.$message.error("密码不正确，请重新输入");
        }
      }
    },
    async surechange() {
      if (this.changepassword === "") {
        this.$message({
          message: "密码不能为空",
          type: "warning"
        });
      } else {
        const result = await changePassword(
          this.owninfo.id,
          this.changepassword
        );
        console.log(result);
        if (result.data.success_code === 200) {
          this.$message({
            message: "修改成功成功,请重新登录",
            type: "success"
          });
          setTimeout(() => {
              localStorage.removeItem('username')
            this.$router.push("/login");
          }, 1000);
        }
      }
    },
  }
};
</script>
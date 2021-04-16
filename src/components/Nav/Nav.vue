<template>
    <div class="navtop">
  <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top"  >
    <div class="container">
        <b-navbar-brand href="#">VueBlog</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#"><i class="el-icon-s-home"></i> <span class="text-white" @click="gohome()">首页</span></b-nav-item>
        <b-nav-item href="#"><i class="el-icon-info"></i> <span class="text-white" @click="about()">关于我们</span></b-nav-item>
        <b-nav-item href="#"><i class="el-icon-edit-outline"></i><span class="text-white " @click="towrite()" >写博客</span> </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="searchcontent"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit" @click.prevent="search">搜索</b-button>
        </b-nav-form>

        <b-nav-item-dropdown right v-show="name">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
             <em class="text-white">{{name}}</em>
            
          </template>
          <b-dropdown-item> <router-link to="/setting" style="text-decoration: none" class="text-dark "><i class="el-icon-user-solid"></i>个人中心</router-link> </b-dropdown-item>
          <b-dropdown-item> <router-link to="/owner" style="text-decoration: none" class="text-dark"><i class="el-icon-star-on"></i> 我的博客</router-link> </b-dropdown-item>
          <b-dropdown-item> <router-link to="/changepassword" style="text-decoration: none" class="text-dark" v-show="name"><i class="el-icon-edit"></i> 修改密码</router-link> </b-dropdown-item>
          <b-dropdown-item  @click="exit()"><i class="el-icon-switch-button"></i> 退出登录</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-navbar-nav>
          <b-nav-item ><span class="text-white" v-show="!name" @click="login()">Login</span></b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-collapse>
    </div>
  </b-navbar>
</div>
</template>
<script>
 import { mapState } from "vuex";
export default {
    data(){
        return{
           searchcontent:"",
            name:"",
            content:[]

          
        }
    },
    mounted(){
      this.name = localStorage.getItem('username');
      this.$store.dispatch("getallcontent");
      // console.log(this.name);
    },
    computed:{
      //  ...mapState(["searchcontent"]),
    },
  
   methods:{
      gohome(){
      this.$router.push('/')
    },
    exit(){
      localStorage.removeItem('username');
      //  this.$router.push('/');
      this.$router.go(0);

    },
    login(){
      this.$router.push('/login')
    },
    towrite(){
      if(this.name === null){
        this.$message({
            message: "请先登录",
            type: "warning"
          });
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
      }else{
        this.$router.push('/write')
      }
    },
    about(){
      this.$router.push('/aboutus')
    },
    search(){
      var  search = this.searchcontent;
      // console.log(search);
      if(search){
        this.$store.state.searchData = this.$store.state.allcontent.filter(val=>{
          // console.log(val)
          return Object.keys(val).some(key=>{
            // console.log(key)
            return (
              String(val[key])
                // toLowerCase() 方法用于把字符串转换为小写。
                .toLowerCase()
                // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
                .indexOf(search) > -1
            );
          })
        })
      }
      this.content = localStorage.setItem('content',JSON.stringify(this.$store.state.searchData))
       this.$router.push({
        name: "Search",
        query: {
          content: this.content
        }
      });
      this.$router.go(0)
    }
   }
}
</script>
<style scoped>
.navtop{
  margin-bottom: 80px;
}
</style>
<template>
  <div class="container mt-5">
    <div class="row justify-content-md-center">
      <div class="col-lg-8">
        <div class="content">
          <b-card>
            <span>个人资料 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <b-link
              style="text-decoration: none;"
              v-b-modal.modal-2
            >修改头像&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b-link>
            <b-link style="text-decoration: none;" v-b-modal.modal-1>修改个人资料</b-link>
            <hr />

            <b-media>
              <div class="row">
                  <div class="col-lg-1 clo-md-2  mr-4 mb-3">
                     <b-img :src="defaultimage" width="60" alt="placeholder" rounded="circle" v-if="owninfo.image==null"></b-img>
                <b-img :src="owninfo.image" width="60" alt="placeholder" rounded="circle" v-if="owninfo.image" ></b-img>
                  </div>
                  <div class="col-lg-8 clo-md-8"> <p>昵称：{{username}}</p>
              <p>实名：{{owninfo.realname}}</p>
              <p>性别：{{owninfo.sex}}</p>
              <p>地区：{{owninfo.location}}</p>
              <p>生日：{{owninfo.birthday}}</p>
              <p>行业：{{owninfo.job}}</p>
              <p>个人简介：{{owninfo.information}}</p></div>
                
                </div>
            </b-media>
          </b-card>
          <b-modal id="modal-1" title="修改资料" @ok="ok">
            昵称:
            <b-input v-model="username" disabled></b-input>实名：
            <b-input v-model="owninfo.realname"></b-input>性别：
            <b-input v-model="owninfo.sex"></b-input>地区：
            <b-input v-model="owninfo.location"></b-input>行业：
            <b-input v-model="owninfo.job"></b-input>生日：
            <b-input v-model="owninfo.birthday"></b-input>个人简介：
            <b-form-textarea
              id="textarea"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
              v-model="owninfo.information"
            ></b-form-textarea>
          </b-modal>
          <b-modal id="modal-2" title="修改头像" hide-footer>
           <b-img :src="defaultimage" width="60" alt="placeholder" rounded="circle" v-if="owninfo.image==null"></b-img>
            <b-img :src="owninfo.image" width="60" alt="placeholder" rounded="circle" v-if="owninfo.image"></b-img>
            <form action="/submitImage" method="post" enctype="multipart/form-data">
              <input type="file" name="pic" class="mt-4" />
              <br />
              <input type="text" name="username" v-model=" username" style="display:none"  />
              <br />

              <br />
              <b-button type="submit">修改</b-button>
              <!-- <button type="submit" class="btn btn-default">提交</button> -->
            </form>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import { modifyingData } from "../../api/con";
export default {
  data() {
    return {
      username: "",
       defaultimage:'http://42.194.193.249:6600/upload/vMWrHwDnN_Iln67tDmG7Hylx.jpg'
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
    async ok() {
      const result = await modifyingData(
        this.username,
        this.owninfo.birthday,
        this.owninfo.location,
        this.owninfo.information,
        this.owninfo.realname,
        this.owninfo.job,
        this.owninfo.sex
      );
      if(result.data.success_code === 200){
         this.$message({
            message: "修改成功",
            type: "success"
          });
      }else{
         this.$message.error('修改失败');
      }
      // console.log(result);
      // console.log(this.username)
    },
  }
};
</script>



<style scoped>
</style>
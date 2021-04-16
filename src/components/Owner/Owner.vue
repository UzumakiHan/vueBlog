<template>
  <div id="owner">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-4 d-none d-sm-none d-md-none d-lg-block">
          <b-list-group>
            <b-list-group-item>
              <p class="text-center">
                <img
                  :src="owninfo.image"
                  alt="..."
                  class="img-responsive"
                  width="64"
                  style="border-radius:50%;"
                  v-if="owninfo.image"
                />
                <img
                  :src="defaultimage"
                  alt="..."
                  class="img-responsive"
                  width="64"
                  style="border-radius:50%;"
                  v-else
                />
              </p>
              <p style="text-align:center;margin-bottom:0px;" v-if="name">{{name}}</p>
              <p style="text-align:center;margin-bottom:0px;" v-if="name==null">defaultname</p>
            </b-list-group-item>
            <b-list-group-item style="text-align:center">
              <div class="row">
                <div class="col-md-4">
                  <p>原创</p>
                  <span>{{original}}</span>
                </div>
                <div class="col-md-4">
                  <p>转载</p>
                  <span>{{reprint}}</span>
                </div>
                <div class="col-md-4">
                  <p>博客</p>
                  <span>{{owncontent.length}}</span>
                </div>
              </div>
            </b-list-group-item>
          </b-list-group>
          <b-card class="mt-2">
            <b-card-text>文章分类</b-card-text>
            <div>
              <ul class="list-unstyled">
                <b-media tag="li">
                  <template v-slot:aside>
                    <img
                      src="../.././assets/image/html.jpg"
                      alt="..."
                      class="img-responsive"
                     style="width:60px;height:60px;"
                    />
                  </template>
                  <h5 class="mt-3 mb-1">
                    <a href style="color: #212529">Html&nbsp; &nbsp;{{htmllabel}}</a>
                  </h5>
                </b-media>

                <b-media tag="li" class="my-3">
                  <template v-slot:aside>
                    <img
                      src="../.././assets/image/vue.jpg"
                      alt="..."
                      class="img-responsive"
                     style="width:60px;height:60px;"
                    />
                  </template>

                  <h5 class="mt-3 mb-1">
                    <a href style="color: #212529">Vue&nbsp;&nbsp;{{vuelabel}}</a>
                  </h5>
                </b-media>

                <b-media tag="li">
                  <template v-slot:aside>
                    <img
                      src="../.././assets/image/css.jpg"
                      alt="..."
                      class="img-responsive"
                     style="width:60px;height:60px;"
                    />
                  </template>

                  <h5 class="mt-2 mb-1">
                    <a href style="color: #212529">CSS&nbsp;&nbsp;{{csslabel}}</a>
                  </h5>
                </b-media>

                <b-media tag="li" class="mt-3">
                  <template v-slot:aside>
                    <img
                      src="../.././assets/image/node.jpg"
                      alt="..."
                      class="img-responsive"
                     style="width:60px;height:60px;"
                    />
                  </template>

                  <h5 class="mt-2 mb-1">
                    <a href style="color: #212529">Node&nbsp;&nbsp;{{nodelabel}}</a>
                  </h5>
                </b-media>

                <b-media tag="li" class="mt-3">
                  <template v-slot:aside>
                    <img
                      src="../.././assets/image/js.jpg"
                      alt="..."
                      class="img-responsive"
                     style="width:60px;height:60px;"
                    />
                  </template>

                  <h5 class="mt-3 mb-1">
                    <a href style="color: #212529">JavaScript&nbsp;{{jslabel}}</a>
                  </h5>
                </b-media>
              </ul>
            </div>
          </b-card>
        </div>

        <div class="col-lg-8 col-md-8" v-if="owncontent.length === 0 ">
          <b-jumbotron>
            <template v-slot:header>My VueBlog</template>

            <template v-slot:lead>
              <h5
                class="mt-5 mb-5"
                style="line-height:2"
              >欢迎来到个人博客中心主页面，通过写博客的形式，你可以记录你的学习过程，也可以和别人分享你的学习过程，来开启你的博客之旅吧~~</h5>
            </template>

            <hr class="my-4" />

            <h5 class="mb-5">点击下方按钮，开启博客之旅吧~~~</h5>

            <b-button variant="primary" href="#" @click="write">Write A Blog</b-button>
          </b-jumbotron>
        </div>

        <div class="col-lg-9 col-md-8" v-if="owncontent && owncontent.length > 0">
          <div
            v-if="owncontent.length>0"
            style="margin-bottom:10px;"
            v-for="(item,index) in owncontent.slice((currentPage- 
          1)*pagesize,currentPage*pagesize)"
            :key="index"
            id="my-table"
            :per-page="perPage"
            :current-page="currentPage"
            small
          >
            <b-card>
              <h4>
                <!-- <b-badge>{{item.created}}</b-badge> -->
                <el-tag type="danger" class="goarticle">{{item.mold}}</el-tag>
                <span class="goarticle" @click="goarticle(item.id)">{{item.title}}</span>
              </h4>
              <b-card-text class="mt-2">
                <b-link
                  class="card-link text-muted mt-2"
                  id="card-link"
                  @click="goarticle(item.id)"
                >阅读全文</b-link>
                <b-link class="card-link text-muted">{{item.currentime}}</b-link>
              </b-card-text>
              <b-link class="card-link text-muted" @click="edit(item.id)">
                <i class="el-icon-edit"></i> 编辑
              </b-link>
              <b-link
                class="card-link text-muted"
                id="delete"
                @click="del(item.id)"
                v-b-modal.modal-3
              >
                <i class="el-icon-delete"></i> 删除
              </b-link>
            </b-card>
          </div>
          <el-pagination
            v-if="owncontent.length>0"
            layout="prev, pager, next"
            :page-size="pagesize"
            @current-change="current_change"
            :current-page.sync="currentPage"
            :page-count="(owncontent.length)/pagesize"
            :total="owncontent.length"
            v-show="owncontent && owncontent.length > 0"
          ></el-pagination>
          <b-modal id="modal-3" title="提示" @ok="sure(delid)">
            <p class="my-4">确定删除吗</p>
          </b-modal>
        </div>

        <!-- <div class="col-lg-9 col-md-8" v-else >
          <div
            v-if="$store.state.searchData.length>0"
            style="margin-bottom:10px;"
            v-for="(item,index) in $store.state.searchData.slice((currentPage- 
          1)*pagesize,currentPage*pagesize)"
            :key="index"
            id="my-table"
            :per-page="perPage"
            :current-page="currentPage"
            small
          >
            <b-card>
              <h4>
               
                <el-tag type="danger" class="goarticle">{{item.mold}}</el-tag>
                <span class="goarticle" @click="goarticle(item.id)">{{item.title}}</span>
              </h4>
              <b-card-text class="mt-2">
                <b-link
                  class="card-link text-muted mt-2"
                  id="card-link"
                  @click="goarticle(item.id)"
                >阅读全文</b-link>
                <b-link class="card-link text-muted">{{item.currentime}}</b-link>
              </b-card-text>
              <b-link class="card-link text-muted" @click="edit(item.id)">
                <i class="el-icon-edit"></i> 编辑
              </b-link>
              <b-link
                class="card-link text-muted"
                id="delete"
                @click="del(item.id)"
                v-b-modal.modal-3
              >
                <i class="el-icon-delete"></i> 删除
              </b-link>
            </b-card>
          </div>
          <el-pagination
            v-if="$store.state.searchData.length>0"
            layout="prev, pager, next"
            :page-size="pagesize"
            @current-change="current_change"
            :current-page.sync="currentPage"
            :page-count="($store.state.searchData.length)/pagesize"
            :total="$store.state.searchData.length"
            v-show="$store.state.searchData && $store.state.searchData.length > 0"
          ></el-pagination>
          <b-modal id="modal-3" title="提示" @ok="sure(delid)">
            <p class="my-4">确定删除吗</p>
          </b-modal>
        </div> -->

      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { delArticle } from "../../api/con";
export default {
  name: "Home",
  data() {
    return {
      reprint: 0,
      original: 0,
      htmllabel: 0,
      jslabel: 0,
      nodelabel: 0,
      csslabel: 0,
      vuelabel: 0,
      delid: "",
      all: "",
      name: "",
      defaultimage: "http://localhost:4000/upload/vMWrHwDnN_Iln67tDmG7Hylx.jpg",
      mainProps: {
        blank: true,
        blankColor: "#777",
        width: 60,
        height: 60,
        class: "m1"
      },
      pagesize: 4,
      perPage: 2,
      currentPage: 1
    };
  },

  mounted() {
    // this.$store.dispatch("getallcontent");
    this.name = localStorage.getItem("username");
    this.$store.dispatch("getowncontent", this.name);
    this.$store.dispatch("getinfo", this.name);

    this.articleOriginal();

    this.articleReprint();
    this.articleHtml();

    this.articleJs();

    this.articleNode();

    this.articleVue();

    this.articleCss();
  },
  computed: {
    rows() {
      return this.items.length;
      // console.log(111);
    },
    ...mapState(["owncontent"]),
    ...mapState(["owncontentinfo"]),
    ...mapState(["owninfo"])
  },
  methods: {
    current_change(currentPage) {
      //改变当前页
      this.currentPage = currentPage;
    },
    goarticle(id) {
      // console.log(id);
      this.$router.push({
        name: "Show",
        query: {
          id: id
        }
      });
    },
    async sure(id) {
      // console.log(id);
      const result = await delArticle(id);
      console.log(result);
      if (result.data.success_code === 200) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
      } else {
        this.$message.error("删除失败");
      }
    },
    del(id) {
      this.delid = id;
      // console.log(this.delid);
    },
    edit(id) {
      // console.log(id);
      this.$router.push({
        name: "Edit",
        query: {
          id: id
        }
      });
    },
    articleOriginal() {
      for (var i = 0; i < this.owncontent.length; i++) {
        if (this.owncontent[i].mold === "原创") {
          this.original += 1;
        }
      }
      return this.original;
    },
    articleReprint() {
      for (var i = 0; i < this.owncontent.length; i++) {
        if (this.owncontent[i].mold === "转载") {
          this.reprint += 1;
        }
      }
      return this.reprint;
    },
    articleHtml() {
      for (var i = 0; i < this.owncontent.length; i++) {
        if (this.owncontent[i].label === "Html") {
          this.htmllabel += 1;
        }
      }
      return this.htmllabel;
    },
    articleJs() {
      for (var i = 0; i < this.owncontent.length; i++) {
        if (this.owncontent[i].label === "JavaScript") {
          this.jslabel += 1;
        }
      }
      return this.jslabel;
    },
    articleNode() {
      for (var i = 0; i < this.owncontent.length; i++) {
        if (this.owncontent[i].label === "Node") {
          this.nodelabel += 1;
        }
      }
      return this.nodelabel;
    },
    articleVue() {
      for (var i = 0; i < this.owncontent.length; i++) {
        if (this.owncontent[i].label === "Vue") {
          this.vuelabel += 1;
        }
      }
      return this.vuelabel;
    },
    articleCss() {
      for (var i = 0; i < this.owncontent.length; i++) {
        if (this.owncontent[i].label === "CSS") {
          this.csslabel += 1;
        }
      }
      return this.csslabel;
    },
    write() {
      if (this.name === null) {
        this.$message({
          message: "请登录",
          type: "warning"
        });
      } else {
        this.$router.push("/write");
      }
    }
  }
};
</script>
<style scoped>
#owner {
  margin-top: 20px;
}
#atext {
  text-decoration: none;
}
a {
  text-decoration: none;
}

/* .goarticle:hover{
  cursor: pointer;
} */
.goarticle:hover {
  cursor: pointer;
  color: orangered;
}
#delete:hover {
  color: cornflowerblue;
}
</style>
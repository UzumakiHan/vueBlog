<template>
  <div class="show">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-4 d-none d-sm-none d-md-none d-lg-block">
          <b-list-group>
            <!-- <img src=" alt=""> -->
            <b-list-group-item>
              <p class="text-center">
                <img
                  :src="owninfo.image"
                  alt="..."
                  class="img-responsive"
                  style="width:60px;height:60px;border-radius:50%;"
                  v-if="owninfo.image"
                />
                <img
                  :src="defaultimage"
                  alt="..."
                  class="img-responsive"
                  style="width:60px;height:60px;border-radius:50%;"
                  v-else
                />
              </p>
              <p style="text-align:center;margin-bottom:0px;">{{name}}</p>
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
          <b-card id="type" class="mt-2">
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
        <div class="col-lg-9 col-md-8">
          <div id="content">
            <div>
              <b-card>
                <h5>
                  <el-tag type="danger" class="goarticle">{{mold}}</el-tag>
                  <span class="goarticle">{{title}}</span>
                </h5>
                <b-card-text id="cardtext">
                  <span>{{currentime}}</span>
                  <span class="ml-2" style="color:#78a5f1">{{author}}</span>
                  <span class="ml-2">
                    <i class="el-icon-view" style="font-size:18px"></i>
                    <span>{{readcount}}</span>
                  </span>
                  <span style="color:#4d4d4d; font-size:14px;" class="ml-2">文章标签:</span>
                  <b-button pill variant="outline-secondary" size="sm" class="ml-2">{{label}}</b-button>
                </b-card-text>
                <b-card-text style="color:#4d4d4d; font-size:14px;">版权声明：本文为博主{{mold}}文章</b-card-text>
              </b-card>
              <hr />
              <div class="content-show">
                <div class="ql-container ql-snow">
                  <div class="ql-editor">
                    <code v-html="content"></code>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-md-center mt-4">
            <div class="col-lg-12">
              <div class="comment">
                <b-alert show>评论区</b-alert>
                <b-form-textarea
                  id="textarea"
                  v-model="obj.pulishcontent"
                  placeholder="发表评论......."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
                <div id="comment" class="mt-3 mb-3">
                  <div @click="faceContent">
                    <i class="el-icon-chat-dot-round mr-2" style="font-size:30px" id="facetouch"></i>
                  </div>
                  <div>
                    <b-button variant="outline-primary" @click="commit">评论</b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-md-center mt-3">
            <div class="col-lg-12">
              <div class="row">
                <div class="col-lg-6 commet-content mb-3 order-2 order-lg-1" v-if="list.length">
                  <p v-for="(item,index) in commitinfo" :key="index">
                    <b-img :src="item.blogimg" width="25" alt="placeholder" rounded="circle"></b-img>
                    <span class="clickto ml-2" @click="clickto(item.bloguser)">{{item.bloguser}}:</span>
                    <span id="commit" class="ml-3">{{item.blogcomment}}</span>
                  </p>
                </div>
                <div class="col-lg-6 face mb-5 order-1 order-lg-1" v-show="faceShow">
                  <ul>
                    <li
                      v-for="(item,index) in faceList"
                      :key="index"
                      @click="getBrow(index)"
                    >{{item}}</li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="check">
                  <p class="text-muted" @click="checkmore" v-if="list.length>3">
                    查看更多评论
                    <i class="el-icon-caret-bottom"></i>
                  </p>
                  <p class="text-muted" v-if="list.length===0">
                    暂无评论
                    <i class="el-icon-more"></i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { findId, commitTo } from "../../api/con";
import { mapState } from "vuex";
const appData = require("@/assets/emojis.json");
export default {
  name: "Show",
  data() {
    return {
      reprint: 0,
      original: 0,
      htmllabel: 0,
      jslabel: 0,
      nodelabel: 0,
      csslabel: 0,
      vuelabel: 0,
      name: "",
      content: "",
      label: "",
      mold: "",
      title: "",
      currentime: "",
      author: "",
      id: "",
      readcount: "",
      faceList: [],
      faceShow: false,
      list: [],
      obj: { pulisher: "", pulishcontent: "", img: "" },
      getBrowString: "",
      defaultimage: "http://localhost:4000/upload/vMWrHwDnN_Iln67tDmG7Hylx.jpg",
      mainProps: {
        blank: true,
        blankColor: "#777",
        width: 60,
        height: 60,
        class: "m1"
      },
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"], // 清除文本格式
            ["link", "image", "video"] // 链接、图片、视频
          ] //工具菜单栏配置
        },
        placeholder: "请在这里添加产品描述", //提示
        readyOnly: false, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true, //语法检测
        text: ""
      }
    };
  },

  created() {
    this.getId();
    this.name = localStorage.getItem("username");
    this.$store.dispatch("getinfo", this.name);
    this.$store.dispatch("committo", this.id);
    this.articleOriginal();
    this.articleReprint();
    this.articleHtml();

    this.articleJs();

    this.articleNode();

    this.articleVue();

    this.articleCss();
  },
  mounted() {
    var list = JSON.parse(localStorage.getItem(`${this.id}`));
    if (list) {
      this.list = list;
    }
  },
  computed: {
    ...mapState(["owninfo"]),
    ...mapState(["owncontent"]),
    ...mapState(["commitinfo"])
  },
  methods: {
    async getId() {
      this.id = this.$route.query.id;
      // console.log("id", this.id);
      const result = await findId(this.id);
      // console.log(result.data.message[0]);
      this.label = result.data.message[0].label;
      this.currentime = result.data.message[0].currentime;
      this.mold = result.data.message[0].mold;
      this.title = result.data.message[0].title;
      this.author = result.data.message[0].author;
      this.readcount = result.data.message[0].readcount;
      //   this.content = result.data.message[0].content.data;
      // console.log(this.label,this.currentime,this.mold,this.title);
      const resdata = new Buffer(result.data.message[0].content);
      this.content = resdata.toString();
      // console.log(this.content);
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
    //获取所有表情
    faceContent() {
      this.faceShow = !this.faceShow;
      if (this.faceShow == true) {
        for (let i in appData) {
          this.faceList.push(appData[i].char);
        }
      } else {
        this.faceList = [];
      }
    },
    //表情评论
    getBrow(index) {
      for (let i in this.faceList) {
        if (index == i) {
          this.getBrowString = this.faceList[index];
          this.obj.pulishcontent += this.getBrowString;
        }
      }
    },
    //评论
    async commit() {
      if (this.name === null) {
        this.$message.error("请先登录");
      } else {
        if (this.obj.pulishcontent === "") {
          this.$message({
            message: "评论不能为空",
            type: "warning"
          });
        } else {
          this.$message({
            message: "评论成功",
            type: "success"
          });

          this.faceShow = false;
          this.obj.pulisher = this.name;
          this.obj.img = this.owninfo.image;
          this.list.push(this.obj);
          console.log(
            this.obj.img,
            this.obj.pulisher,
            this.id,
            this.obj.pulishcontent
          );
          const results = await commitTo(
            this.obj.img,
            this.obj.pulisher,
            this.id,
            this.obj.pulishcontent
          );
          console.log(results);
          this.obj = { pulishcontent: "" };
          this.$router.go(0);
          localStorage.setItem(`${this.id}`, JSON.stringify(this.list));
        }
      }
    },
    //@某人
    clickto(pulisher) {
      if (pulisher === this.name) {
        this.obj.pulishcontent = "";
      } else {
        this.obj.pulishcontent = `@${pulisher}:`;
      }
    },
    //查看更多
    checkmore() {
      let comment = document.querySelector(".commet-content");
      let check = document.querySelector(".check");
      check.style.display = "none";
      comment.style.overflow = "visible";
    }
  }
};
</script>
<style scoped>
.show {
  margin-top: 30px;
}
#atext {
  text-decoration: none;
}
a {
  text-decoration: none;
}
#content {
  width: 100%;
  /* height: 520px; */
  border: 1px solid rgba(0, 0, 0, 0.125);
}
#cardtext {
  margin-bottom: 0.3em;
}
.card {
  border: none;
}
hr {
  margin-top: 0px;
  margin-bottom: 0px;
}
code {
  color: #4d4d4d;
  font-size: 100%;
  font-family: Arial, Helvetica, sans-serif;
}
#type {
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
.ql-container.ql-snow {
  border: none;
}
#facetouch:hover,
.face ul li:hover {
  cursor: pointer;
}
#comment {
  display: flex;
  justify-content: space-between;
}
.face {
  height: 200px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  overflow: scroll;
  z-index: 9999;
}
.face ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}
.face ul li {
  width: 10%;
  font-size: 20px;
  text-align: center;
}
#commit {
  padding: 5px;
  background: #4aca6d;
  border-radius: 5px;
}
.clickto:hover,
.check:hover {
  cursor: pointer;
}
.commet-content {
  height: 120px;
  overflow: hidden;
}
.check {
  margin: 0 auto;
}
.clickto {
  font-size: 16px;
  font-weight: bold;
}
</style>
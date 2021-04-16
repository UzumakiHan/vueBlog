<template>
  <div class="write">
    <b-container>
      <b-row class="justify-content-md-center">
        <div class="col-lg-8 col-sm-8">
          <b-form-input placeholder="输入文章标题" v-model="title"></b-form-input>
        </div>
        <div class="col-lg-2 col-sm-2">
          <b-button v-b-modal.modal-1 v-show="!editbtn">发布文章</b-button>
          <b-button v-b-modal.modal-2 v-show="editbtn">修改文章</b-button>
        </div>
      </b-row>

      <b-row class="mt-3 justify-content-md-center">
        <div class="col-lg-10">
          <quill-editor
            class="editor"
            ref="myTextEditor"
            v-model="content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
        </div>
      </b-row>

      <b-modal id="modal-1" title="发布文章" @ok="release()">
        <span>文章标签</span>
        <b-input placeholder="输入文章标签" v-model="label"></b-input>
        <span class="mt-3">文章类型</span>
        <b-input placeholder="转载或原创" v-model="mold"></b-input>
      </b-modal>
    </b-container>
    <b-modal id="modal-2" title="修改文章" @ok="edit()">
        <span>文章标签</span>
        <b-input placeholder="输入文章标签" v-model="label"></b-input>
        <span class="mt-3">文章类型</span>
        <b-input placeholder="转载或原创" v-model="mold"></b-input>
      </b-modal>
   
    <!-- <div class="ql-container ql-snow">
      <div class="ql-editor"><code v-html="this.$store.state.contentext"></code></div>
    </div>-->
  </div>
</template>

 <script>
 
import moment from 'moment';
import 'moment/locale/zh-cn'
moment.locale('zh-cn');
import { mapState } from "vuex";
import { toRelease ,findId,editArticle} from "../../api/con";
export default {
  data() {
    return {
      image:"",
      author:"",
      title: "", //文章标题
      label: "", //文章标签
      mold: "", //文章类型
      currentime:"",//发布时间
      content: "", //文章内容
       editbtn:false,
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
        placeholder: "请输入", //提示
        readyOnly: false, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true, //语法检测
        text: "",
      }
    };
  },
   mounted() {
     this.author = localStorage.getItem('username');
     this.$store.dispatch('getinfo',this.author);
    //  this.image = this.owninfo.image;
    //  console.log(this.image)
  },
   computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    },
     ...mapState(["owninfo"])
  },
  methods: {
    // ...mapActions['submitData'],
    // 失去焦点
    onEditorBlur(editor) {},
    // 获得焦点
    onEditorFocus(editor) {},
    // 开始
    onEditorReady(editor) {},
    // 值发生变化
    onEditorChange(editor) {
      this.content = editor.html;
      this.text = editor.text;
      // console.log(this.content);
      // console.log(this.text);
    },

    async release() {
      this.currentime = moment().format('YYYY-MM-DD HH:mm:ss');
      console.log(this.currentime);
      if(this.title!="" && this.content!="" && this.label !="" && this.mold != ""){
        const result = await toRelease( this.title, this.content,this.label,this.mold,this.currentime,this.author,this.owninfo.image);
        if(result.data.success_code === 200){
            this.$message({
            message: "发布成功",
            type: "success"
          });
          this.title = "";
          this.content = "";
          this.$router.push('/owner')
       }else{
            this.$message.error('发布失败');
       } 
      }else{
        this.$message({
            message: "信息不能为空",
            type: "warning"
          });
      }

     
    },
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.editor {
  line-height: normal !important;
  height: 500px;
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
.write {
  margin-top: 15px;
}
</style>

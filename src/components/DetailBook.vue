<template>
  <div>
    <div id="book"></div>
  </div>
</template>

<script>
// 引入组件
import JsZip from "jszip";
import Epub from "epubjs";
import Vue from "vue";
import api from "../assets/js/api";

// 使用组件
Vue.use(Epub);
Vue.prototype.api = api;

export default {
  data() {
    return {
      bookPath: this.$route.params.bookPath,
      reactUrl: api.sBaseApi + "/"
    };
  },
  methods: {
    initBook() {
      // 对数据库中存储的路径进行切割，切割成映射到服务器上的地址
      var splitBookPath = this.bookPath.split("\\");
      var newBookPath = splitBookPath[1] + "/" + splitBookPath[2];
      //   console.log(newBookPath);
      // 拼接路径
      var regionPath = this.reactUrl + newBookPath;
      //   console.log(regionPath);
      var bookItem = new Epub("http://localhost:8085/novel/MANUAL.epub");
      var rendition = bookItem.renderTo("book", {
        width: window.innerWidth,
        height: window.innerHeight,
        method: "default",
        allowScriptedContent: true
      });
      console.log(rendition);
      console.log(rendition.book.path);
      // 渲染书籍到HTML
      rendition.display();
    }
  },
  mounted() {
    this.initBook();
  }
};
</script>

<style>
#book {
  color: black;
}
</style>

<template>
  <div>
    <!-- 书籍列表 -->
    <div class="bookListBox">
      <mu-grid-list class="gridlist-demo">
        <mu-sub-header>藏书</mu-sub-header>
        <mu-grid-tile
          v-for="(tile, index) in bookList"
          :key="index"
          @click="toBookDetail(tile.bookPath)"
        >
          <img src="../assets/logo.png" />
          <span slot="title">{{ tile.bookName }}</span>
        </mu-grid-tile>
      </mu-grid-list>
    </div>
    <!-- 底部导航栏 -->
    <Nav />
  </div>
</template>

<script>
// 引入组件
import Nav from "./Nav.vue";
import { GridList, SubHeader } from "muse-ui";
import Vue from "vue";
import httpUtil from "../assets/js/http_util";
import api from "../assets/js/api";
import commonMethod from "../assets/js/common";

// 使用组件
Vue.use(GridList);
Vue.use(SubHeader);
Vue.prototype.httpUtil = httpUtil;
Vue.prototype.api = api;
Vue.prototype.commonMethod = commonMethod;

export default {
  components: {
    Nav
  },
  data() {
    return {
      bookList: []
    };
  },
  methods: {
    // 获取当前用户的书籍列表
    getNovelList() {
      let that = this;
      // 获取当前的用户id
      var userId = window.sessionStorage.getItem("userId");
      // 封装待传递的参数
      var bodyMap = new URLSearchParams();
      bodyMap.append("userId", userId);
      // 发起post请求
      var resutl = httpUtil.post(api.apiGetBookList, bodyMap);
      resutl.then(function(res) {
        var data = res.data;
        console.log(data)
        if (data.code == 0) {
          that.bookList = data.data;
        }
      });
    },
    // 点击跳转到书籍阅读页
    toBookDetail(bookPath) {
      const paramsMap = {
        bookPath: bookPath
      }
      commonMethod.openWindow(this.$router, 'BookDetail', paramsMap)
    }
  },
  created() {
    this.getNovelList();
  }
};
</script>

<style>
.bookListBox {
  width: 92%;
  margin: 0 auto;
}
.gridlist-demo {
  overflow-y: auto;
}
</style>

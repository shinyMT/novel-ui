<template>
  <!-- 底部导航栏 -->
  <mu-bottom-nav :value="navValue" @change="onChange">
    <mu-bottom-nav-item
      value="main"
      title="主页"
      icon=":iconfont icon-sousuo"
      :to="mainObj"
    >
    </mu-bottom-nav-item>
    <mu-bottom-nav-item
      value="books"
      title="书库"
      icon=":iconfont icon-shuku"
      :to="booksObj"
    >
    </mu-bottom-nav-item>
    <mu-bottom-nav-item
      value="mine"
      title="我的"
      icon=":iconfont icon-user"
      :to="mineObj"
    >
    </mu-bottom-nav-item>
  </mu-bottom-nav>
</template>

<script>
// 引入组件
import Vue from "vue";
import { BottomNav } from "muse-ui";

// 使用组件
Vue.use(BottomNav);
export default {
  data() {
    // 默认显示的路径
    const defaultPath = this.$route.path;
    // 默认路径的value
    const defaultValue = defaultPath.slice(1);
    return {
      navValue: defaultValue,
      mainObj: {
        name: "Main"
        // params: {
        //   username: this.$route.params.username,
        //   userId: this.$route.params.userId
        // }
      },
      booksObj: {
        name: "Books"
        // params: {
        //   username: this.$route.params.username,
        //   userId: this.$route.params.userId
        // }
      },
      mineObj: {
        name: "Mine"
        // params: {
        //   username: this.$route.params.username,
        //   userId: this.$route.params.userId
        // }
      }
    };
  },
  methods: {
    onChange(val) {
      // 修改展示的value为当前的点击对象
      this.navValue = val;
    }
  }
};
</script>

<style>
.mu-bottom-nav {
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>

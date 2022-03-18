<template>
  <!-- 底部导航栏 -->
  <mu-bottom-nav>
    <mu-bottom-nav-item
      title="主页"
      icon=":iconfont icon-home"
    ></mu-bottom-nav-item>
    <mu-bottom-nav-item
      title="我的"
      icon=":iconfont icon-user"
    ></mu-bottom-nav-item>
  </mu-bottom-nav>
</template>

<script>
// 引入组件
import Vue from "vue";
import { BottomNav } from "muse-ui";

// 使用组件
Vue.use(BottomNav);
export default {};
</script>

<style>
.mu-bottom-nav {
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>

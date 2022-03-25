<template>
  <div>
    <!-- 用户相关信息 -->
    <div class="userBox">
      <!-- 左侧文字 -->
      <div class="textBox">
        <h1>{{ username }}</h1>
      </div>
      <!-- 右侧头像 -->
      <div class="iconBox">
        <div class="portrait">
          <img :src="portraitImg" alt="" />
        </div>
      </div>
    </div>
    <!-- 间距容器 -->
    <div class="expandBox"></div>
    <!-- 下方列表 -->
    <div class="listBox">
      <mu-list>
        <mu-list-item button :ripple="false">
          <mu-list-item-action>
            <mu-icon value=":iconfont icon-shezhi"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>设置</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-action>
            <mu-icon value=":iconfont icon-yejianmoshi"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>夜间模式</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-action>
            <mu-icon value=":iconfont icon-guanyu"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>关于</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </div>

    <!-- 底部导航栏 -->
    <Nav />
  </div>
</template>

<script>
// 引入组件
import Nav from "./Nav.vue";
import { List, Paper } from "muse-ui";
import Vue from "vue";
import portraitImg from "../assets/img/default_portrait.jpg";

// 使用组件
Vue.use(List);
Vue.use(Paper);

export default {
  components: {
    Nav
  },
  data() {
    return {
      portraitImg: portraitImg,
      // username: this.$route.params.username
      username: window.sessionStorage.getItem("userName")
    };
  }
};
</script>

<style>
.userBox {
  width: 95%;
  height: 100px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  border: 1px solid #cccccc;
  border-radius: 10px;
  box-shadow: 1px 5px 5px #cccccc;
}
.textBox {
  width: 70%;
  display: flex;
  padding: 5px 5px 5px 40px;
}
.iconBox {
  width: 29%;
  display: flex;
  z-index: 10;
}
.portrait {
  width: 80%;
  height: 95%;
  border-radius: 50%;
  margin: 5px 0px 5px 5px;
}
.portrait img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.listBox {
  width: 95%;
  height: 200px;
  margin: 0 auto;
  border: 1px solid #cccccc;
  border-radius: 10px;
  box-shadow: 1px 5px 5px #cccccc;
}
.expandBox {
  width: 100%;
  height: 10px;
}
</style>

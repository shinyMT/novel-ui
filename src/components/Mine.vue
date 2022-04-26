<template>
  <div>
    <!-- 用户相关信息 -->
    <div class="userBox">
      <!-- 左侧文字 -->
      <div class="textBox">
        <h1 class="userName">{{ username }}</h1>
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
        <mu-list-item button :ripple="false" @click="toSetting">
          <mu-list-item-action>
            <mu-icon value=":iconfont icon-shezhi"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>设置</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false" @click="changeMode">
          <mu-list-item-action>
            <mu-icon value=":iconfont icon-yejianmoshi"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>夜间模式</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false" @click="toAbout">
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
import Toast from "muse-ui-toast";
import theme from "muse-ui/lib/theme";
import "../assets/css/mine.css";

// 使用组件
Vue.use(List);
Vue.use(Paper);
Vue.use(Toast);

export default {
  components: {
    Nav
  },
  data() {
    return {
      portraitImg: portraitImg,
      username: window.sessionStorage.getItem("userName"),
      userId: window.sessionStorage.getItem("userId"),
      currentMode: false
    };
  },
  methods: {
    toSetting() {
      Toast.warning("功能暂未开启");
    },
    changeMode() {
      const userBoxNode = document.getElementsByClassName("userBox")[0];
      const listBoxNode = document.getElementsByClassName("listBox")[0];
      const h1Node = document.getElementsByTagName("h1")[0];
      // 判断当前是否在暗黑模式, 默认为FALSE
      if (this.currentMode) {
        // 开启亮色模式
        theme.use("light");
        this.currentMode = false;

        // 同步修改自定义样式的颜色
        userBoxNode.style.boxShadow = "1px 5px 5px #cccccc";
        listBoxNode.style.boxShadow = "1px 5px 5px #cccccc";
        h1Node.style.color = "#000000";
      } else {
        theme.use("dark");
        this.currentMode = true;

        // 同步修改自定义样式的颜色
        userBoxNode.style.boxShadow = "1px 5px 5px #000000";
        listBoxNode.style.boxShadow = "1px 5px 5px #000000";
        h1Node.style.color = "#cccccc";
      }
    },
    toAbout() {
      Toast.warning("功能暂未开启");
    }
  }
};
</script>

<style></style>

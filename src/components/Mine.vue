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

<style>
h1 {
  color: #000000;
}
.userBox {
  width: 95%;
  height: 100px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
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
  width: 90%;
  height: 90%;
  border-radius: 45%;
}
.listBox {
  width: 95%;
  height: 200px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 1px 5px 5px #cccccc;
}
.expandBox {
  width: 100%;
  height: 10px;
}
</style>

<template>
  <div>
    <!-- 背景 -->
    <div class="img-container">
      <!-- 模糊层 -->
      <article class="blur-box">
        <div class="rgba">
          <!-- 主内容容器 -->
          <div class="container">
            <div class="inputBox">
              <input
                v-model="account"
                id="account"
                type="text"
                class="input-sytle"
                placeholder="请输入用户名"
                autocomplete="off"
              />
            </div>
            <div class="inputBox">
              <input
                v-model="password"
                id="password"
                type="password"
                class="input-sytle"
                placeholder="请输入密码"
                autocomplete="off"
              />
            </div>
            <div class="mui-content-padded">
              <button id="login" class="btn-primary" @click="login">
                登录
              </button>
              <div class="link-area">
                <a class="linkStyle" id="reg" @click="register">注册账号</a>
                <span class="spliter"> | </span>
                <a class="linkStyle" id="forgetPassword" @click="forgetPwd"
                  >忘记密码</a
                >
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
// 引入组件
import Vue from "vue";
import { TextField, Icon, Snackbar, Button } from "muse-ui";
import commonStyle from "../assets/css/common.css";
import commonMethod from "../assets/js/common";
import httpUtil from "../assets/js/http_util";
import api from "../assets/js/api";
import Toast from "muse-ui-toast";
import md5 from "js-md5";

// 使用组件
Vue.use(TextField);
Vue.use(Icon);
Vue.prototype.commonStyle = commonStyle;
Vue.prototype.commonMethod = commonMethod;
Vue.prototype.httpUtil = httpUtil;
Vue.prototype.api = api;
Vue.use(Snackbar);
Vue.use(Button);
Vue.use(Toast);

export default {
  name: "Login",
  data() {
    return {
      account: "",
      password: "",
      timer: 0
    };
  },
  methods: {
    login() {
      // 定义一个变量暂存this
      let that = this;

      if (this.account != null && this.password != null) {
        // 将待传递的参数封装为JSON对象，同时对密码进行加密
        var bodyData = {
          name: this.account,
          password: md5(this.password)
        };

        var result = httpUtil.post(api.apiLogin, bodyData);
        result.then(function(res) {
          const data = res.data;
          console.log(data);
          if (data.code == 0) {
            Toast.success("登录成功");
            // 将用户信息存入session中
            window.sessionStorage.setItem("userName", data.result.name);
            window.sessionStorage.setItem("userId", data.result.id);
            // 设置延时跳转
            setTimeout(() => {
              // commonMethod.openWindow(that.$router, "Main", account, userId);
              commonMethod.openWindow(that.$router, "Main");
            }, 2000);
          } else if (data.code < 0) {
            Toast.error("账号或密码错误");
          }
        });
      }
    },
    register() {
      // console.log("点击了注册按钮");
      commonMethod.openWindow(this.$router, "Register");
    },
    forgetPwd() {
      // console.log("点击了忘记密码按钮");
      commonMethod.openWindow(this.$router, "Reset");
    }
  },
  mounted() {
    console.log(md5("admin"));
  }
};
</script>

<style>
article {
  width: 90%;
  height: 300px;
}
</style>

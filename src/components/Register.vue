<template>
  <div>
    <!-- 标题栏 -->
    <mu-appbar style="titleBar" title="注 册">
      <mu-button icon slot="left" @click="onClickLeft">
        <mu-icon value=":iconfont icon-fanhui"></mu-icon>
      </mu-button>
    </mu-appbar>
    <!-- 主内容 -->
    <div class="container">
      <div class="">
        <p class="tip">账号</p>
        <div class="inputBox">
          <input
            v-model="account"
            id="account"
            type="text"
            class="input-sytle"
            placeholder="请输入账号"
            autocomplete="off"
          />
        </div>
      </div>
      <div class="">
        <p class="tip">密码</p>
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
      </div>
      <div>
        <p class="tip">确认</p>
        <div class="inputBox">
          <input
            v-model="pwdConfirm"
            id="password_confirm"
            type="password"
            class="input-sytle"
            placeholder="请再次输入以确认密码"
            autocomplete="off"
          />
        </div>
      </div>
      <div>
        <p class="tip">邮箱</p>
        <div class="inputBox">
          <input
            v-model="email"
            id="email"
            type="email"
            class="input-sytle"
            placeholder="请输入邮箱"
            autocomplete="off"
          />
        </div>
      </div>
    </div>
    <div class="content-padded">
      <button id="reg" class="btn-primary" @click="register">
        注册
      </button>
    </div>
  </div>
</template>

<script>
// 引入组件
import Vue from "vue";
import { AppBar, Button, Icon } from "muse-ui";
import commonMethod from "../assets/js/common";
import httpUtil from "../assets/js/http_util";
import api from "../assets/js/api";
import { Snackbar } from "muse-ui";
import Toast from "muse-ui-toast";

// 使用组件
Vue.use(AppBar);
Vue.use(Button);
Vue.use(Icon);
Vue.prototype.commonMethod = commonMethod;
Vue.prototype.httpUtil = httpUtil;
Vue.prototype.api = api;
Vue.use(Snackbar);
Vue.use(Toast);

export default {
  data() {
    return {
      account: "",
      password: "",
      pwdConfirm: "",
      email: ""
    };
  },
  methods: {
    onClickLeft() {
      //   console.log("返回");
      this.$router.go(-1);
    },
    register() {
      const account = this.account;
      const pwd = this.password;
      const pwdConfirm = this.pwdConfirm;
      const email = this.email;

      // 给账号设置非空验证
      var matchAccountRes = commonMethod.notNull(account);
      // console.log("账号验证结果：" + matchAccountRes)
      if (!matchAccountRes) {
        Toast.warning("账号不能为空");
      } else {
        var matchPwd = commonMethod.notNull(pwd);
        if (!matchPwd) {
          Toast.warning("密码不能为空");
        } else {
          if (pwd != pwdConfirm) {
            Toast.warning("两次输入的密码不一致！");
          } else {
            var matchEmailRes = commonMethod.emailMatch(email);
            if (!matchEmailRes) {
              Toast.warning("您输入的邮箱格式不正确请重新输入");
            } else {
              // 向服务器传递注册数据
              addUser(account, pwd, email);
            }
          }
        }
      }
    },
    addUser(name, password, email) {
      let that = this;
      // 向服务发起申请添加用户
      var bodyData = new URLSearchParams();
      bodyData.append("name", name);
      bodyData.append("password", password);
      bodyData.append("email", email);
      // 发起请求
      var result = httpUtil.post(api.apiRegister, bodyData);
      result.then(function(res) {
        var data = res.data;
        if (data.code == 0) {
          // 注册成功，跳转到主页
          commonMethod.openWindow(that.$router, "Main");
        } else if (data.code == -302) {
          Toast.warning("用户名已存在，请重新输入");
        } else {
          Toast.error("注册失败，请稍后重试或联系管理员");
        }
      });
    }
  }
};
</script>

<style>
.mu-appbar-title {
  font-size: 17px;
  width: 100%;
  text-align: center;
  padding-left: -10px;
}
.content-padded {
  padding: 0px 30px;
}
</style>

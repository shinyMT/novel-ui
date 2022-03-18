<template>
  <div>
    <div class="container">
      <div>
        <p class="tip">邮箱</p>
        <div class="inputBox">
          <input
            v-model="email"
            id="email"
            type="email"
            class="input-sytle"
            placeholder="请输入您注册的邮箱"
            autocomplete="off"
          />
        </div>
      </div>
      <div class="content-padded">
        <button id="sendMail" class="btn-primary" @click="sendMail">
          提交
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import Vue from "vue";
import commonMethod from "../assets/js/common";
import { Snackbar } from "muse-ui";
import Toast from "muse-ui-toast";
import httpUtil from "../assets/js/http_util";
import api from "../assets/js/api";

// 使用组件
Vue.prototype.commonMethod = commonMethod;
Vue.use(Snackbar);
Vue.use(Toast);
Vue.prototype.httpUtil = httpUtil;
Vue.prototype.api = api;

export default {
  data() {
    return {
      email: ""
    };
  },
  methods: {
    sendMail() {
      // 重置密码
      let that = this;
      const email = this.email;
      //   console.log(email);
      var matchEmailResult = commonMethod.emailMatch(email);
      if (!matchEmailResult) {
        Toast.warning("您输入的邮箱格式不正确，请重新输入");
      } else {
        // 发起请求
        var bodyData = new URLSearchParams();
        bodyData.append("email", email);
        var result = httpUtil.post(api.apiResetPwd, bodyData);
        result.then(function(res) {
          var data = res.data;
          if (data == -600) {
            Toast.warning("网络异常，请稍后重试");
          } else {
            if (data.code == 0) {
              Toast.success("重置成功，请查看邮箱密码重新登录");
            } else if (data.code < 0) {
              Toast.error("重置异常，请联系管理员");
            }
          }
        });
      }
    }
  }
};
</script>

<style></style>

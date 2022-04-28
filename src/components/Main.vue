<template>
  <div>
    <div class="centerContainer">
      <p class="tip">书籍名称</p>
      <div class="inputBox">
        <input
          v-model="bookName"
          id="bookName"
          type="bookName"
          class="input-sytle"
          placeholder="例: 离谱"
          autocomplete="off"
        />
      </div>
      <p class="tip">书籍作者</p>
      <div class="inputBox">
        <input
          v-model="bookAuthor"
          id="bookAuthor"
          type="bookAuthor"
          class="input-sytle"
          placeholder="例: 热死了"
          autocomplete="off"
        />
      </div>

      <div class="mui-content-padded">
        <button id="submitInfo" class="btn-primary" @click="submitInfo">
          提交
        </button>
      </div>
      <div class="progress" v-if="showProgress">
        <mu-linear-progress
          :value="linear"
          mode="determinate"
          color="green"
        ></mu-linear-progress>
      </div>
      <div v-else></div>
    </div>
    <!-- 底部导航栏 -->
    <Nav />
  </div>
</template>

<script>
// 引入组件
import Vue from "vue";
import Nav from "./Nav.vue";
import httpUtil from "../assets/js/http_util";
import api from "../assets/js/api";
import Toast from "muse-ui-toast";
import { Progress } from "muse-ui";

// 使用组件
Vue.prototype.httpUtil = httpUtil;
Vue.prototype.api = api;
Vue.use(Toast);
Vue.use(Progress);

export default {
  components: {
    Nav
  },
  data() {
    return {
      bookName: "",
      bookAuthor: "",
      linear: 0,
      showProgress: false,
      progressTimer: 0,
      timer: 0,
      username: this.$route.params.username,
      userId: window.sessionStorage.getItem("userId")
    };
  },
  methods: {
    submitInfo() {
      let that = this;
      // 获取参数
      const bookName = this.bookName;
      const bookAuthor = this.bookAuthor;
      if (bookName != null && bookAuthor != null) {
        var bodyMap = {
          name: bookName,
          author: bookAuthor
        };
        // 发起请求
        var result = httpUtil.post(
          api.apiGetBook + "?userId=" + this.userId,
          bodyMap
        );
        // 展示进度条
        that.showProgress = true;
        // 开启进度条计时
        this.progressTimer = setInterval(() => {
          this.linear += 2;
          if (this.linear > 100) {
            this.linear = 0;
          }
        }, 1000);
        result.then(function(res) {
          if (res == -600) {
            Toast.warning("网络异常，请稍后重试");
            that.showProgress = false;
            // 清除定时器
            if (that.progressTimer) {
              clearInterval(that.progressTimer);
            }
          } else {
            var data = res.data;
            if (data.code == 0) {
              Toast.success("获取成功，请到书架中查看");
            } else if (data.code == -501) {
              Toast.warning("该书籍在书库中已经存在");
            } else {
              Toast.error("获取失败，请稍后重试或者联系管理员");
            }
            // 将进度条拉到100表示获取完毕，1s后再隐藏进度条
            that.linear = 100;

            clearTimeout(that.timer);
            that.timer = setTimeout(() => {
              // 隐藏进度条
              that.showProgress = false;
            }, 1000);

            if (that.progressTimer) {
              clearInterval(that.progressTimer);
            }
          }
        });
      } else {
        Toast.warning("书名和作者信息不能为空");
      }
    }
  }
};
</script>

<style>
.centerContainer {
  position: absolute;
  top: 0;
  bottom: 10%;
  left: 0;
  right: 0;
  margin: auto;
  width: 90%;
  height: 400px;
  padding: 0px 20px;
}
.progress {
  margin: 10px 0px;
}
</style>

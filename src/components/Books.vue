<template>
  <div>
    <!-- 书籍列表 -->
    <div class="bookListBox">
      <mu-grid-list class="gridlist-demo">
        <mu-sub-header>藏书</mu-sub-header>
        <mu-grid-tile v-for="(tile, index) in list" :key="index">
          <img src="" />
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

// 使用组件
Vue.use(GridList);
Vue.use(SubHeader);

export default {
  components: {
    Nav
  },
  data() {
    return {
      list: [
        {
          title: 1
        },
        {
          titile: 2
        }
      ]
    };
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

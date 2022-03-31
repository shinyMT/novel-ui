<template>
    <div id="book"></div>
</template>

<script>
// 引入组件
import Epub from "epubjs"
import Vue from 'vue'
import "jszip"
const bookUrl = '/static/lipu.epub'

// 使用组件
Vue.use(Epub)

export default {
    data(){
        return{

        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            // 获取传递来的书籍路径
            const bookPath = this.$route.params.bookPath
            console.log("书籍路径：" + bookPath)
            this.book = new Epub(bookUrl, {
                width: window.innerWidth,
                height: window.innerHeight,
                spreads: false,
                restore: true
            })
            console.log(this.book)
            this.rendition = this.book.renderTo("book", {
                width: window.innerWidth,
                height: window.innerHeight,
                manager: 'continuous'
            })
            // 渲染电子书
            this.rendition.display();

        }
    }
}
</script>

<style>
#book{
    position: relative;
}
</style>
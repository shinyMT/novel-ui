<template>
    <div class="page">
        <!-- 顶部导航栏 -->
        <mu-appbar style="width: 100%; height:20%" color="primary">
            <mu-button icon slot="left" @click="toDic">
                <mu-icon value="menu"></mu-icon>
            </mu-button>

            <!-- 弹出层 -->
            <mu-button flat slot="right" ref="button" @click="open = !open">字体</mu-button>
            <mu-popover class="pop" cover :open.sync="open" :trigger="trigger">
                <mu-list>
                    <!-- 设置字体大小 -->
                    <mu-list-item>
                        <mu-list-item-title @click="littleFont" style="font-size:15px;">字</mu-list-item-title>
                        <mu-list-item-title>｜</mu-list-item-title>
                        <mu-list-item-title @click="bigFont" style="font-size:18px;">字</mu-list-item-title>
                    </mu-list-item>
                </mu-list>
            </mu-popover>
        </mu-appbar>
        <!-- 书籍内容 -->
        <div class="eBook">
            <div class="read-wrapper">
                <div id="read"></div>
                <div class="mask">
                    <div class="left" @click="prevPage"></div>
                    <div class="right" @click="nextPage"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 引入组件
import Epub from "epubjs"
import Vue from 'vue'
import "jszip"
import { AppBar, Popover, List } from "muse-ui"
const bookUrl = 'http://localhost:8085/novel/yuqingkedai.epub'

// 使用组件
Vue.use(Epub)
Vue.use(AppBar)
Vue.use(Popover)
Vue.use(List)

export default {
    data(){
        return{
            // 图书是否可用
            bookIsAvailable: false,
            navigation: {},
            // 弹出层默认值
            open: false,
            trigger: null
        }
    },
    mounted(){
        this.showEpub()
        this.trigger = this.$refs.button.$el
    },
    methods:{
        showEpub(){
            // 获取传递来的书籍路径
            const bookPath = this.$route.params.bookPath
            console.log("书籍路径：" + bookPath)
            // 生成book对象
            this.book = new Epub(bookUrl)
            // console.log(this.book)
            this.rendition = this.book.renderTo("read", {
                width: window.innerWidth,
                height: window.innerHeight,
                method: 'default'
            })
            // 渲染电子书
            this.rendition.display();
            this.rendition.on('touchstart', e => {
                this.touchStartX = e.changedTouches[0].clientX
                this.timeStamp = e.timeStamp
            }).on('touchend', e => {
                e.preventDefault()
                e.stopPropagation()
                this.offsetX = e.changedTouches[0].clientX - this.touchStartX
                this.time = e.timeStamp - this.timeStamp
                if(this.time < 500 && this.offsetX > 40){
                    this.prevPage()
                }else if(this.time < 500 && offsetX < -40){
                    this.nextPage()
                }else{
                    this.toggleTitleAndMenu()
                }
            })

            // 获取theme对象
            this.themes = this.rendition.themes
            this.book.ready.then(() => {
                this.navigation = this.book.navigation
                // 生成location对象
                return this.book.locations.generate()
            }).then(result => {
                // 保存location对象
                this.locations = this.book.locations
                // 标记电子书解析完毕
                this.bookIsAvailable = true
            })

        },
        prevPage(){
            // 上一页
            if(this.rendition){
                this.rendition.prev()
            }
        },
        nextPage(){
            // 下一页
            if(this.rendition){
                this.rendition.next()
            }
        },
        initPaging(){
            // 分页
            this.book.ready.then(() => {
                return this.book.locations.generate(750 * (window.innerWidth)/375) * (getFontSize(this.fileName)/16)
            }).then(locations => {
                console.log(locations)
            })
        },
        toDic(){
            // 跳转到目录页
            // console.log("点击了目录")
            // 获取章节目录
            console.log(this.section)
            return this.section && this.navigation ? 
            this.navigation[this.section].label : '未知章节'
        },
        littleFont(){
            // 缩小字体
            console.log("缩小字体")
            
        },
        bigFont(){
            // 放大字体
            console.log("放大字体")
        }
    }
}
</script>

<style>
.page{
    width: 100%;
    height: 90%;
}
.eBook{
    width: 100%;
    height: 80%;
}
#read{
    position: relative;
    width: 100%;
    height: 95%;
}
.mask{
    position: absolute;
    top: 48px;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 90%;
}
.left{
    width: 20%;
    height: 100%;
    position: inherit;
    text-align: center;
    vertical-align: middle;
}
.right{
    width: 20%;
    height: 100%;
    right: 0;
    position: inherit;
}
.pop{
    width: 200px;
}
.mu-item-title{
    text-align: center;
    font-size: 16px;
}
</style>
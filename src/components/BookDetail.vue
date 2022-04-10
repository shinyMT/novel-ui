<template>
    <div class="page">
        <!-- 顶部导航栏 -->
        <mu-appbar style="width: 100%; position:absolute" id="appBar" >
            <!-- 返回按钮 -->
            <mu-button icon slot="left" @click="backToLastPage">
                <mu-icon value=":iconfont icon-fanhui"></mu-icon>
            </mu-button>
            <!-- 目录按钮 -->
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
                    <!-- 设置阅读器背景色 -->
                    <mu-list-item>
                        <mu-list-item-title @click="changeToWhite">
                            <div class="themeCircle" style="background-color: #dddddd;"></div>
                        </mu-list-item-title>
                        <mu-list-item-title @click="changeToGreen">
                            <div class="themeCircle" style="background-color: #E3EDCD;"></div>
                        </mu-list-item-title>
                        <mu-list-item-title @click="changeToYellow">
                            <div class="themeCircle" style="background-color: blanchedalmond;"></div>
                        </mu-list-item-title>
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
                    <div class="center" @click="hideBar"></div>
                    <div class="right" @click="nextPage"></div>
                </div>
            </div>
        </div>

        <!-- 进度条 -->
        <div class="progress-wrapper">
            <input class="progress" type="range" max="100" min="0" step="0.01"
                @change="onProgressChange($event.target.value)"
                @input="onProgressInput($event.target.value)" :value="progress"
                :disabled="!bookIsAvailable" ref="progress">
        </div>

        <!-- 侧边弹出的目录导航页 -->
        <mu-drawer :open.sync="openDrawer" width="200px" :docked="docked" :right="position === 'right'">
            <mu-list>
                <mu-list-item v-for="(item, index) in sectionList" :key="index">
                    <mu-list-item-title @click="jumpToTarget(item)">{{ item.label }}</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-drawer>
    </div>
</template>

<script>
// 引入组件
import Epub from "epubjs"
import Vue from 'vue'
import "jszip"
import { AppBar, Popover, List, Progress, Drawer } from "muse-ui"
import http_util from '../assets/js/http_util'
import api from "../assets/js/api"
import Toast from "muse-ui-toast"
// const bookUrl = 'http://localhost:8085/novel/yuqingkedai.epub'

// 使用组件
Vue.use(Epub)
Vue.use(AppBar)
Vue.use(Popover)
Vue.use(List)
Vue.use(Progress)
Vue.prototype.api = api
Vue.use(Drawer)
Vue.use(Toast)

export default {
    data(){
        return{
            // 图书是否可用
            bookIsAvailable: false,
            navigation: {},
            // 弹出层默认值
            open: false,
            trigger: null,
            // appbar是否为展示状态，默认为false
            isShow: false,
            // 默认字体
            defaultSize: 16,
            // 阅读的进度，默认为0，从头开始
            progress: 0,
            // 侧边目录参数
            docked: false,
            openDrawer: false,
            position: 'left',
            sectionList: []
        }
    },
    created(){
        // 在渲染book之前获取当前书籍的阅读进度
        var result = this.getProgress()
        var that = this
        result.then(res => {
                // console.log(res)
                if(res == -600){
                    Toast.erro("当前网络异常，请稍后重试")
                }else{
                    const data = res.data
                    if(data.code == 0){
                        window.sessionStorage.setItem('progress', data.data[0].bookProgress)
                        // console.log(window.sessionStorage.getItem('progress'))
                        // 获取进度成功后再渲染书籍
                        that.showEpub()
                        
                    }else{
                        // 为空说明是新书，则从头开始渲染
                        window.sessionStorage.setItem('progress', '')
                        that.showEpub()
                    }
                }
            })
    },
    mounted(){
        // this.showEpub()
        // this.initPaging()
        this.trigger = this.$refs.button.$el
        // 监听返回事件
        window.addEventListener('popstate', this.backToLastPage, false)
    },
    methods:{
        showEpub(){
            // 获取传递来的书籍路径
            const bookPath = this.$route.params.bookPath.split('/')
            const splitBookPath = "/" + bookPath[2] + "/" + bookPath[3]
            // console.log("书籍路径：" + splitBookPath)
            // 生成book对象
            this.book = new Epub(api.apiTest + splitBookPath)
            // this.book = new Epub(bookUrl)
            // console.log(this.book)
            this.rendition = this.book.renderTo("read", {
                width: window.innerWidth,
                height: window.innerHeight,
                method: 'default'
            })
            // 获取当前书籍的进度
            const bookProgress = window.sessionStorage.getItem('progress')
            console.log(bookProgress)
            if(bookProgress != ''){
                // 有进度则带着进度渲染同时更新进度条
                this.rendition.display(bookProgress)
            }else{
                // 没有进度则从头开始渲染电子书
                this.rendition.display();
            }
            // this.rendition.display();
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
            // console.log(this.book)
            this.book.ready.then(() => {
                this.book.loaded.navigation.then(nav => {
                    this.navigation = nav
                    // console.log(this.navigation)
                })
                // 生成location对象
                return this.book.locations.generate(750 * (window.innerWidth / 375))
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
                var that = this
                this.rendition.prev().then(() => {
                    // 翻页的时候刷新进度条
                    that.refreshLocation()
                })
            }
        },
        nextPage(){
            // 下一页
            if(this.rendition){
                var that = this
                this.rendition.next().then(() => {
                    that.refreshLocation()
                })
            }
        },
        hideBar(){
            const barDom = document.getElementById("appBar")
            const progressDom = document.getElementsByClassName("progress-wrapper")[0]
            // 隐藏/展示appbar
            if(this.isShow){
                // 如果为true则展示appBar和进度条
                barDom.style.display = ""
                progressDom.style.display = ""
                this.isShow = false
            }else{
                barDom.style.display = "none"
                progressDom.style.display = "none"
                this.isShow = true
            }
            // console.log("点击了" + barDom)
        },
        initPaging(){
            // 分页
            this.book.ready.then(() => {
                return this.book.locations.generate(750 * (window.innerWidth) / 375) 
            }).then(locations => {
                // console.log(locations)
            })
        },
        toDic(){
            // 跳转到目录页
            // console.log("点击了目录")
            this.openDrawer = true
            const sections = this.book.navigation.toc
            this.sectionList = sections
            // console.log(sections)
        },
        littleFont(){
            // 缩小字体
            // this.book.rendition.themes.fontSize(13)
            // console.log("当前字体大小", this.defaultSize)
            this.defaultSize -= 1
            this.book.rendition.themes.fontSize(this.defaultSize)
            this.book.rendition.themes.font('微软雅黑')
        },
        bigFont(){
            // 放大字体
            this.defaultSize += 1
            this.book.rendition.themes.fontSize(this.defaultSize)
        },
        changeToWhite(){
            // 设置主题色为白色
            const readDom = document.getElementById('read')
            const bookContentDom = document.querySelector('iframe')
                .contentWindow.document.getElementsByClassName('calibre')[0]
            readDom.style.backgroundColor = '#e6e6e6'
            bookContentDom.style.color = '#000000'
        },
        changeToGreen(){
            // 设置主题色为绿色
            const readDom = document.getElementById('read')
            const bookContentDom = document.querySelector('iframe').contentWindow.document.getElementsByClassName('calibre')[0]
            readDom.style.backgroundColor = '#97cf94'
            bookContentDom.style.color = '#000000'
        },
        changeToYellow(){
            // 设置主题色为黄色
            const readDom = document.getElementById('read')
            const bookContentDom = document.querySelector('iframe')
                .contentWindow.document.getElementsByClassName('calibre')[0]
            // console.log(bookContentDom)
            readDom.style.backgroundColor = '#ecd9ac'
            bookContentDom.style.color = '#3d3d3d'
        },
        onProgressChange: function (percentage) { 
            // progress 进度条的数值(0-100) 
            // 更新进度条的值
            this.progress = Math.floor(percentage)
            var currentPercentage = percentage / 100;
            this.location = percentage > 0 ? this.book.locations.cfiFromPercentage(currentPercentage) : 0
            // console.log(this.location)
            this.rendition.display(this.location);
            // 保存阅读进度
            this.saveProgress(this.location)
        },
        onProgressInput: function (percentage) {
            // 更新进度条的值
            this.progress = Math.floor(percentage)
            var currentPercentage = percentage / 100;
            // console.log(percentage)
            this.location = percentage > 0 ? this.locations.cfiFromPercentage(currentPercentage) : 0
            this.$refs.progress.style.backgroundSize = `${
            percentage} % 100%`;
            // 保存阅读进度
            this.saveProgress(this.location)
        },
        refreshLocation(){
            // 刷新进度条的位置
            const currentLocation = this.book.rendition.currentLocation()
            const judgeResult = this.judgeLocation(currentLocation)
            if(judgeResult){
                // console.log(currentLocation.start.cfi)
                const currentPercentage = (this.book.locations.percentageFromCfi(currentLocation.start.cfi).toFixed(5) * 10000) / 100;
                
                // console.log(currentLocation.start.cfi)   
                // this.progress = currentProgress;
                this.onProgressInput(currentPercentage)
                // 刷新完成后保存进度
                this.saveProgress(currentLocation.start.cfi)
            }
        },
        jumpToTarget(item){
            // 点击目录跳转到对应的章节页面
            // 跳转完成后点击下一页或上一页对应的进度条会自动更新
            console.log(item)
            this.rendition.display(item.href)
            // this.saveProgress(href)
        },
        saveProgress(progress){
            // 保存阅读进度
            window.localStorage.setItem('progress', progress)
            // console.log(progress)
        },
        judgeLocation(currentLocation){
            // 判断获取的book的location对象是否为空
            if(JSON.stringify(currentLocation) === '{}'){
                // currentLocation为空
                return false
            }else{
                return true
            }
        },
        addProgressToWeb(progress){
            var that = this
            var bodyMap = new URLSearchParams()
            bodyMap.append('userId', window.sessionStorage.getItem('userId'))
            bodyMap.append('bookId', this.$route.params.bookId)
            bodyMap.append('progress', progress)
            var result = http_util.post(api.apiSaveProgress, bodyMap)
            result.then(res => {
                console.log(res)
                const data = res.data
                if(data.code == 0){
                    that.$router.go(-1)
                }else{
                    Toast.warning("当前退出可能导致阅读进度保存失败，请稍后重试")
                }
            })
        },
        backToLastPage(){
            // 在返回时将当前最新的阅读进度保存到服务器中
            this.addProgressToWeb(window.localStorage.getItem('progress'))
        },
        getProgress(){
            // 从服务器上获取当前书籍的阅读进度
            var bodyMap = new URLSearchParams()
            bodyMap.append('userId', window.sessionStorage.getItem('userId'))
            bodyMap.append('bookId', this.$route.params.bookId)
            var result = http_util.post(api.apiGetProgress, bodyMap)
            
            return result
        }
    },
    destroyed(){
        // 在页面销毁时移除监听事件
        window.removeEventListener('popstate', this.backToLastPage, false)
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
    /* position: relative; */
    width: 100%;
    height: 95%;
}
.mask{
    position: absolute;
    top: 48px;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 85%;
}
.left{
    width: 20%;
    height: 100%;
    position: inherit;
    text-align: center;
    vertical-align: middle;
}
.center{
    width: 60%;
    height: 100%;
    position: inherit;
    left: 20%;
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
/* 主内容容器 */
.epub-container{
    display: flex;
    height: 90%;
}
/* 切换主题色 */
.themeCircle{
    width: 24px;
    height: 24px;
    border-radius: 12px;
    margin: 0 auto;
}
/* 进度条 */
.progress-wrapper{
    position: absolute;
    bottom: 2%;
    width: 100%;
}
.progress{
    width: 98%;
    margin: 0 auto;
}
</style>
import axios from "axios"
import api from "./api"

export default{
    // 封装一个get请求方法
    get(url, param){
        // 定义一个变量存放请求结果
        var result
        // 执行axios请求
        axios({
            url: url,
            method: 'get',
            params: param,
            dataType: 'json',
            async: false
        }).then(function(res){
            console.log("get请求结果：")
            console.log(res)
            result = res
        }).catch(function(reason){
            console.log("网络异常：" + reason)
            result = api.NET_WORK_ERROR
        })

        return result
    },

    // 封装一个post请求
    async post(url, param){
        // 定义一个变量存放请求结果
        var result
        console.log("post请求的地址：" + url)
        console.log("post请求的参数：")
        console.log(param)
        await axios({
            url: url,
            method: 'post',
            data: param,
        }).then(function(res){
            console.log("post请求结果：")
            console.log(res)
            result = res
        }).catch(function(reason){
            console.log("网络异常：" + reason)
            result = api.NET_WORK_ERROR
        })

        return result
    }
}
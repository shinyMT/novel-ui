// 根据当前执行命令选择的环境加载不同地址
const sBaseApi = process.env.BASE_SERVER_URL
// console.log("当前环境的地址：" + sBaseApi)

// ------------- 用户相关 -------------
 // 登录
 var apiLogin = sBaseApi + "/user/check"
 // 注册
 var apiRegister = sBaseApi + "/user/add"
 // 忘记密码
 var apiResetPwd = sBaseApi + "/user/send"


// ------------- 书籍相关 -------------
 // 添加书籍
 var apiAddBook = sBaseApi + "/book/add"

 // 爬取书籍
 var apiGetBook = sBaseApi + "/book/get"

 // 获取书籍列表
 var apiGetBookList = sBaseApi + "/book/list"

 // 保存阅读进度
 var apiSaveProgress = sBaseApi + "/add/progress"

 // 获取当前用户当前书籍的阅读进度
 var apiGetProgress = sBaseApi + "/get/progress"

 // 网络异常代码
 var NET_WORK_ERROR = -600


 export default{
     sBaseApi,
     apiLogin,
     apiRegister,
     apiResetPwd,
     apiAddBook,
     apiGetBook,
     apiGetBookList,
     apiSaveProgress,
     apiGetProgress,
     NET_WORK_ERROR
 }
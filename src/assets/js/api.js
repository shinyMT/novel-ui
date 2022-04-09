// 测试环境
var apiTest = "http://127.0.0.1:8085"

// 正式环境
var apiProd = "http://43.138.212.92:11101"

var envIsProduct = true

var sBaseApi = envIsProduct ? apiProd : apiTest

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


 export default{
     apiTest,
     sBaseApi,
     apiLogin,
     apiRegister,
     apiResetPwd,
     apiAddBook,
     apiGetBook,
     apiGetBookList,
     apiSaveProgress,
     apiGetProgress
 }
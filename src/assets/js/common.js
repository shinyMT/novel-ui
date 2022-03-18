export default{
    // 封装一个跳转到其他页面的方法
    openWindow(routeName, targetPage){
        routeName.push({
            name: targetPage
        })
    },
    // 设置非空验证
	notNull(str) {
		if (str != null && str != "") {
			return true
		}
		return false
	},
    // 添加邮箱规则验证
	emailMatch(email) {
		var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
		return pattern.test(email)
	}
}
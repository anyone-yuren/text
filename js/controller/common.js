APP.controller = {};
APP.controller.common = (function() {
	function empty() {}

	window.console = window.console || {
		log: empty,
		error: empty,
		warning: empty,
		info: empty
	}
	var api = {};

	api.loadConfig = function(url) {
		var config = null;
		$.ajax({
			url: url,
			type: 'GET',
			async: false,
			success: function(ret) {
				config = ret;
			},
			error: function(e) {
				console.error('get global config error!');
				console.error(e);
			}
		});
		APP.config = config;
	}

	// 获取验证码图片
	api.getValidCodeImg = function() {
	//获取验证码地址
		return APP.path + api.getUrl('getvalidImg');
	}


	// js获取浏览器地址栏request参数
	api.getLocArgs = function(para) {
		var args = new Object();
		var query = location.search.substring(1); // 获取查询语句
		var list = query.split("&");
		for (var i = 0, o; o = list[i]; i++) {
			var pos = o.indexOf("=");
			if (pos == -1) {
				continue;
			}
			var argname = o.substring(0, pos);
			var value = o.substring(pos + 1);
			value = decodeURIComponent(value);
			args[argname] = value;
		}
		return args[para];
	}
	
	api.getUrl = function(type) {
		return (APP.debug?APP.path:APP.paths) + APP.urls[APP.debug ? type : type + '_test'];
	}
	
	api.addCookie = function(name, value, days, path) {
		var userName = escape(name);
		var userValue = escape(value);
		var expires = new Date();
		expires.setTime(expires.getTime() + days * 3600000 * 24);
		//path=/，表示cookie能在整个网站下使用，path=/temp，表示cookie只能在temp目录下使用  
		path = path == "" ? "" : ";path=" + path;
		//参数days只能是数字型  
		var _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();
		document.cookie = name + "=" + value + _expires + path;
	}

	api.getCookieValue = function(name) {  
		var name = escape(name); 
		var allcookies = document.cookie;
		//查找名为name的cookie的开始位置  
		name += "=";
		var pos = allcookies.indexOf(name);  
		if (pos != -1) { //如果pos值为-1则说明搜索"version="失败  
			var start = pos + name.length; //cookie值开始的位置  
			var end = allcookies.indexOf(";", start); //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置  
			if (end == -1) end = allcookies.length; //如果end值为-1说明cookie列表里只有一个cookie  
			var value = allcookies.substring(start, end);   
			return (value);         
		} else {  
			return "";
		}
	}
	
	api.deleteCookie = function(name, path) { 
		var name = escape(name);
		var expires = new Date(0);
		path = path == "" ? "" : ";path=" + path;
		document.cookie = name + "=" + ";expires=" + expires.toUTCString() + path;
	}
	
	//ajax公共方法
	api.doAjax  = function(param,url) {
		var data = {};
		$.ajax({
			url: url,
			type: 'GET',
			async: false,
			data:param,
			success: function(ret) {
				data = ret;
			},
			error: function(e) {
				alert('请求失败');
				console.error(e);
				return;
			}
		});
		return data;
	}
	return api;
})();

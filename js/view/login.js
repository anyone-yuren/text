APP.view.login = (function() {
	var api = {};
	api.loadBody = function(callback) {
		$(document.body).load(APP.paths + '/page/c_login.html',function() {
			callback.call(this);
		})
	}
	var el = {
		getLoginForm: function() {
			return $('#loginform');
		},
		getValidImg: function() {
			return $('#validImg');
		},
		getTipmsg: function() {
			return $('#tipmsg');
		},
		getSubbtn: function() {
			return this.getLoginForm().find('button[type=submit]');
		}
	}
	api.setTipmsg = function(msg) {
		el.getTipmsg().html(msg).removeClass('invisible');
	}
	// 设置验证码图片
	api.setValidImgSrc = function(src) {
		el.getValidImg().prop('src', src);
	}
	// 提交按钮转换为等待状态
	api.sub2waiting = function() {
		el.getSubbtn().text('正在登录，请稍后...').prop('disabled', true);
	}

	// 提交按钮转换为初始状态
	api.sub2init = function() {
		el.getSubbtn().text('登 录').prop('disabled', false);
	}
	api.el = el;
	return api;
})()

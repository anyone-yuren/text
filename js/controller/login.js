APP.controller.login = (function() {
	var api = {},cmCtrl,thisView;
	api.start = function() {
		cmCtrl = APP.controller.common;
		thisView = APP.view.login;
		APP.view.login.loadBody(function() {
			addEvent();
			refreshValidCode();
		})
	}
	
	//页面点击事件
	function addEvent() {
		var dt = 'click';
		$("button[type = 'submit']").on(dt,dologin);
		thisView.el.getValidImg().on(dt, refreshValidCode);
	}
	
		// 刷新验证码
	function refreshValidCode() {
		thisView.setValidImgSrc(cmCtrl.getValidCodeImg());
	}
	
	function dologin(e) {
		e.preventDefault();
		var data = [];
		$.each($('#loginForm').serializeArray(),function(index,node) {
			data[node.name] = node.value;
		});
		thisView.sub2waiting();
		$.ajax({
			type:"get",
			url: cmCtrl.getUrl('dologin'),
			param:data,
			success:function(ret) {
				console.log(ret);
				if (ret.code == 0) {
					thisView.setTipmsg(ret.msg);
					//保存用户的userId
					cmCtrl.addCookie('userId',ret.data.userId,7,'/');
					return;
					location.href = APP.config.paths + '/page/admin.html';
				} else if (ret.code == 1) {
					thisView.setTipmsg(ret.msg);
					// location.href = APP.config.path + '';
				} 
			},
			error:function(e){
				console.log(e);
			},
			complete: function() {
				thisView.sub2init();
			}
		});
		//do some other
	}
	return api;
})()

APP.view.rightBody = (function() {
	var api = {};
	api.loadBody = function(callback) {
			$('#header').html(APP.view.common.getHeader({'icon':'glyphicon-user','text':'账户信息'}));
	}
	api.userinfoList = function(list) {
		var content = [];
		var data = {
			"userName":"用户名称",
			"password":'用户密码',
			"dasf":'测试'
		}
		$.each(list,function(name,value) {
			var dataName = data[name]; 
			if (name=='userId'||dataName == undefined) {
				//过滤填出循环
				return true;
			}
			content.push([
				'<div class="row"><div class="col-xs-2">'+dataName+':</div><div class="col-xs-10">'+value+'</div></div>'
			])
		})
		return content;
	}
	return api;
})()

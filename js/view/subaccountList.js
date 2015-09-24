APP.view.subaccountList = (function() {
	var api = {};
	api.loadBody = function(callback) {
		$(document.body).load('../page/c_subaccountList.html',function() {
			$('#header').html(APP.view.common.getHeader({icon:'glyphicon-user',text:'子账户信息'}));
			callback.call(this);
		})
	}
	return api;
})()

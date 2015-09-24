APP.view.cashierList = (function() {
	var api  = {};
	
	api.loadBody = function(callback) {
	$(document.body).load(APP.paths + '/page/c_cashier_list.html',function() {
			$("#header").html(APP.view.common.getHeader({'text':'收银员信息','icon':'glyphicon-usd'}))
			callback.call(this);
		})
	}
	return api;
})()

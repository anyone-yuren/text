APP.view.cashToday = (function() {
	var api ={};
	
	api.loadBody = function(callback) {
		$(document.body).load(APP.paths+'/page/c_cash_today_list.html',function() {
			$("#header").html(APP.view.common.getHeader({'text':'当日流水','icon':'glyphicon-usd'}));
			callback.call(this);
		})
	}
	return api;
})()

APP.view.cashHistory = (function() {
	var api ={};
	
	api.loadBody = function(callback) {
		$(document.body).load(APP.paths+'/page/c_cash_history_list.html',function() {
			$("#header").html(APP.view.common.getHeader({'text':'历史流水','icon':'glyphicon-usd'}));
			callback.call(this);
		})
	}
	return api;
})()

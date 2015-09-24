APP.view.reportHistory = (function() {
	var api ={};
	
	api.loadBody = function(callback) {
		$(document.body).load(APP.paths+'/page/c_report_history_list.html',function() {
			$("#header").html(APP.view.common.getHeader({'text':'历史报表','icon':'glyphicon-book'}));
			callback.call(this);
		})
	}
	return api;
})()

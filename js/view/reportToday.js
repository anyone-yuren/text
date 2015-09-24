APP.view.reportToday = (function() {
	var api ={};
	
	api.loadBody = function(callback) {
		$(document.body).load(APP.paths+'/page/c_report_today_list.html',function() {
			$("#header").html(APP.view.common.getHeader({'text':'当日报表','icon':'glyphicon-book'}));
			callback.call(this);
		})
	}
	return api;
})()

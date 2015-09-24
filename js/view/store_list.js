APP.view.store_list = (function() {
	var api = {};
	
	api.loadBody = function(callback) {
		$(document.body).load(APP.paths + '/page/c_store_list.html', function() {
			$("#header").html(APP.view.common.getHeader({'text':'门店信息','icon':'glyphicon-home'}))
			callback.call(this);	
		});
	}
	
	return api;
})() 

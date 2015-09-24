APP.view.admin = (function() {
	var api = {};
	api.loadBody = function(callback) {
		$(document.body).load(APP.paths + '/page/c_admin.html', function() {
			callback.call(this);
		});
	}
	return api;
})();
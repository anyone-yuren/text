APP.controller.cashierAdd = (function() {
	var  api = {};
	api.start = function() {
		addEvent()
	}
	function addEvent() {
		var  dt = "click";
		$('#back').on(dt,function() {
			ichain.invokeParent('APP.controller.admin.childCallChangeUrl',{page:'cashier_list.html'});
		});
	}	
	return api;
})()

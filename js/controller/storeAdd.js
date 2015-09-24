APP.controller.storeAdd = (function() {
	var  api = {};
	api.start = function() {
		addEvent()
	}
	function addEvent() {
		var  dt = "click";
		$('#back').on(dt,function() {
			ichain.invokeParent('APP.controller.admin.childCallChangeUrl',{page:'store_list.html'});
		});
	}	
	return api;
})()

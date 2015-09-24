APP.controller.rightBody = (function() {
	var api = {},cmCtrl,thisView;
	api.start = function() {
		cmCtrl = APP.controller.common;
		thisView = APP.view.rightBody;
		thisView.loadBody();
		
		addEvent();
	}
	function addEvent() {
		var userConfig = cmCtrl.doAjax({"userId":cmCtrl.getCookieValue("userId")},cmCtrl.getUrl("getConfig"));
		var userinfo = thisView.userinfoList(userConfig.data);
		$('.panel-body').html(userinfo.join(''));
	}
	return api;
})()

APP.controller.admin = (function() {
	var api = {},cmCtrl;

	api.start = function() {
		cmCtrl = APP.controller.common;
		APP.view.admin.loadBody(function() {
			addEvent();
			api.loadConfig();
		});
	}
	
	api.childCallChangeUrl = function(obj) {
		
		$('#centerIframe').attr('src',obj.page);
		
	};
	addEvent = function() {
		var dt = 'click';
		$('.panel-west .toggle').on(dt, togglePanelWest);
		$('.list-group .list-group-item').on(dt, loadIframe);
	}
	//加载用户信息
	api.loadConfig = function() {
//		var userConfig = cmCtrl.doAjax({"userId":cmCtrl.getCookieValue("userId")},cmCtrl.getUrl("getConfig"));
		
	}
	//点击加载不同的iframe
	function loadIframe() {
		var me = $(this);
		if(me.hasClass("active")) {
			return;
		}
		me.addClass("active").siblings().removeClass("active");
		me.parents('.panel').siblings().find('.list-group .list-group-item').removeClass('active');
		var url =  me.data('url');
		$("#centerIframe").attr('src', url);
	}
	
	// 左侧面板展开或收起
	function togglePanelWest() {
		var me = $(this),
			pl = me.parent(),
			pc = $('.panel-center'),
			flag = me.hasClass('right');
		pl.animate({
			left: !flag ? -pl.width() : 0
		}, 300, function() {
			me.toggleClass('right');
		});
		pc.animate({
			left: !flag ? 0 : pl.width()
		}, 300);
	}
	return api;
})();
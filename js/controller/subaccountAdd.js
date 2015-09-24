APP.controller.subaccountAdd = (function() {
	var api = {};
	api.start = function() {
		addEvent();
	}
	var timer = null;
	function addEvent() {
		var dt = 'click';
		
//		返回
		$('#back').on(dt,function() {
			ichain.invokeParent('APP.controller.admin.childCallChangeUrl',{page:'subaccount_list.html'})
		})
		$('#choiseList').on(dt,'a',deleteDom);
		
		$('#changeList').on(dt,'a',deleteDom);
	}
	
	function deleteDom() {
		var me = $(this);
		if (this.click) {
			this.click = false;
			window.clearTimeout(timer);
			me.addClass('slide');
			var atext = me.text(),
				content = [];
			content.push('<a class="list-group-item text-center">'+atext+'</a>');
			var aList = $('#changeList a').length,
				clist = $('#choiseList a').length,
				parentId = $(this).parent('.list-group')[0].id;
				
			if (parentId == "choiseList") {
				!aList?$('#changeList').html(content):$('#changeList').append(content);
				
				if (!(clist-1)) {
					$('#choiseList').append('请添加'); 
				}
			}else{
				!clist?$('#choiseList').html(content):$('#choiseList').append(content);	
				if (!(aList-1)) {
					$('#changeList').append('请添加'); 
				}
			}
			var thisme = this;
			timer = window.setTimeout(function() {
				me.remove();
				thisme.click = true;
			},300)
		}
	}
	return  api;
})()

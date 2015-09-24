APP.controller.cashierList = (function() {
	var  api = {},thisView,cmCtrl;
	api.start = function() {
		thisView = APP.view.cashierList;
		cmCtrl = APP.controller.common;
		thisView.loadBody(function() {
			addEvent();
			initTable('storelist','../data/table2.json');
		})
	}
	function addEvent() {
		var  dt = "click";
		$('#add').on(dt,function() {
			ichain.invokeParent('APP.controller.admin.childCallChangeUrl',{page:'cashier_add.html'});
		});
		
		//点击修改提交
		$('#update').on(dt,function(event) {
			var data = {};
			event.preventDefault();
			$.each($('#editform').serializeArray(), function(index, node) {
				data[node.name] = node.value;
			});
			data.userId = rowData.id;
			data.status = sts;
			//确认修改
			var rps = cmCtrl.doAjax(data,cmCtrl.getUrl('update'));
			if(rps){
				$('#myModal').modal('hide');
				 table.bootstrapTable('updateRow', {
	                index:rowIndex,  
	                row: data
	            });
	            console.log(data);
			}
		});
		//点击改变状态
		$('#dropmenu1 li').on(dt,function() {
			var $this = $(this);
			sts = $this.find('a').data('index');
			$this.parent('ul').prev().html($this.text()+'<span class="caret"></span>');
		})
	}
	
	//初始化表格数据
	function initTable(dom,url) {
		table = $('#'+dom).bootstrapTable({
            method: 'get',
            url: url,
            cache: false,
            striped: true,
            pagination: true,
            sidePagination:'server',
            queryParams: queryParams,//参数
            pageNumber:1,
            pageSize: 10,
            showColumns: true,
            minimumCountColumns: 2,
            clickToSelect: true,
            detailView:true,
            detailFormatter:detailformatter,
            columns: [
//          {
//              field: 'state',
//              checkbox: true
//          }, 
            {
                field: 'id',
                title: '门店编号',
                align: 'center',
                valign: 'middle',
//              sortable: true
            }, {
                field: 'name',
                title: '门店名称',
                align: 'center',
                valign: 'middle',
//              sortable: true
            }, {
                field: 'basestore',
                title: '所属商户',
                align: 'center',
                valign: 'middle',
//              sortable: true
            }, {
                field: 'storeappid',
                title: '门店APPId',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'linkman',
                title: '联系人',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'status',
                title: '状态',
                align: 'center',
                valign: 'middle',
//              sortable: true
            }, {
                field: 'operate',
                title: '操作',
                align: 'center',
                valign: 'middle',
                clickToSelect: false,
                formatter: operateFormatter,
                events: operateEvents
            }]
        });
	};
	function queryParams(params) {
	  return params
	};
	 function operateFormatter(value, row, index) {
        return [
            '<a class="like btn btn-warning" href="javascript:void(0)" title="详情">',
                '<i class="glyphicon glyphicon-book"></i>',
            '</a>',
            '<a class="edit ml10 btn btn-info" href="javascript:void(0)" title="编辑">',
                '<i class="glyphicon glyphicon-edit"></i>',
            '</a>',
            '<a class="remove ml10 btn btn-danger" href="javascript:void(0)" title="删除">',
                '<i class="glyphicon glyphicon-remove"></i>',
            '</a>'
        ].join('');
    }

    window.operateEvents = {
        'click .like': function (e, value, row, index) {
        	rowData = row,rowIndex = index;
            var $this = $(this);
            $this.parents('tr').find('.detail-icon').trigger('click');
        },
        'click .edit': function (e, value, row, index) {
        	rowData = row,rowIndex = index;
            //加载要修改的数据
            $('#myModal').modal('show').on('shown.bs.modal', function (e) {
			 	 $.each($('#editform').serializeArray(), function(index, node) {
					$('input[name='+node.name+']').val(row[node.name]);
				});
			})
        },
        'click .remove': function (e, value, row, index) {
        	rowData = row,rowIndex = index;
        	var ids = row.id;
            table.bootstrapTable('remove', {
                field: 'id',  
                values: [ids] 
            });
            
            //将数据段id发送后台，删除数据
            if (cmCtrl.doAjax({'id':ids},cmCtrl.getUrl("remove"))) {
            	//刷新表格
            	$("button[name='refresh']").trigger('click');
            }else{
            	alert('删除数据失败');
            }
            
        }
    };
	// 详情面板内容
    function detailformatter(index, row) {
    	var html = [];
        $.each(row, function (key, value) {
            html.push('<p><b>' + key + ':</b> ' + value + '</p>');
        });
        return html.join('');
    }
	return api;
})()

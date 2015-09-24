;(function($,window,document,undefined){
     //定义构造函数
     var CustomGrid=function(ele,opt){
         this.$element=ele; //最外层对象
         this.defaults={
             url:''
         },
         this.options=$.extend({},this.defaults,opt );
         this.init();
     }
     //给构造函数添加方法
     CustomGrid.prototype={
     	var me = this;
		init:function() {
			console.log(me.options);
		}
         
        
     }

     //在插件中使用windowObj对象的方法，0为vertical，1为horizontal
     $.fn.customGrid=function(options){
         //创建实体
         var grid1=new CustomGrid(this,options);
     }
 })(jQuery,window,document); 
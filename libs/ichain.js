// iframe chain 1.0
window.ichain = (function() {
	var api = {},
		store = {
			iframeIds: [],
			iframeCount: 0,
			childReadyCallback: null, // 记录onChildReady(fn)里面的fn
			childrenReadyCallback: null, // 记录onChildrenReady(fn)里面的fn
			callbacks: {} // 保存方法的回调函数，格式为：{方法名:fn}
		};

	/*window.onload = function() {
		api.defaultNoticeParent();

		var iframes = document.getElementsByTagName('iframe');
		store.iframeCount = iframes.length;
		api.childrenReady();
	}*/

	// 去掉空格
	api.trim = function(str) {
		return str.replace(/[ ]/g, "");
	}

	// 判断浏览器是否为IE，参数为IE的版本，取值正整数
	api.isIE = function(number) {
		var browser = navigator.appName; // 浏览器名称
		var b_version = navigator.appVersion; // 浏览器版本
		var version = b_version.split(";"); // IE的版本有分号隔开，此处切割成数组
		if (!number && browser == "Microsoft Internet Explorer") {
			// 不传参数则表示只判断是否为IE，也可用jquery的方法$.browser.msie;
			return true;
		} else if (version[1]) {
			// 传参表示判断IE的版本
			var trim_version = this.trim(version[1]);
			if (trim_version == "MSIE" + number + ".0") {
				return true;
			} else {
				return false;
			}
		} else {
			// 不满足条件表示不为IE
			return false;
		}
	}

	api.get = function(id) {
		return document.getElementById(id);
	}

	// 获取iframe的window对象 get content window
	api.getContentWindow = function(domorid) {
		var dom, cid;
		if (typeof domorid === 'string') {
			// domorid is id
			dom = this.get(domorid);
			cid = domorid;
		} else {
			// domorid is dom
			dom = domorid;
			cid = domorid.id;
		}
		if (!dom) return null;
		if (dom.tagName.toUpperCase() != 'IFRAME') throw new Error('ID为${0}的元素必须是iframe'.mix([cid]));
		if (this.isIE(9)) { // ie9 dom.document有值、但是不支持document.frames或window.frames
			return dom.contentWindow;
		}
		return !dom.document ? dom.contentWindow : document.frames(cid);
	}

	api.mix = function(str, group) {
		return str.replace(/\$\{[^{}]+\}/gm, function(m, n) {
			n = m.slice(2, -1);
			return (group[n] != void 1) ? group[n] : '';
		});
	}

	// '我叫${0},今年${1}岁了。'.mix(['jack', 18]);
	// '我叫${name},今年${age}岁了。'.mix({name:'jack', age:18});
	/*String.prototype.mix = function(group) {
		return api.mix(this, group);
	}*/

	// 循环
	function forEach(obj, fn) {
		var i = 0,
			len = obj.length;
		if (obj instanceof Array) {
			for (; i < len; i++) {
				if (fn.call(obj[i], i, obj[i]) == false) break; // 函数中如果有return false，则终止循环
			}
		} else {
			for (i in obj) {
				if (fn.call(obj[i], i, obj[i]) == false) break;
			}
		}
	}

	api.forEach = forEach;

	// 获取iframe页面对应iframe的id
	function getCurrentPageIframeId() {
		var iframes = parent.document.getElementsByTagName('iframe');
		for (var i = 0, len = iframes.length; i < len; i++) {
			if (api.getContentWindow(iframes[i]) == self) {
				return iframes[i].id;
			}
		}
		return -1;
	}

	api.defaultChildReady = function(id) {
		store.iframeIds.push(id);
		this.childrenReady();
	}

	// 子页面通知父页面加载完成
	api.childReady = function(id, obj) {
		if (id != -1) {
			store.childReadyCallback.call(this, id, obj);
		}
	}

	// 单个子页面加载完成回调父页面
	api.onChildReady = function(fn) {
		store.childReadyCallback = fn;
	}

	// 如果所有子页面加载完成，则回调onChildrenReady方法
	api.childrenReady = function() {
		if (store.iframeCount && store.iframeCount == store.iframeIds.length) {
			store.childrenReadyCallback.call(this);
		}
	}

	// 所有子页面加载完成回调父页面
	api.onChildrenReady = function(fn) {
		store.childrenReadyCallback = fn;
	}

	api.defaultNoticeParent = function() {
		if (self != parent) {
			try {
				parent.ichain.defaultChildReady(getCurrentPageIframeId());
			} catch (e) {}
		}

	}

	/// 子页面通知父页面加载完成
	api.noticeParent = function(obj) {
		if (self != parent) {
			try {
				parent.ichain.childReady(getCurrentPageIframeId(), obj);
			} catch (e) {}
		}
	}

	// 添加回调函数
	api.addCallback = function(methodName, callback) {
		store.callbacks[methodName] = callback;
	}

	// 通过methodName获取回调函数
	api.getCallback = function(methodName) {
		return store.callbacks[methodName];
	}

	/**
	 * 调用父页面
	 * @param {String}
	 * @param {Object/Array}
	 * @param {Function}
	 * @return
	 */
	api.invokeParent = function(methodName, args, callback) {
		args = args || [];
		if (typeof args === 'function') {
			callback = args;
			args = [];
		}
		if (self == parent) {
			throw new Error('当前页面不存在父页面！');
		}
		if (callback) {
			parent.ichain.addCallback(methodName, callback);
		}

		return multiLevelInvoke(parent, methodName, args);
	}

	/**
	 * 调用子页面方法
	 * @param {String} iframe id
	 * @param {String} 方法名
	 * @param {Object/Array} 参数，可选
	 * @param {Function} 回调函数，可选
	 * @return
	 */
	api.invokeChild = function(iframeId, methodName, args, callback) {
		args = args || [];
		if (typeof args === 'function') {
			callback = args;
			args = [];
		}
		var childPage = this.getContentWindow(iframeId);
		if (!childPage) {
			throw new Error(this.mix('iframeId为${0}的子页面不存在！', [iframeId]));
		}
		if (callback) {
			childPage.ichain.addCallback(methodName, callback);
		}

		return multiLevelInvoke(childPage, methodName, args);
	}

	// 对象多级调用
	function multiLevelInvoke(invokeObj, methodName, args) {
		var ret;
		var mode = args instanceof Array ? 'apply' : 'call'; // instanceof to .constructor
		forEach(methodName.split('.'), function(i, str) {
			if (!invokeObj[str]) throw new Error('调用出错！');
			if (typeof invokeObj[str] === 'function') {
				ret = invokeObj[str][mode](this, args);
				return false;
			} else if (typeof invokeObj[str] === 'object') {
				invokeObj = invokeObj[str];
			}
		});
		return ret;
	}

	// 方法回调
	api.callback = function(methodName) {
		var callback = this.getCallback(methodName);
		if (!callback) throw new Error(this.mix('${0}方法找不到回调函数！', [methodName]));
		var arr = Array.prototype.slice.call(arguments, 0); // arguments对象转换成数组
		arr.shift(); // 删除数组第一项，即methodName参数
		callback.apply(this, arr);
	}

	return api;
})();
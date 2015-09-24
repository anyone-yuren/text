APP.view = {};
APP.view.common = (function() {
	var api = {};
	
	api.getHeader = function(obj) {
		return ["<nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">",
"					<div class=\"container-fluid\">",
"						<div class=\"navbar-header\">",
"							<a class=\"navbar-brand\" href=\"#\"><span style=\"color: limegreen; font-size: 30px;\" class=\"glyphicon "+obj.icon+"\"></span></a>",
"						</div>",
"						<div class=\"collapse navbar-collapse\">",
"							<h3>"+obj.text+"</h3>",
"						</div>",
"					</div>",
"				</nav>"].join("");
	}
	return api;
})();
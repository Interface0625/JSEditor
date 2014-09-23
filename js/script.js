function xhrGet(reqUri, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", reqUri, true);
	xhr.onload = callback;
	xhr.send();
}
function openCode(url){
	if(!url) return;
	xhrGet(url, function(){
		cm.doc.setValue(this.responseText);
	})
}

var init_jstreeContainer = function(){
	var treeData = [];
	$(function() {
		$('#jstreeContainer').jstree({ 'core' : {
			"data" : function(o, cb){
				var self = this;
					xhrGet("jstreedata.json", function(){
						treeData = JSON.parse(this.responseText)
						cb.call(self, treeData);
				});
			}
		} });
	$('#jstreeContainer')
		.on('changed.jstree', function (e, data) {
			for(var i = 0; i < treeData.length; i++){
				var id = data.selected[0];
				if(treeData[i]["id"] === id){
					var url = treeData[i]["url"];
					openCode(url);
				}
			}
		})
	});
}
var init_CodeMirror = function(){
	cm = CodeMirror.fromTextArea(
		document.getElementById("code"), {
			lineNumbers: true,
			mode: "javascript",
			theme: "mbo"
	});
}

var init = function(){
	init_jstreeContainer();
	init_CodeMirror();
}
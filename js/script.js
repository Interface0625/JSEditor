function xhrGet(reqUri, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", reqUri, true);
	xhr.onload = callback;
	xhr.send();
}
function showHideTreeview(){
	d = document.getElementById("fileContainer");
	if(d.style["display"] == "block"){
		d.style["display"] = "none";
	}else{
		d.style["display"] = "block";
	}
}
function openCode(url){
	if(!url) return;
	xhrGet(url, function(){
		console.log("opening file: " + url)
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
	//EVENT:
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
	// EVENT:
	cm.on("change", function(sender, obj){
		console.log(obj);
	});
}

var init = function(){
	init_jstreeContainer();
	init_CodeMirror();
}
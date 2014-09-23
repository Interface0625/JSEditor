function xhrGet(reqUri, callback) {
	    var xhr = new XMLHttpRequest();
	    xhr.open("GET", reqUri, true);
	    xhr.onload = callback;
	    xhr.send();
	}
	function openCode(url){
			console.log("fetching gile" + url);

		if(!url) return;
		xhrGet(url, function(){
			cm.doc.setValue(this.responseText);
		})
	}



	var init = function(){
		console.log("hej");
		var treeData = [];
		$(function() {
	  		$('#container').jstree({ 'core' : {
	  		 	"data" : function(o, cb){
	  		 		var self = this;
	  		 		xhrGet("data/folder_list.json", function(){
	  		 			treeData = JSON.parse(this.responseText)
	  		 			cb.call(
	  		 				self, 
	  		 				treeData
              			);
	  		 		});
	  			}
	  		} });



	  		///
			$('#container')
			  // listen for event
			  .on('changed.jstree', function (e, data) {
			   	//1console.log(data);
			   	//1console.log(e);
			   	for(var i = 0; i < treeData.length; i++){
			   		var id = data.selected[0];
			   		if(treeData[i]["id"] === id){
			   			var url = treeData[i]["url"];
			   				console.log(treeData[i]["url"])
			   			openCode(url);
			   		}
			   	}
			  })
		});
		//
		cm = CodeMirror.fromTextArea(
			document.getElementById("code"), {
        		lineNumbers: true,
        		mode: "javascript",
        		theme: "mbo"
    	});
	}
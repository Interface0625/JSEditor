// Directory List
function xhrGet(reqUri, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", reqUri, true);
    xhr.onload = callback;
    xhr.send();
}

var DirectoryList = {
	ls: function(path, callback){
		xhrGet(path, function(){
			callback(this.responseText);
		});
	}

};

var View = {
	makeList: function(obj){
		for ( key in obj ){
			console.log(key);
			console.log(obj[key]);
		}
	}
};


makeFileDiv = function(path){
	var div = document.createElement("div");
	div.class = "file";
	
	var img = document.createElement("img");
	img.src = "images/file.png";
	img.class = "fileIcon";
	
	var p = document.createElement("p");
	p.innerText = "path";

	var container = document.getElementById("fileContainer");

	div.appendChild(img);
	div.appendChild(p);
	container.appendChild(div);
}

// Tests
//test = DirectoryList
/*test.ls("/ls?/", function(args){
	console.log(args);
	View.makeList(JSON.parse(args));
});*/
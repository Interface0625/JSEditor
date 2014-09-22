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

// Tests
test = DirectoryList
test.ls("/ls?/", function(args){
	console.log(args);
	View.makeList(JSON.parse(args));
});
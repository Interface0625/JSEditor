
import os, json
itm = { 	
	"id" : "ajson4", 
	"parent" : "ajson2", 
	"text" : "Child 2", 
	"icon" : "res/images/file.png" , 
	"url": "js/script.js" 
}

class jstree():

	def __init__(self, path = "./"):
		self.root = os.path.abspath(path)
		self.items = []

	def gen_path_parrent(self, path):
		path = os.path.abspath(path)
		path = path.replace(self.root, "");
		if os.path.split(path)[0] == self.dataRoot:
			parrent = "#"
		else:
			parrent = os.path.split(path)[0][1:]
		path = path[1:]
		name = os.path.split(path)[-1]
		print(parrent)
		print(path)
		print(name)
		return (name, path, parrent)

	def append_dir(self, path):
		name, path, parrent = self.gen_path_parrent(path)
		item = {
			"id" : path, 
			"parent" : parrent, 
			"text" : name, 
			"icon" : "res/images/folder.png"
		}
		self.items.append(item)

	def append_file(self, path):
		name, path, parrent = self.gen_path_parrent(path)
		item = {
			"id" : path, 
			"parent" : parrent, 
			"text" : name, 
			"icon" : "res/images/file.png",
			"url": path
		}
		self.items.append(item)



	def generate_jstree(self, path = "./data"):
		if os.path.abspath(path) == self.root:
			self.dataRoot = "/"
		else:
			self.dataRoot = os.path.abspath(path).replace(self.root, "")

		for r, dirs, files in os.walk(path):
			for d in dirs:
				self.append_dir( os.path.join(r, d) )
			for f in files:
				self.append_file( os.path.join(r, f) )
		return json.dumps(self.items);

if __name__ == '__main__':
	j = jstree().generate_jstree()
	#for itm in json.loads(j):
	#	print(itm)
	open("jstreedata.json", "w").write(j)
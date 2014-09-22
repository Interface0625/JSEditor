# 
import os, time, json
import BaseHTTPServer


class Handler(BaseHTTPServer.BaseHTTPRequestHandler):
	def do_GET(self): self.wfile.write(self.switch())

	def switch(self):
		if self.path == '/' or self.path == '/index.html': 	return open('index.html').read()
		elif self.path == '/DirectoryList/script.js':		return open('DirectoryList/script.js').read()
		elif self.path.startswith('/images/'):				return self.openFile(self.path)
		elif self.path.startswith('/ls?'):					return self.ls(self.path.replace('/ls?', ''))
		elif self.path.startswith('/openFile?'):			return self.openFile(self.path.replace('/openFile?', ''))
		

	def ls(self, path):
		if '../' in path: 				return '{"error": "path not allowed ../"}'
		if not path.startswith('/'): 	path = '/' + path
		if not path.startswith('.'): 	path = '.' + path 
		for r,d,f in os.walk(path): 	return json.dumps({ 'root': r, 'dirs': d, 'files': f })
			
	def openFile(self, path):
		print(path)
		if os.path.exists(path):		return open(path).read()
		else:							return '{"error": "File not found."}'


if __name__ == '__main__':
	HOST_NAME = ''
	PORT_NUMBER = 8080
	server_class = BaseHTTPServer.HTTPServer 
	httpd = server_class((HOST_NAME, PORT_NUMBER), Handler)
	print time.asctime(), "Server Starts - %s:%s" % (HOST_NAME, PORT_NUMBER)
	try:
		httpd.serve_forever()
	except:
		print('ERROR: ' + e)
	httpd.server_close()
	print time.asctime(), "Server Stops - %s:%s" % (HOST_NAME, PORT_NUMBER)

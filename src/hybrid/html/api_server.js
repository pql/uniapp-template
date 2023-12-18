const http = require('http');

const url = "http://d11he24itru2mu.cloudfront.net/2022-09-19-253b095b-085f-40af-bc76-752938de62e3.pdf";
const port = 8001;

const server = http.createServer((req, res) => {
	console.log(`${req.method} ${req.url}`);
	res.setHeader("Access-Control-Allow-Origin", "*");
	// res.setHeader('Content-Type', 'application/octet-stream');
	if (req.url === '/api/pdfData' && req.method === 'GET') {
		http.get(url, function(resp) {
			var chunks = []; //用于保存网络请求不断加载传输的缓冲数据
			var size = 0; //保存缓冲数据的总长度
			resp.on('data', function(chunk) {
				chunks.push(chunk); //在进行网络请求时，会不断接收到数据(数据不是一次性获取到的)，
				size += chunk.length; //累加缓冲数据的长度
			});

			resp.on('end', function(err) {
				var data = Buffer.concat(chunks, size); //Buffer.concat将chunks数组中的缓冲数据拼接起来，返回一个新的Buffer对象赋值给data
				// console.log(Buffer.isBuffer(data));　　　　//可通过Buffer.isBuffer()方法判断变量是否为一个Buffer对象
				// var base64Img = data.toString('base64');　　//将Buffer对象转换为字符串并以base64编码格式显示
				// console.log(base64Img);　　 //进入终端terminal,然后进入index.js所在的目录，
				res.end(data);
			});
		});
	}
});

server.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});

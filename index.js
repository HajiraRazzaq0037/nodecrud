var http = require('http');
var fs = require('fs');

const resData = fs.readFileSync(`./data.json`, 'utf-8');

http.createServer(function (req, res) {
    if (req.url === '/' || req.url === `/get`) {
        res.writeHead(200, {
            'content-type': 'application/json',
        })
        // resData = JSON.parse(resData);
        res.end(resData);

    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 not found</h1>');
    }
}).listen(3000,()=>{
    console.log("server is listening on 3000 port");
});
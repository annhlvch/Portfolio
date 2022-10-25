const http = require('http');
const fs = require('fs');

let todos = [];

const requestListener = function (req, res) {
    console.log(req.method);
    console.log(req.url);
    if (req.method == 'GET' && (req.url == '/' || req.url == '/index.html')) {
        fs.readFile('./front/index.html', function (err, html) {
            if (err) {
                throw err; 
            }       
            res.writeHeader(200, {"Content-Type": "text/html"});  
            res.write(html);  
            res.end();  
        });
    } else if (req.method == 'GET' && req.url == '/js/front.js') {
        fs.readFile('./front/js/front.js', function (err, html) {
            if (err) {
                throw err; 
            }       
            res.writeHeader(200, {"Content-Type": "text/javascript"});  
            res.write(html);  
            res.end();  
        });
    } else if (req.method == 'GET' && req.url == '/css/style.css') {
        fs.readFile('./front/css/style.css', function (err, html) {
            if (err) {
                throw err; 
            }       
            res.writeHeader(200, {"Content-Type": "text/css"});  
            res.write(html);  
            res.end();  
        });
    } else if (req.method == 'POST' && req.url == '/api/todos') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            const todo = JSON.parse(data).todo;
            todos.push(todo);
            res.end(JSON.stringify({success: true}));
        });
    } else if (req.method == 'GET' && req.url == '/api/todos') {
        res.writeHeader(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({todos: todos}));
    }
}


const server = http.createServer(requestListener);
server.listen(8080);


// function aaa() {}
// aaa()

// const bbb = function () {}
// bbb()
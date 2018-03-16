var http = require('http');
var router = require('./router.js');

const serverIp = '127.0.0.1';
const serverPort = 1337;

http.createServer(function (request, response) {
    router.home(request, response);
    router.user(request, response);
}).listen(serverPort, serverIp);

console.log(`Server running at 'http://${serverIp}:${serverPort}/'`);
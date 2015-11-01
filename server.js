var http = require('http');
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/index.html');

var port = process.env.PORT || 8000;

function handler(request, response) {
  var url = request.url;
  
  if (url.length === 1) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(index)
  } else if (url.indexOf('/cat') > -1) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end('<img src="http://charts.stocktwits.com/production/original_24310845.jpg?1404265667"/>')
  } else {
    fs.readFile(__dirname + url, function(err, file){
      if (err){
        response.end();
      } else {
        var ext = url.split('.')[1];
        response.writeHead(200, {'Content-Type' : 'text/' + ext});
        response.end(file);
      }
    }
  }
}

http.createServer(handler).listen(port);

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');

server.listen(process.env.PORT || 3000, function(){
  console.log('listening on port 8080');
});

app.use(express.static(path.join(__dirname, '')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index-2.html');
});
app.get('/pf', function(req, res){
  res.sendFile(__dirname + '/portfolio-2.html');
});
app.get('/apply', function(req, res){
  res.sendFile(__dirname + '/apply.html');
});
app.get('/team', function(req, res){
  res.sendFile(__dirname + '/team.html');
});
app.get('/about', function(req, res){
  res.sendFile(__dirname + '/about-us.html');
});






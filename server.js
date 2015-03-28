var fs = require('fs');
var hbs = require('hbs');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');

hbs.registerPartials(__dirname + '/partials');

server.listen(process.env.PORT || 3000, function(){
  console.log('listening on port 3000');
});

app.set('view engine', 'hbs');
app.set('views', __dirname + '');
app.use(express.static(path.join(__dirname, '')));

app.get('/', function(req, res){
  res.render('index-2');
});
app.get('/pf', function(req, res){
  res.render('portfolio-2');
});
app.get('/apply', function(req, res){
  res.render('apply');
});
app.get('/team', function(req, res){
  res.render('team');
});
app.get('/about', function(req, res){
  res.render('about-us');
});






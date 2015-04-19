var fs = require('fs');
var hbs = require('hbs');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

hbs.registerPartials(__dirname + '/partials');

server.listen(process.env.PORT || 3000, function(){
  console.log('listening on port 3000');
});

app.set('view engine', 'hbs');
app.set('views', __dirname + '');
app.use(express.static(path.join(__dirname, '')));
app.use(bodyParser.urlencoded({ extended: false }))

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
app.get('/contact', function(req, res){
  res.render('contact');
});

app.post('/contact', function (req, res){
	console.log(req.body);
	var transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	        user: 'nshvptech@gmail.com',
	        pass: process.env.GMAIL_PASS
	    }
	});
	transporter.sendMail({
	    from: req.body.email,
	    to: 'gregwcmkim@gmail.com',
	    subject: 'Message from Contact Form',
	    text: 'The following message is from the "Contact Us" form on northwesternstudentholdings.com.\nFrom: ' + req.body.email + '\nSubject: ' + req.body.subject + '\nMessage: ' +  req.body.message
	});
	res.render('contact');
});






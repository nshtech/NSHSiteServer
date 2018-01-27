var fs = require('fs');
var hbs = require('hbs');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var ipn = require('paypal-ipn');

hbs.registerPartials(__dirname + '/partials');

server.listen(process.env.PORT || 18290, function(){
  console.log('listening on port 18290');
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
	    to: 'tech@studentholdings.org',
	    subject: 'Message from Contact Form',
	    text: 'The following message is from the "Contact Us" form on northwesternstudentholdings.com.\nFrom: ' + req.body.email + '\nSubject: ' + req.body.subject + '\nMessage: ' +  req.body.message
	});
	res.render('contact');
});

var transporter = nodemailer.createTransport();

app.post('/ipn', function(req, res) {
  res.send(200);
  console.log(req);

  var transporter = nodemailer.createTransport();

  params = req.body;

      transporter.sendMail({
        from: 'mhong19414@gmail.com',
        to: 'hong@u.northwestern.edu',
        subject: 'IPN Post',
        text: 'At least it posted'
      });

  ipn.verify(params, {'allow_sandbox': true}, function callback(err, msg) {
    if (err) {
      console.error(err);
    } else {
      console.log(params)

      transporter.sendMail({
		    from: 'mhong19414@gmail.com',
		    to: 'hong@u.northwestern.edu',
		    subject: 'IPN Test',
		    text: JSON.stringify(params)
		  });

      if (params.payment_status == 'Completed') {
        // Payment has been confirmed as completed
      }
    }
  });
});

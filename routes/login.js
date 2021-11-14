// -------------- load packages -------------- //
var cookieSession = require('cookie-session');
var express = require('express');
var app = express();
const router = express.Router();

var https = require('https');
var hbs = require('hbs');
app.set('view engine','hbs');

var mysql = require('mysql');

// ------------- define endpoints ----------- //
router.get('/', function(req, res){
    if('authenticated' in req.session){
		var c_user = "Welcome, "+req.session.profile.first_name;
		res.render('homepage', {login: "Log Out", go_to: "./logout", user: c_user});
    }
    else{
		res.render('homepage', {login: "Join Us", go_to: "./signup", user:"Welcome!"});
    }
});

router.get('/login', function(req, res){
    res.render('loginform', {message: "Log in here!"});
});

router.get('/signup', function(req, res){
	res.render('signupform', {message: ""});
});
router.get('/login_worker', function(req, res){
	console.log("I got here");
	var sql="CALL addUser(?, ?, ?, ?);";
	res.app.locals.pool.query(sql, [req.query.email, req.query.password, req.query.fname, req.query.lname], function(error, results, fields){
		console.log(results);
		if(results[0]===undefined){
			res.render('loginform', {message: "Login/Sign Up failed, please try again."});
		}
		else{
			req.session.profile = results[0][0];
			req.session.balance = req.session.profile.dollars;
			req.session.authenticated = true;
			res.cookie('balance', req.session.balance);
			res.redirect('./');
		}
	});
});

router.get('/logout', function(req, res){
	console.log("Logging out.");
	delete req.session.authenticated;
	delete req.session.profile;
	res.redirect('./');
});

module.exports=router;
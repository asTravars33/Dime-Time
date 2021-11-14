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
router.get('/resources', function(req, res){
	if('authenticated' in req.session){
			res.render('resources', {go_to: "./logout", login: "Log Out"});
		}
	else{
		res.render("login", {message: "Please log in or sign up."});
	}
});

router.get('/learning', function(req, res){
	if('authenticated' in req.session){
			res.render('learning', {go_to: "./logout", login: "Log Out"});
		}
	else{
		res.render("login", {message: "Please log in or sign up."});
	}
});

router.get('/earn', function(req, res){
	var sql="SELECT * FROM duties;";
	res.app.locals.pool.query(sql, function(error, results, fields){
		console.log("Got here");
		console.log(results);
		if('authenticated' in req.session){
			res.render('earn', {duties: results, balance: req.session.balance, go_to: "./logout", login: "Log Out"});
		}
		else{
			res.render("login", {message: "Please log in or sign up."});
		}
	});
});

router.get('/save_earned', function(req, res){
	console.log("In the saved function.");
	var cur_balance = parseInt(req.query.hidden_balance);
	var new_earnings = req.query.hidden_earnings;
	console.log(req.session.email+" / "+cur_balance+" / "+new_earnings);
	var sql="CALL updateUserEarn(?,?,?);";
	res.app.locals.pool.query(sql, [req.session.profile.email, cur_balance, new_earnings], function(error, results, fields){
		console.log("Finished it.");
		res.redirect('./earn');
	});
});

router.get('/spend', function(req, res){
	var sql="SELECT * FROM spending_options;";
	res.app.locals.pool.query(sql, function(error, results, fields){
		res.render('spend', {spending_options: results, balance: req.session.balance});
	});
});

router.get('/save_spent', function(req, res){
	var cur_balance = req.query.hidden_balance;
	var new_spendings = req.query.hidden_spendings;
	var sql="CALL updateUserSpend(?,?,?);";
	res.app.locals.pool.query(sql, [req.session.profile.email, cur_balance, new_spendings], function(error, results, fields){
		res.redirect('./spend');
	});
});

router.get('/bank', function(req, res){
	var sql="SELECT * FROM users WHERE email = ?;";
	var earn_lookup = {"Chores": 5, "Education": 1};
	var spend_lookup={"Groceries": 20, "Movies": 10, "Utilities": 40};
	res.app.locals.pool.query(sql, [req.session.profile.email], function(error, results, fields){
		console.log(results);
		var earn = results[0].earnings.split("; ");
		var spend = results[0].spendings.split("; ");
		var combined=[];
		for(var i=0; i<Math.max(earn.length-1, spend.length-1); i++){
			var c_earn_msg=i<earn.length-1?"Earned $"+earn_lookup[earn[i]]+" through "+earn[i]:"";
			var c_spend_msg=i<spend.length-1?"Spent $"+spend_lookup[spend[i]]+" on "+spend[i]:"";
			combined.push({earn_msg: c_earn_msg, spend_msg: c_spend_msg});
		}
		res.render('bank', {info: combined, balance: results[0].dollars});
	});
});

module.exports=router;
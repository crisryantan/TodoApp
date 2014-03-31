var async = require('async');
var schema   = require('../models/schema');
var mongoose = require('mongoose');

exports.create = function(req,res,next){
		schema.User.findOne({ 'email' :  req.user.email }, function(err, user) {
			var Todo = new schema.Todo({
				content: req.body.message,
				updated_at : Date.now(),
				user : req.user._id
			}).save(function(err,todo){
				if(err) return console.log(err);
				schema.User.update({ 'email' :  req.user.email }, {$push:{todo: todo._id}},{upsert:true},function(err){
					if(err) {return console.log(err);}
					else{
						console.log('successfully added');
						res.send(200, {todo_id : todo._id});
					}
				});
			});
		});
};

exports.displayTodo = function(req, res, next){
	schema.Todo.find({ 'user' : req.user._id}).
				sort({updated_at:1}).
				exec(function(err, todo){
					if(err) return next (err);
						res.render('user.html',{
							user:	req.user,
							todo:	todo
						});
				});
};


exports.destroy = function(req, res, next){
	console.log(req.params.id);
	var ObjectId = mongoose.Types.ObjectId;
		schema.Todo.findByIdAndRemove(req.params.id, {}, function(err,todo){
			schema.User.findByIdAndUpdate({'_id' : ObjectId(req.user.id)}, { $pull: { todo : req.params.id }}, function(err,todo){
				if(err){console.log(err);}
				else{
					console.log('success removed');
					res.send(200);
				}
			});
		});
};

exports.update = function(req, res, next){
	var ObjectId = mongoose.Types.ObjectId;
	schema.Todo.findByIdAndUpdate({'_id' : ObjectId(req.params.id)}, {$set:{ content: req.body.message }},{},function(err,todo){
		if(err){console.log(err);}
		else{console.log('success update');}
	});
};

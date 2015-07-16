var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Todo = require('../models/Todo.js');

/* GET todoss listing. */
router.get('/', function(req, res, next) {
	Todo.find(function(err, todos){
		if (err) return next(err);
		res.json(todos);
	})
  //res.send('respond with a resource');
});
router.post('/', function(req, res, next) {
  Todo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.route('/:todo_id')
.delete(function(req, res, next){
	Todo.findByIdAndRemove(req.params.todo_id, req.body, function(err, data){
		if(err){return next(err)}
		res.json(data);
		res.json({message: "Deleted!"});
	});

})
.put(function(req, res, next){
	Todo.findByIdAndUpdate(req.param.todo_id, req.body, function(err, todo_item){
		
		if(err){return next(err);}

		res.json(todo_item);
	});
})
.get(function(req, res, next){
	Todo.findById(req.params.todo_id, function(err, data){
		if(err){return next(err);}
		res.json(data);
	});
});
module.exports = router;


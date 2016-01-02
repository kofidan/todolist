var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var PORT = process.env.PORT || '3000';
var todoNextId = 1;
var todo = [];

app.use(bodyParser.json());


// var todo = [{
// 	id : 1,
// 	description : 'Wake up, pray and clean your body',
// 	status : true
// },
// {
// 	id : 2,
// 	description : 'Set off to work by 7:00 AM',
// 	status : true
// },
// {
// 	id : 3,
// 	description : 'Get to office by 8:00 AM',
// 	status : false
// }
// ]
app.get('/', function(req, res){
	res.send('Wonderful Express!');
});

//GET /todo
app.get('/todo', function(req, res){
	res.json(todo);
});

//GET /todo/:id
app.get('/todo/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	console.log('Todo Id : '+ todoId);
	var matchedTodo;
	// todo.forEach(function(todos){
	// 	if(todoId === todos.id){
	// 		matchedTodo = todos;
	// 	}
	// })

	matchedTodo = _.findWhere(todo, {id: todoId});
	console.log('matchedTodo : '+ matchedTodo);

	if(matchedTodo){
		console.log('My Activity was : '+ matchedTodo);
		res.json(matchedTodo);
	}else{
		res.sendStatus(404).send();
	}
});

//POST /todo
app.post('/todo', function(req, res){
	var body = _.pick(req.body, 'description', 'status');

	if(!_.isBoolean(body.status) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.sendStatus(400).send();
	}
	
	body.description = body.description.trim();
	body.id = todoNextId++;
	todo.push(body);
	//console.log('description : '+ body.description);
	res.json(body);
});

//DELETE /todo/:id
app.delete('/todo/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todo, {id: todoId});

	if(!matchedTodo){
		 res.status(404).json({"error": "no todo found with that id"});
	}else{
		todo = _.without(todo, matchedTodo);
		res.json(matchedTodo);
	}
});

app.use(express.static(__dirname + '/public'));
app.listen(PORT, function(){
	console.log('App running on PORT : '+ PORT);
});
var express = require('express');
var app = express();
var PORT = 3000;

var todo = [{
	id : 1,
	description : 'Wake up, pray and clean your body',
	status : true
},
{
	id : 2,
	description : 'Set off to work by 7:00 AM',
	status : true
},
{
	id : 3,
	description : 'Get to office by 8:00 AM',
	status : false
}
]
app.get('/', function(req, res){
	res.send('Wonderful Express!');
});

app.get('/todo', function(req, res){
	res.json(todo);
});

app.get('/todo/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	console.log('Todo Id : '+ todoId);
	var matchedTodo;

	todo.forEach(function(todos){
		if(todoId === todos.id){
			matchedTodo = todos;
		}
	})
	if(matchedTodo){
		console.log('My Activity was : '+ matchedTodo);
		res.json(matchedTodo);
	}else{
		res.sendStatus(404).send();
	}
});

app.use(express.static(__dirname + '/public'));
app.listen(PORT, function(){
	console.log('App running on PORT : '+ PORT);
});
var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	status: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
})

sequelize.sync().then(function() {
	console.log('Everything is synced');

	Todo.findById(1).then(function(todo){
		if(todo){
			console.log(todo.toJSON);
		}else{
			console.log('Todo not found');
		}
	})



	// Todo.create({
	// 	description: 'Did morning jogging before leaving for work',
	// 	status: true
	// }).then(function(todo) {
	// 	return Todo.create({
	// 		description: 'Wash down and eat breakfast'
	// 	});
	// }).then(function() {
	// 	//return Todo.findById(1);
	// 	return Todo.findAll({
	// 		where: {
	// 			status: false
	// 		}
	// 	});
	// }).then(function() {
	// 	return Todo.findAll({
	// 		where: {
	// 			description: {
	// 				$like : '%jogging%'
	// 			}
	// 		}
	// 	});

	// }).then(function(todos) {
	// 	if (todos) {
	// 		todos.forEach(function(todo) {
	// 			console.log(todo.toJSON());
	// 		});
	// 	} else {
	// 		console.log('no todo found');
	// 	}
	// }).catch(function(e) {
	// 	console.log(e);
	// });
});
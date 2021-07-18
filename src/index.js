/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];


function checksExistsUserAccount(request, response, next) {
	const { username } = request.headers

	const user = users.find(user => user.username === username)

	if(!user) {
		return response.status(404).json({ error: "User not found!" });
	}

	request.user = user

	return next()

}

app.post('/users', (request, response) => {
	const { name, username} = request.body
	
	const alreadyExists = users.find(user => user.username === username)

	if (alreadyExists) {
		return response.status(400).json({ error: "user already exists"})
	}

	const newUser = {
		id: uuidv4(),
		name,
		username,
		todos: []
	}

	users.push(newUser)

	return response.status(201).json(newUser);

});

app.get('/todos', checksExistsUserAccount, (request, response) => {

	const { user } = request;
   
	return response.status(200).json(user.todos)


});

app.post('/todos', checksExistsUserAccount, (request, response) => {
	
	const { title, deadline} = request.body;

	const { user } = request;

	const task = {
		id: uuidv4(),
		title,
		done: false,
		deadline: new Date(deadline),
		created_at: new Date()
	};
    
	user.todos.push(task)

	return response.status(201).json(user.todos)

});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
	const { title, deadline} = request.body;

	const taskId = request.params.id
 
	const { user } = request;

	const task = user.todos.find(task => task.id === taskId)
 
	if(!task) {
		return response.status(404).json({ error: "Task not found!"})
	}
 
	task.title = title
	task.deadline = deadline

	return response.status(200).json(task)
  
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
	const taskId = request.params.id
 
	const { user } = request;

	const task = user.todos.find(task => task.id === taskId)
 
	if(!task) {
		return response.status(404).json({ error: "Task not found!"})
	}

	task.done = true

	return response.status(200).json(task)

});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
	const taskId = request.params.id
 
	const { user } = request;

	const task = user.todos.find(task => task.id === taskId)
 
	if(!task) {
		return response.status(404).json({ error: "Task not found!"})
	}
	const i = user.todos.indexOf(task)
  
	user.todos.splice(i, 1)

	return response.status(200).json(user.todos)
});


app.listen(3333);
module.exports = app
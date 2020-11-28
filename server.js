var express = require('express');
var bodyParser = require('body-parser');
const port = 3000;

//global variables

//used to assign unique ids to each todo
let primaryId = 1;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var todoList = [];

// GET /api/todo
app.get('/todos', (req, res, next) => {
    if (!todoList.length) {
        next();
    }
    res.send(todoList);
    })

// GET /api/todos/:id'

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    let todo = todoList.find((todo) => {
        return todo.id === Number(id);
    });
    res.status(200).send(todo);
})

// POST /api/todos

app.post('/todos', (req, res) => {
    todoList.push({
        id: primaryId,
        todo: req.body.todo
    })
    primaryId++;

    res.status(200).json({
        message: "Your todo is added to the list!"
    })
})

// PUT /api/todos/:id

app.put('/todos/:id', (req, res) => {
    const id = req.params.id;

    let specificTodo = todoList.find((todo) => {
        return todo.id === Number(id);
    });

    specificTodo = req.body.todo;

    res.status(200).send(specificTodo);
})

// DELETE /api/todos/:id

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    let todo = todoList.find((todo) => {
        return todo.id === Number(id);
    });

    let todoIndex = todoList.findIndex((t) => {
        return t === todo;
    })

    if (todoIndex > -1) {
        todoList.splice(todoIndex, 1);
    }
    res.status(200).send("Your todo is deleted!");
})

app.listen(3000, function(){
    console.log('Todo List API is now listening on port 3000...');
})
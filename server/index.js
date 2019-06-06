var express = require('express');
var fs = require('fs');
var bodyparser = require('body-parser');
var db = __dirname + '/db';

var app = new express();

var expressWs = require('express-ws')(app);

app.use(bodyparser.json());

app.get('/todos', (req, res) => {
    var options = {
        root: db
    }
    res.sendFile('todos.json', options, (err) => {
        if (err) {
            res.sendStatus(500)
        }
    })
})

app.post('/todo', (req, res) => {
    console.log('add', req.body)
    var newTodo = req.body;
    newTodo.id = Math.random();
    if (!req.body || !req.body.content) {
        res.sendStatus(422);
        return;
    }
    function addTodo(todos) {
        todos.unshift(newTodo);
        return todos;
    }
    updateTodos(res, addTodo, newTodo.id);
    setTimeout(() => {
        aWss.clients.forEach(function (client) {
            client.send('new todo added');
        });
    }, 0);
})

app.put('/todo', (req, res) => {
    var updatedTodo = req.body;
    if (!updatedTodo.id) {
        res.sendStatus(422);
        return;
    }
    function updateTodo(todos) {
        var index = -1;
        todos = todos.map((element, i) => {
            if (element.id == updatedTodo.id) {
                return updatedTodo;
            } else {
                return element;
            }
        });
        return todos;
    }
    updateTodos(res, updateTodo, updatedTodo.id)
})

app.delete('/todo', (req, res) => {
    console.log('dleete', req.body)
    var id = req.body.id;
    if (!id) {
        res.sendStatus(422);
        return;
    }

    function deleteTodo(todos) {
        var index = -1;
        todos.forEach((element, i) => {
            if (element.id == id) {
                index = i;
            }
        });
        if (index !== -1) {
            todos.splice(index, 1);
        }
        return todos;
    }

    updateTodos(res, deleteTodo, id);
})

function updateTodos(res, reducer, id) {
    fs.readFile(__dirname + '/db/todos.json', (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var todos = JSON.parse(data);
        todos = reducer(todos);
        var todosString = JSON.stringify(todos, null, 2);
        fs.writeFile(__dirname + '/db/todos.json', todosString,
            err => { err ? res.sendStatus(500) : res.json({ id: id }).send(); })
    })
}

app.ws('/echo', function (ws, req) {
    ws.on('message', function (msg) {
        ws.send(msg);
    });
});

app.ws('/a', function (ws, req) {
});
var aWss = expressWs.getWss('/a');

app.ws('/b', function (ws, req) {
});

// setInterval(function () {
//   aWss.clients.forEach(function (client) {
//     client.send('hello');
//   });
// }, 10000);

app.listen('3600', '0.0.0.0', () => {
    console.log('server listening at 3600')
})
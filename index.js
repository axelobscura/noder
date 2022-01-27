const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", (request, response) => {
  response.send("Hello world");
});

app.get("/todos", (request, response) => {

  const showPending = request.query.showpending

  fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
    if(err){
      return response.status(500).send('Sorry, somethings wrong');
    }

    const todos = JSON.parse(data);

    if(showPending !== "1"){
      return response.json({todos: todos});
    } else {
      return response.json({todos: todos.filter(t => {return t.complete === false})});
    }

  });
});

app.put("/todos/:id/complete", (request, response) => {
  const id = request.params.id;

  const findTodoById = (todos, id) => {
    for(let i = 0; i < todos.length; i++){
      if(todos[i].id === parseInt(id)){
        return i;
      }
    };

    return -1;
  }

  fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
    if(err){
      return response.status(500).send('Sorry, somethings wrong');
    }

    let todos = JSON.parse(data)
    const todoIndex = findTodoById(todos, id);

    if(todoIndex === -1){
      return response.status(404).send('Sorry not found');
    }

    todos[todoIndex].complete = true;

    fs.writeFile('./store/todos.json', JSON.stringify(todos), () => {
      return response.json({'status':'ok'})
    })
  })
});

app.listen(5000, () => {
  console.log("APP running on 5000");
});
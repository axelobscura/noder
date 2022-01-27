const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", (request, response) => {
  response.send("Hello world");
});

app.get("/todos", (request, response) => {
  fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
    if(err){
      return response.status(500).send('Sorry, somethings wrong');
    }

    const todos = JSON.parse(data)
    return response.json({todos: todos})
  });
});

app.listen(5000, () => {
  console.log("APP running on 5000");
});
// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

const bodyParser = require('body-parser')

let todos = [
  { id: 1, work: "Đi chợ" },
  { id: 2, work: "Nấu cơm" },
  { id: 3, work: "Rửa bát" },
  { id: 4, work: "Học code tại CodersX" }
];

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send(
    'Lession 4 - CodersX - Post Method </br> <a href="/todos?q">Todos</a>'
  );
});

// app.get("/todos", (req, res) => {
//   res.render("index.pug", {
//     todos
//   });
// });

app.get("/todos", function(req, res) {
  let q = req.query.q.toLowerCase();
  let matchedTodos = todos.filter(todo => {
    return todo.work.toLowerCase().indexOf(q) !== -1;
  });
  console.log(matchedTodos);
  res.render("index.pug", { todos: matchedTodos });
});

app.post("/todos/create", function(req, res){
  console.log(req.body);
  todos.push(req.body);
  res.redirect("/todos?q");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

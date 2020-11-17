const express = require("express");
const server = express();
server.use(express.json());

const projects = [{
  "id":"1",
  "title":"titulo de testes",
  "task":["task1", "task2", "task3"],
},
  {
    "id":"2",
    "title":"titulo de testes 2",
    "task":["task1", "task2", "task3"],
  },
  {
    "id":"3",
    "title":"titulo de testes 3",
    "task":["task1", "task2", "task3"],
  }
];

//Verifica se o id do projeto existe

function checkIdExist(req, res, next) {
  const { index } = req.params;

  if (!projects[index]) {
    return res.status(400).json({"message":"O projeto não existe"});
  }
  return next();
}

server.get("/", (req, res) => {
  return res.json({"message":"Bem vindo a api de testes"}).status(200);
});

//POST /projects

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: [],
  };

  projects.push(project);

  return res.json(projects);
});

//GET /projects: Rota que lista todos projetos e suas tarefas;

server.get("/projects", (req, res) => {

  if(projects.length != 0){

    return res.json(projects);

  }
  return res.json({"message":"Não há projetos"})
  
});

//PUT /projects/:id

server.put("/projects/:index", checkIdExist, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  projects[index].title = title;

  return res.json(projects[index]);
});

//DELETE /projects/:index

server.delete("/projects/:index", (req, res) => {
  const { index } = req.params;

  if(projects.splice(index, 1).length == 0){

  return res.json({"message":"Projeto não encontrado"}).status(400);
  } else

  return res.send().status(200);
});

//POST /projects/:id/tasks:

server.post("/projects/:index/tasks", checkIdExist, (req, res) => {
  const { title, task } = req.body;
  const { index } = req.params;

  console.log(task)

  projects[index].title = title;

  projects[index].tasks.push(task);

  return res.json(projects);
});

server.listen(3001);

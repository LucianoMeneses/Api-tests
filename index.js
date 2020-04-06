const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

var Quantidade = 0;

//Middlewares

//Conta a quantidade de requisições foram feitas

function CheckNumberReq(req, res, next) {
  Quantidade = Quantidade + 1;

  console.log("Quantidade de requisições realizadas: " + Quantidade);

  next();
}

server.use(CheckNumberReq);

//Verifica se o id do projeto existe

function checkIdExist(req, res, next) {
  const { index } = req.params;

  if (!projects[index]) {
    return res.status(400).send("The Project does not exists");
  }
  return next();
}

//POST /projects: A rota deve receber id e title dentro do corpo e cadastrar um novo projeto
//dentro de um array no seguinte formato: { id: "1", title: 'Novo projeto', tasks: [] };
//Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com aspas duplas.

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
  return res.json(projects);
});

//PUT /projects/:id: A rota deve alterar apenas o título do projeto com o id presente nos parâmetros da rota;

server.put("/projects/:index", checkIdExist, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  projects[index].title = title;

  return res.json(projects[index]);
});

//DELETE /projects/:id: A rota deve deletar o projeto com o id presente nos parâmetros da rota;

server.delete("/projects/:index", checkIdExist, (req, res) => {
  const { index } = req.params;

  projects.splice(index, 1);

  return res.json(projects);
});

//POST /projects/:id/tasks: A rota deve receber um campo title e armazenar uma nova tarefa no array de
//tarefas de um projeto específico escolhido através do id presente nos parâmetros da rota;

server.post("/projects/:index/tasks", checkIdExist, (req, res) => {
  const { title, task } = req.body;
  const { index } = req.params;

  projects[index].title = title;

  projects[index].tasks.push(task);

  return res.json(projects);
});

server.listen(3001);

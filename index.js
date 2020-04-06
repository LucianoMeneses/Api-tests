const express = require("express");

const server = express();

server.use(express.json());

//POST /projects: A rota deve receber id e title dentro do corpo e cadastrar um novo projeto
//dentro de um array no seguinte formato: { id: "1", title: 'Novo projeto', tasks: [] };
//Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com aspas duplas.

const projects = [
  {
    id: "2",
    title: "teste",
    tasks: ["x", "r"]
  }
];

server.post("/projects", (req, res) => {
  const projeto = req.body;

  projects.push(projeto);

  return res.json(projects);
});

//GET /projects: Rota que lista todos projetos e suas tarefas;

server.get("/projects", (req, res) => {
  return res.json(projects);
});

//PUT /projects/:id: A rota deve alterar apenas o título do projeto com o id presente nos parâmetros da rota;

server.put("/projects/:index", (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  projects[index].title = title;

  return res.json(projects[index]);
});

//DELETE /projects/:id: A rota deve deletar o projeto com o id presente nos parâmetros da rota;

server.delete("/projects/:index", (req, res) => {
  const { index } = req.params;

  projects.splice(index, 1);

  return res.json(projects);
});

//POST /projects/:id/tasks: A rota deve receber um campo title e armazenar uma nova tarefa no array de
//tarefas de um projeto específico escolhido através do id presente nos parâmetros da rota;

server.post("/projects/:index/tasks", (req, res) => {
  const { title } = req.body;
  const { task } = req.body;
  const { index } = req.params;

  projects[index].title = title;

  const i = 0;

  while (projects[index].task[i]) {
    i++;
  }

  projects[index].task[i] = task;

  return res.json(projects[index]);
});

server.listen(3001);

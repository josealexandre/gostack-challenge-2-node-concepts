const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const repository = request.body  

  repository.id = uuid()
  repository.likes = 0

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const i = repositories.findIndex(repo => repo.id === id)

  if (i === -1) return response.status(400).json({ error: 'Repository does no exist' })

  repositories[i].title = title || repositories[i].title
  repositories[i].url = url || repositories[i].url
  repositories[i].techs = techs || repositories[i].techs

  return response.json(repositories[i])
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const i = repositories.findIndex(repo => repo.id === id)

  if (i === -1) return response.status(400).json({ error: 'Repository does no exist' })

  repositories.splice(i, 1)

  return response.status(204).json()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const i = repositories.findIndex(repo => repo.id === id)

  if (i === -1) return response.status(400).json({ error: 'Repository does no exist' })

  repositories[i].likes += 1

  return response.json(repositories[i])
});

module.exports = app;

import express from "express";
import { main, deleteUser, getAll } from "./database/connection";

const app = express();

app.use(express.json());

app.get("/", async (request, response) => {
  const users = await getAll();

  return response.json({ users });
});

app.post("/", async (request, response) => {
  const nome = request.body.nome;
  const email = request.body.email;

  const resp = await main(nome, email);

  return response.json({ resp });
});

app.delete("/:userId", async (request, response) => {
  const userId = request.params.userId;
  const data = deleteUser(+userId);

  return response.json({ data });
});

app.listen(3333, () => console.log("copium"));

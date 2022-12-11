const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

app.get("/createAcc", (req, res) => {
  res.send({ objeto: "obj" });
});

app.post("/creatAcc", async (req, res) => {
  prisma.artists.create({
    name: req.nome,
    nameArt: req.nomeArt,
    cpf: req.cpf,
  });
  return res.status(201).json;
});

app.listen(3333);

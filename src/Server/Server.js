import express, { response } from "express";

const app = express();

app.get("/creatAcc", (req, res) => {
  return res.send("Acessou CreateAcc");
});

app.listen(3333);

import cors from "cors";
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    req.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({});
  }

  next();
});

const prisma = new PrismaClient({
  log: ["query"],
});

router.get("/createAcc", (req, res) => {
  return res.send({ objeto: "obj" });
});

router.post("/createAcc", (req, res) => {
  console.log(req.body);
  res.send(req.body).json();
});

app.use("", router);

app.listen(3333);

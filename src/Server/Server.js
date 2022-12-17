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

// router.get("/createAcc", (req, res) => {
//   return res.send({ objeto: "obj" });
// });

router.post("/createAcc", async (req, res) => {
  await prisma.Artists.create({
    data: {
      name: req.body.name,
      nameArt: req.body.nameArt,
      cpf: req.body.cpf,
      email: req.body.email,
      pass: req.body.pass,
      whatsApp: req.body.whatsApp,
    },
  });
  return res.sendStatus(200);
});

router.post("/validateEmail", async (req, res) => {
  const rowEmail = await prisma.Artists.findMany({
    where: {
      email: req.body.email,
    },
  });
  res.json({ emails: rowEmail.length });
});

router.post("/login", async (req, res) => {
  const login = await prisma.Artists.findFirst({
    where: {
      email: req.body.email,
      pass: req.body.pass,
    },
  });
  res.json({ userData: login });
});

app.use("", router);

app.listen(3333);

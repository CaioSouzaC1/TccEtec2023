import cors from "cors";
import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

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

//To do: Fazer função global para verificação se está logado

const secret = "eyJhbGciOiJIUzI1NiJ9";
let jwtToken = "";

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

router.get("/login", async (req, res) => {
  const [hashType, hash] = req.headers.authorization.split(" ");
  const [email, password] = Buffer.from(hash, "base64").toString().split(":");

  try {
    const login = await prisma.Artists.findFirst({
      where: {
        email: email,
        pass: password,
      },
    });

    if (!login) {
      res.sendStatus(401);
    } else {
      const token = jwt.sign({ user: login.id }, secret, {
        expiresIn: 86400,
      });
      jwtToken = token;
      res.json({ userData: login, token: token });
    }
  } catch (err) {
    res.sendStatus(400);
  }
});

router.get("/estabelecimentos/ultimos", async (req, res) => {
  try {
    const verifying = jwt.verify(jwtToken, secret);
    if (verifying) {
      const lastPlaces = await prisma.Establishments.findMany();
      res.json(lastPlaces);
    }
  } catch (err) {
    res.sendStatus(401);
  }
});

app.use("", router);

app.listen(3333);

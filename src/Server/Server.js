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

const secret = "eyJhbGciOiJIUzI1NiJ9";

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

router.get("/getArtistsInfo/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await prisma.Artists.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        nameArt: true,
        email: true,
        whatsApp: true,
        cpf: true,
        createdAt: true,
        pubId: true,
      },
    });
    res.json(data);
  } catch (err) {}
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
      res.json({ token: token });
    }
  } catch (err) {
    res.sendStatus(400);
  }
});

router.get("/estabelecimentos/ultimos", async (req, res) => {
  try {
    const lastPlaces = await prisma.Establishments.findMany();
    res.json(lastPlaces);
  } catch (err) {
    res.sendStatus(401);
  }
});

const verifyJwt = (req, res, next) => {
  const token = req.headers.jwtauthorization;
  if (token == "null") {
    res.json({ auth: false, user: false });
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.json({ auth: false, user: false });
      } else {
        res.json({
          auth: true,
          user: jwt.verify(token, secret).user,
        });
      }
    });
  }
};

router.get("/autenticado", verifyJwt, (req, res) => {
  res.json({ auth: true, msg: "Autenticado resp após midleware" });
});

router.get("/artista/:id", async (req, res) => {
  try {
    const pubId = req.params.id;
    const artistInfo = await prisma.Artists.findFirst({
      where: {
        pubId: pubId,
      },
      select: {
        name: true,
        nameArt: true,
        email: true,
        whatsApp: true,
        createdAt: true,
        pubId: true,
      },
    });

    if (artistInfo) {
      res.json(artistInfo);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
});

router.get("/validateEmailEstableshiment", async (req, res) => {
  try {
    const [hashType, hash] = req.headers.authorization.split(" ");
    const email = Buffer.from(hash, "base64").toString();
    const EmailEstableshiment = await prisma.Establishments.findMany({
      where: { email: email },
    });
    res.json({ emails: EmailEstableshiment.length });
  } catch (err) {
    console.log(err);
  }
});

router.post("/createAccEstableshiment", async (req, res) => {
  try {
    const acc = await prisma.Establishments.create({
      data: {
        email: req.body.email,
        pass: req.body.pass,
        nomeResponsavel: req.body.nomeResponsavel,
        cnpj: req.body.cnpj,
        whatsApp: req.body.whatsApp,
        name: req.body.name,
        cep: req.body.cep,
        numEnd: req.body.numEnd,
        logradouro: req.body.logradouro,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
      },
    });

    if (!acc) {
      res.sendStatus(401);
    } else {
      const token = jwt.sign({ user: acc.id }, secret, {
        expiresIn: 86400,
      });
      res.json(token);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/estabelecimento/:id", async (req, res) => {
  try {
    const pubId = req.params.id;
    const EstablishmentsInfo = await prisma.Establishments.findFirst({
      where: {
        pubId: pubId,
      },
      select: {
        name: true,
        nomeResponsavel: true,
        email: true,
        whatsApp: true,
        createdAt: true,
        pubId: true,
        cep: true,
        numEnd: true,
        logradouro: true,
        bairro: true,
        cidade: true,
      },
    });

    if (EstablishmentsInfo) {
      res.json(EstablishmentsInfo);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
});

app.use("", router);
app.listen(3333);

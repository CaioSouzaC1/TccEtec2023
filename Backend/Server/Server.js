import cors from "cors";
import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import SecretJwtGenerator from "./SecretJwtGenerator.js";
import multer from "multer";

/*START - Server Configurations*/
const app = express();
const router = express.Router();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
/*Exemplo de uso do cors para permitir apenas uma única rota
app.use(cors({
  origin: '127.0.0.01'
}));
Subistituindo a linha abaixo
*/
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    //Antes era req.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({});
  }

  if (req.url.endsWith(".jpg")) {
    res.set("Content-Type", "image/jpeg");
  }

  next();
});

const prisma = new PrismaClient({
  log: ["query"],
});

const secret = SecretJwtGenerator();
const saltRounds = 10;
/*END - Server Configurations*/

/*START - Image Upload Configurations */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Backend/assets/artists");
  },
  filename: function (req, file, cb) {
    cb(null, "ArtistProfileImage-" + file.originalname + ".jpg");
  },
});
const upload = multer({ storage: storage });

const storageEstablishments = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Backend/assets/establishments");
  },
  filename: function (req, file, cb) {
    cb(null, "EstablishmentProfileImage-" + file.originalname + ".jpg");
  },
});
const uploadEstablishments = multer({ storage: storageEstablishments });

app.use(express.static("Backend/assets"));
/*END - Image Upload Configurations */

/*START - Artists Configurations*/
router.post("/createAcc", async (req, res) => {
  try {
    bcrypt.hash(req.body.pass, saltRounds, async (err, hash) => {
      const artist = await prisma.Artists.create({
        data: {
          name: req.body.name,
          nameArt: req.body.nameArt,
          cpf: req.body.cpf,
          email: req.body.email,
          pass: hash,
          whatsApp: req.body.whatsApp,
        },
      });

      if (!artist) {
        res.sendStatus(402);
      } else {
        const token = jwt.sign({ user: artist.id, type: "artist" }, secret, {
          expiresIn: 86400,
        });

        await prisma.ArtistsMeta.create({
          data: {
            id: artist.id,
          },
        });

        res.json(token);
      }
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.post("/validateEmail", async (req, res) => {
  const rowEmail = await prisma.Artists.findMany({
    where: {
      email: req.body.email,
    },
  });
  res.json({ emails: rowEmail.length });
});

router.get("/getInfo", async (req, res) => {
  const id = Buffer.from(req.headers.authorization, "base64").toString();
  try {
    let data = await prisma.Artists.findUnique({
      where: { id: id },
      select: {
        name: true,
        nameArt: true,
        email: true,
        whatsApp: true,
        cpf: true,
        createdAt: true,
        pubId: true,
      },
    });

    if (data) {
      res.json({ data: data, type: "Artist" });
    } else if (!data) {
      data = await prisma.Establishments.findUnique({
        where: { id: id },
        select: {
          name: true,
          nomeResponsavel: true,
          email: true,
          whatsApp: true,
          cep: true,
          numEnd: true,
          logradouro: true,
          bairro: true,
          cidade: true,
          createdAt: true,
          pubId: true,
          cnpj: true,
        },
      });
      if (data) {
        res.json({ data: data, type: "Establishment" });
      }
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
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
      const idToProfileView = await prisma.Artists.findFirst({
        where: {
          pubId: pubId,
        },
        select: {
          id: true,
        },
      });
      await prisma.ArtistsMeta.update({
        where: {
          id: idToProfileView.id,
        },
        data: {
          profileViews: {
            increment: 1,
          },
        },
      });
      res.json(artistInfo);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
});

router.post("/ArtistCreateEvent", async (req, res) => {
  try {
    const establishmentIdPrime = await prisma.Establishments.findFirst({
      where: { pubId: req.body.idEstablishment },
      select: { id: true },
    });
    if (establishmentIdPrime.id) {
      try {
        const EventCreated = await prisma.Events.create({
          data: {
            artistCreator: req.body.idArtist,
            eventSpace: establishmentIdPrime.id,
            eventStatus: "Pendente Estabelecimento",
            eventName: "Fixed Name",
          },
        });
        res.json(EventCreated.id);
      } catch (err) {
        console.log(err);
        res.sendStatus(400);
      }
    }
  } catch (err) {
    res.sendStatus(400);
  }
});

router.patch("/ArtistUpdateAcc", async (req, res) => {
  try {
    const updateUser = await prisma.Artists.update({
      where: {
        id: req.body.id,
      },
      data: {
        name: req.body.name,
        nameArt: req.body.nameArt,
        email: req.body.email,
        whatsapp: req.body.whatsapp,
      },
    });
    if (updateUser) {
      res.json({
        name: updateUser.name,
        nameArt: updateUser.nameArt,
        email: updateUser.email,
        whatsApp: updateUser.whatsApp,
        cpf: updateUser.cpf,
        createdAt: updateUser.createdAt,
      });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.post("/updateProfileImage", upload.single("file"), (req, res) => {
  const file = req.file;
  // const filePath = "Back-end/Assets/Artists/" + file.filename;
  if (!file) {
    res.sendStatus(400);
  } else {
    res.status(200).send("Imagem Cadastrada");
  }
});
/*END - Artists Configurations*/

/*START - Security/Validations*/
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
          type: jwt.verify(token, secret).type,
        });
      }
    });
  }
};

router.get("/login", async (req, res) => {
  const [hashType, hash] = req.headers.authorization.split(" ");
  const [email, password] = Buffer.from(hash, "base64").toString().split(":");
  try {
    let type = "artist";

    let login = await prisma.Artists.findFirst({
      where: {
        email: email,
      },
      select: {
        pass: true,
        id: true,
      },
    });

    try {
      if (
        login != null &&
        (await bcrypt.compare(password, login.pass)) === true
      ) {
        const token = jwt.sign({ user: login.id, type: type }, secret, {
          expiresIn: 86400,
        });
        res.json({ token: token });
      } else {
        type = "establishments";
        login = await prisma.Establishments.findFirst({
          where: {
            email: email,
          },
          select: {
            pass: true,
            id: true,
          },
        });
        if (login != null) {
          if ((await bcrypt.compare(password, login.pass)) === true) {
            const token = jwt.sign({ user: login.id, type: type }, secret, {
              expiresIn: 86400,
            });
            res.json({ token: token });
          } else {
            res.sendStatus(401);
          }
        } else {
          res.sendStatus(401);
        }
      }
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    res.sendStatus(400);
  }
});

router.get("/autenticado", verifyJwt, (req, res) => {
  res.json({ auth: true, msg: "Autenticado resp após midleware" });
});
/*END - Security/Validations*/

/*START - Estableshiment Configurations*/
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
    res.sendStatus(400);
  }
});

router.get("/estabelecimentos/ultimos", async (req, res) => {
  try {
    const lastPlaces = await prisma.Establishments.findMany({
      select: {
        bairro: true,
        name: true,
        logradouro: true,
        pubId: true,
      },
    });
    res.json(lastPlaces);
  } catch (err) {
    res.sendStatus(401);
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
      const idToProfileView = await prisma.Establishments.findFirst({
        where: {
          pubId: pubId,
        },
        select: {
          id: true,
        },
      });
      await prisma.EstablishmentsMeta.update({
        where: {
          id: idToProfileView.id,
        },
        data: {
          profileViews: {
            increment: 1,
          },
        },
      });

      res.json(EstablishmentsInfo);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
});

router.post("/createAccEstableshiment", async (req, res) => {
  try {
    bcrypt.hash(req.body.pass, saltRounds, async (err, hash) => {
      const acc = await prisma.Establishments.create({
        data: {
          email: req.body.email,
          pass: hash,
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
        const token = jwt.sign(
          { user: acc.id, type: "establishments" },
          secret,
          {
            expiresIn: 86400,
          }
        );

        await prisma.EstablishmentsMeta.create({
          data: {
            id: acc.id,
          },
        });

        res.json(token);
      }
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.patch("/EstableshimentUpdateAcc", async (req, res) => {
  try {
    const updateUser = await prisma.Establishments.update({
      where: {
        id: req.body.id,
      },
      data: {
        name: req.body.name,
        cep: req.body.cep,
        email: req.body.email,
        whatsApp: req.body.whatsApp,
        cidade: req.body.cidade,
        logradouro: req.body.logradouro,
        bairro: req.body.bairro,
        numEnd: req.body.numEnd,
      },
    });
    if (updateUser) {
      console.log(updateUser);
      res.json({
        name: updateUser.name,
        email: updateUser.email,
        whatsApp: updateUser.whatsApp,
        createdAt: updateUser.createdAt,
        cep: updateUser.cep,
        logradouro: updateUser.logradouro,
        bairro: updateUser.bairro,
        cidade: updateUser.cidade,
        numEnd: updateUser.numEnd,
      });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.post(
  "/updateProfileImageEstableshiment",
  uploadEstablishments.single("file"),
  (req, res) => {
    const file = req.file;
    // const filePath = "Back-end/Assets/Artists/" + file.filename;
    if (!file) {
      res.sendStatus(400);
    } else {
      res.status(200).send("Imagem Cadastrada");
    }
  }
);
/*END - Estableshiment Configurations*/

/*START - Events Configurations*/
router.get("/meus-eventos", async (req, res) => {
  try {
    const id = Buffer.from(req.headers.authorization, "base64").toString();
    console.log(id);
    let events = await prisma.Events.findMany({
      where: {
        OR: [
          {
            artistCreator: id,
          },
          {
            eventSpace: id,
          },
        ],
      },
      select: {
        id: true,
        eventName: true,
        artistCreator: true,
        eventSpace: true,
        createdAt: true,
        eventStatus: true,
      },
    });
    if (events.length > 0) {
      let eventsArray = [];
      await Promise.all(
        events.map(async (e) => {
          const artistData = await prisma.Artists.findUnique({
            where: {
              id: e.artistCreator,
            },
            select: {
              pubId: true,
              nameArt: true,
              createdAt: true,
            },
          });
          e.ArtistData = artistData;

          const EstablishmentsData = await prisma.Establishments.findUnique({
            where: {
              id: e.eventSpace,
            },
            select: {
              pubId: true,
              name: true,
              cep: true,
            },
          });
          e.EstablishmentsData = EstablishmentsData;
          eventsArray.push(e);
        })
      );
      res.json(eventsArray);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
/*END - Events Configurations*/

/*START - Util Endpoints*/
router.get("/pubId-to-Id", async (req, res) => {
  try {
    const id = Buffer.from(req.headers.authorization, "base64").toString();

    let login = await prisma.Artists.findFirst({
      where: {
        pubId: id,
      },
      select: {
        id: true,
      },
    });

    if (!login) {
      login = await prisma.Establishments.findFirst({
        where: {
          pubId: id,
        },
        select: {
          id: true,
        },
      });
      if (!login) {
        res.sendStatus(404);
      }
    }
    res.json(login);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.get("/Id-to-pubId", async (req, res) => {
  try {
    const id = Buffer.from(req.headers.authorization, "base64").toString();

    let login = await prisma.Artists.findFirst({
      where: {
        id: id,
      },
      select: {
        pubId: true,
      },
    });

    if (!login) {
      login = await prisma.Establishments.findFirst({
        where: {
          id: id,
        },
        select: {
          pubId: true,
        },
      });
      if (!login) {
        res.sendStatus(404);
      }
    }
    res.json(login);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.post("/sub-newsletter", async (req, res) => {
  try {
    const userToNewsletter = await prisma.Newsletter.create({
      data: {
        email: req.body.email,
      },
    });
    if (userToNewsletter) {
      res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});
/*END - Util Endpoints*/

/*START - App Listen Configurations*/
app.use("", router);
app.listen(3333);
/*END - App Listen Configurations*/

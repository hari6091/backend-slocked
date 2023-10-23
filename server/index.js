import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import SalaUserRoute from "./routes/SalaUserRoute.js";
import SalaRoute from "./routes/SalaRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import subscriberRouter from "./routes/Subscriber.js";
import publisherRouter from "./routes/Publisher.js";
import Users from "./models/UserModel";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

//  sincronizar banco
(async () => {
  await db.sync();
})();

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "jsfgfjguwrg8783wgbjs849h2fu3cnsvh8wyr8fhwfvi2g225",
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
    "Access-Control-Allow-Origin": "*",
  })
);

app.use(express.json());
app.use(UserRoute);
app.use(SalaUserRoute);
app.use(SalaRoute);
app.use(AuthRoute);

app.use("/subscriber", subscriberRouter);
app.use(publisherRouter);

////iniciar uma seção sempre que for usar
store.sync();

/* mqtt */
//require('./mqtt');

const PORT = process.env.PORT || 5000;

Users.findAll()
  .then((users) => {
    if (users.length === 0) {
      Users.create({
        uuid: '2b22c47f-f5ed-4cc3-8b0b-a511b1bc22fd',
        name: 'fulsss',
        tags: 'ghgfvkj876',
        matricula: '5646546',
        disciplinaOUcargo: 'cordenador',
        email: 'admin@gmil.com',
        password: '$argon2id$v=19$m=4096,t=3,p=1$3ViIJoKimFeVTb3dljDD2w$/TqFqUmYB5M/wg/6/9IPINeYyBsVHUPp1oY5+v6nA9c',
        role: 'admin',
      }).then((novoUsuario) => {
        console.log("Usuário inserido:", novoUsuario.toJSON());
      });
    } else {
      console.log("Usuários já existem, nenhum novo usuário inserido.");
    }
  })
  .catch((error) => {
    console.error("Erro ao verificar usuários:", error);
  });

app.listen(PORT, () => {
  console.log(`Server up and running... ${PORT}`);
});

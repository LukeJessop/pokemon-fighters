require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const ctrl = require("./controller");
const app = express();
const { SERVER_PORT, SESSION_SECRET, DATABASE_URL } = process.env;

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

massive({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
}).then((db) => {
    app.set("db", db);
    console.log("database up!");
  })
  .catch((err) => console.log(err));

//auth endpoints vv
app.post("/auth/login", ctrl.login);
app.post("/auth/register", ctrl.register);
app.get('/api/user', (req, res) => res.status(200).send(req.session.user))
//auth endpoints ^^

app.post("/api/pokemon", ctrl.addPokemon); //adds a users pokemon
app.get("/api/pokemon", ctrl.getPokemon); //gets all of users pokemon

app.get("/api/backpack", ctrl.getBackpack) //gets all pokemon in your backpack
app.put("/api/backpack", ctrl.transferBackpackPokemon); //adds/removes a pokemon from your backpack



//do not use PORT in place of SERVER_PORT because npm for some reason accesses that and uses that port aswell
app.listen(SERVER_PORT, console.log(`You are on Port: ${SERVER_PORT} `));

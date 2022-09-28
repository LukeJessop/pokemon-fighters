require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const ctrl = require("./controller");
const app = express();
const path = require('path')
const { SERVER_PORT, SESSION_SECRET, DATABASE_URL } = process.env;

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../build")))

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
app.delete('/api/user', (req, res) => {
  req.session.destroy()
  res.sendStatus(200)
})
//auth endpoints ^^

app.post("/api/pokemon", ctrl.addPokemon); //adds a users pokemon
app.get("/api/pokemon", ctrl.getPokemon); //gets all of users pokemon
app.put("/api/pokemon", ctrl.updatePokemon) // update pokemon on win


app.get("/api/backpack", ctrl.getBackpack) //gets all pokemon in your backpack
app.put("/api/backpack", ctrl.transferBackpackPokemon); //adds/removes a pokemon from your backpack




app.get('/*',function(req,res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const port = process.env.PORT || SERVER_PORT

//do not use PORT in place of SERVER_PORT because npm for some reason accesses that and uses that port aswell
app.listen(port, console.log(`You are on Port: ${port} `));

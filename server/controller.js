const bcrypt = require("bcrypt");
module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db"); //finds the db file
    const { regUser, regPass } = req.body; //grabs my request off of body

    const user = await db.userTable.check_user(regUser); //checks if user exists

    if (user[0]) {
      //if user exists then send status of 400
      return res.status(400).send("This user already exists");
    }

    const salt = bcrypt.genSaltSync(10); //generate salt for password encryption
    const hash = bcrypt.hashSync(regPass, salt); //hash salt and password together to get encrypted password
    const [newUser] = await db.userTable.create_user([regUser, hash]); // creates new user
    req.session.user = {
      //sets values from new user to the session.user
      userId: newUser.user_id,
      username: newUser.username,
    };
    res.status(200).send(req.session.user);
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { loginUser, loginPass } = req.body;

    const [user] = await db.userTable.check_user(loginUser);
    if (!user) {
      res.status(401).send("Incorrect Login");
    }

    const authenticated = bcrypt.compareSync(loginPass, user.password);
    if (authenticated) {
      req.session.user = {
        userId: user.user_id,
        username: user.username,
      };
      res.status(200).send(req.session.user);
    } else {
      res.status(401).send("Incorrect Login");
    }
  },
  getPokemon: async (req, res) => {
    const db = req.app.get("db");
    if (req.session.user) {
      const userId = req.session.user.userId;
      db.pokemonTable.get_pokemon(userId)
        .then((pokemon) => res.status(200).send(pokemon))
        .catch((err) => console.log(err));
    }
  },
  addPokemon: async (req, res) => {
    const db = req.app.get("db");
    const { name, health, damage, level, pokemonUrl, xp, inBackpack } = req.body;
    const userId = req.session.user.userId;

    const [userpokemon] = await db.pokemonTable.create_pokemon([
      name,
      pokemonUrl,
      health,
      damage,
      xp,
      level,
      inBackpack,
      userId,
    ]);

    res.status(200).send(userpokemon)
  },
  getBackpack: async (req, res) => {
    const db = req.app.get('db')
    const userId = req.session.user.userId
    db.pokemonTable.backpack.get_backpack(userId)
      .then((backpack) => res.status(200).send(backpack))
      .catch((err) => console.log(err))
  },
  transferBackpackPokemon: (req, res) => {
    const db = req.app.get('db')
    const {pokemon_id, inbackpack} = req.body;
    userId = req.session.user.userId
    let add = true
    let remove = false
    db.pokemonTable.backpack.update_in_back_pack([inbackpack ? remove : add, pokemon_id]).then((backpack) => res.status(200).send(backpack))
  },
  deletePokemon: (req, res) => {

  }
};

CREATE TABLE trainer(
    user_id SERIAL PRIMARY KEY,
	username varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);

CREATE TABLE pokemon(
    pokemon_id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    pokemonUrl varchar(255) NOT NULL,
    health int NOT NULL,
    damage int NOT NULL,
    xp int NOT NULL,
    level int NOT NULL,
    inBackpack boolean DEFAULT false,
    owner int REFERENCES trainer (user_id)
);

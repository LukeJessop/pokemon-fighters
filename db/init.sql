CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
	username varchar(255) NOT NULL,
    password varchar(255) NOT NULL
)

CREATE TABLE pokemon{
    pokemon_id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    frontSprite varchar(255) NOT NULL,
    backSprite varchar(255) NOT NULL,
    health int NOT NULL,
    damage int NOT NULL,
    xp int NOT NULL,
    level int NOT NULL,
    owner int REFERENCE users (user_id)
}
INSERT INTO pokemon(name, pokemonUrl, health, damage, xp, level, owner)
VALUES($1, $2, $3, $4, $5, $6, $7)
RETURNING *;
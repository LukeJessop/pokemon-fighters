UPDATE pokemon
SET xp = $1, level = $2, health = $3, damage = $4
WHERE pokemon_id = $5
RETURNING *;
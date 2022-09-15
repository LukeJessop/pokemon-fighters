UPDATE pokemon
SET inBackPack = $1
WHERE pokemon_id = $2;
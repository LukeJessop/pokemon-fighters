INSERT INTO pokemon(name, frontSprite, backSprite, health, damage, xp, level, owner)
VALUES(1, 'test pokemon', 'https://avatars.githubusercontent.com/u/70823991?s=48&v=4', 'https://avatars.githubusercontent.com/u/70823991?s=48&v=4', 100, 10, 0, 1, 3)
RETURNING *;
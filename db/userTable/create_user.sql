INSERT INTO trainer (username, password)
VALUES ($1, $2)
RETURNING *;
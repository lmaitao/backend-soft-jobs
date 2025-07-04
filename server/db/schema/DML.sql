SELECT * FROM usuarios;

INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *;

SELECT * FROM usuarios WHERE email = $1;

SELECT id, email, rol, lenguage FROM usuarios;






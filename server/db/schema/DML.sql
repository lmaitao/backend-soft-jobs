SELECT * FROM usuarios;

INSERT INTO usuarios (email, password, rol, lenguage) 
      VALUES ($1, $2, $3, $4) 
      RETURNING id, email, rol, lenguage, created_at;

SELECT * FROM usuarios WHERE email = $1;






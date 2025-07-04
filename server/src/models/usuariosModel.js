import pool from '../../db/database.js';
import bcrypt from 'bcryptjs';

const registrarUsuario = async (email, password, rol, lenguage) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = {
    text: 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [email, hashedPassword, rol, lenguage],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const obtenerUsuarioPorEmail = async (email) => {
  const query = {
    text: 'SELECT * FROM usuarios WHERE email = $1',
    values: [email],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const obtenerUsuarios = async () => {
  const { rows } = await pool.query('SELECT id, email, rol, lenguage FROM usuarios');
  return rows;
};

export {
  registrarUsuario,
  obtenerUsuarioPorEmail,
  obtenerUsuarios,
};
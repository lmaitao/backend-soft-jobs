import pool from '../database/db.js';
import bcrypt from 'bcryptjs';

// Modelo ajustado para el frontend original
export const createUser = async (email, password, rol, lenguage) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = {
    text: `
      INSERT INTO usuarios (email, password, rol, lenguage) 
      VALUES ($1, $2, $3, $4) 
      RETURNING id, email, rol, lenguage, created_at
    `,
    values: [email, hashedPassword, rol, lenguage],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

export const getUserByEmail = async (email) => {
  const query = {
    text: 'SELECT * FROM usuarios WHERE email = $1',
    values: [email],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
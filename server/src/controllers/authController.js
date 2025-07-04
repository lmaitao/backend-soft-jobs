import jwt from 'jsonwebtoken';
import { obtenerUsuarioPorEmail } from '../models/usuariosModel.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await obtenerUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { login };
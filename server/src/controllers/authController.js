import jwt from 'jsonwebtoken';
import {
  createUser,
  getUserByEmail
} from '../models/usuariosModel.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Función para registrar usuario (ajustada al frontend original)
export const registerUser = async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;

    // Validación exacta como espera el frontend
    if (!email || !password || !rol || !lenguage) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El correo ya está registrado'
      });
    }

    const newUser = await createUser(email, password, rol, lenguage);

    // Respuesta ajustada al frontend
    res.status(201).json({
      success: true,
      user: {
        email: newUser.email,
        rol: newUser.rol,
        lenguage: newUser.lenguage
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar usuario'
    });
  }
};

// Función para login (compatible exactamente con el frontend)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Token con los datos exactos que necesita el frontend
    const token = jwt.sign(
      {
        email: user.email,
        rol: user.rol,
        lenguage: user.lenguage
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Respuesta que espera el frontend original
    res.json({
      success: true,
      token,
      user: {
        email: user.email,
        rol: user.rol,
        lenguage: user.lenguage
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión'
    });
  }
};

// Función para obtener perfil (ajustada al frontend)
export const getUserProfile = async (req, res) => {
  try {
    const { email } = req;
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Respuesta que espera el frontend
    res.json({
      success: true,
      user: {
        email: user.email,
        rol: user.rol,
        lenguage: user.lenguage
      }
    });
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener perfil'
    });
  }
};
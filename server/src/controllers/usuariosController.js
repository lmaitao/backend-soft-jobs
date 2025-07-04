import {
  registrarUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorEmail,
} from '../models/usuariosModel.js';

const registrarNuevoUsuario = async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;
    const usuarioExistente = await obtenerUsuarioPorEmail(email);

    if (usuarioExistente) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const nuevoUsuario = await registrarUsuario(email, password, rol, lenguage);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const obtenerDatosUsuarios = async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const obtenerDatosUsuario = async (req, res) => {
  try {
    const { email } = req;
    const usuario = await obtenerUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { password, ...usuarioSinPassword } = usuario;
    res.json(usuarioSinPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  registrarNuevoUsuario,
  obtenerDatosUsuarios,
  obtenerDatosUsuario,
};
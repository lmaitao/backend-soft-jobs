import express from 'express';
import {
  registrarNuevoUsuario,
  obtenerDatosUsuarios,
  obtenerDatosUsuario,
} from '../src/controllers/usuariosController.js';
import { login } from '../src/controllers/authController.js';
import validarCredenciales from '../middlewares/credentialMiddleware.js';
import validarToken from '../middlewares/authMiddleware.js';
import reportarConsultas from '../middlewares/loggingMiddleware.js';

const router = express.Router();

router.use(reportarConsultas);

router.post('/usuarios', registrarNuevoUsuario);
router.post('/login', validarCredenciales, login);
router.get('/usuarios', validarToken, obtenerDatosUsuario);

export default router;
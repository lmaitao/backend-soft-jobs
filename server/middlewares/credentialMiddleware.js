export default (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false,
      message: 'Email y contraseña son requeridos' 
    });
  }

  next();
};
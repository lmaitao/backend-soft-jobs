const reportarConsultas = (req, res, next) => {
  console.log(`Consulta recibida: ${req.method} ${req.url}`);
  next();
};

export default reportarConsultas;
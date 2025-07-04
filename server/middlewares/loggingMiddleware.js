export default (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`, {
    body: req.body,
    headers: req.headers
  });
  next();
};
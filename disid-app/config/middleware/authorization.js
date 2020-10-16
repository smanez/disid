const jwt = require('jsonwebtoken');
const config = require('../config/');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.sign(token, config.cookie.secret, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: 'Token inválida' });
      }
      req.decoded = decoded;
      return next();
    });
  } catch (err) {
    res.status(401).json({
      error: new Error(`Invalid request!${err}`),
    });
  }
};

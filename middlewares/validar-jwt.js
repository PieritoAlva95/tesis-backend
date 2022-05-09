const jwt = require('jsonwebtoken');

const validarToken = (req, res) => {
  //leer el token
  const token = req.body.token;

  if (!token) {
    return res.status(404).json({
      ok: false,
      msg: 'no existe',
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    if (uid) {
      res.json({
        ok: true,
        msg: 'su token es válido',
      });
    } else {
      res.json({
        ok: false,
        msg: 'Su token a expirado',
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      ok: false,
      msg: 'token no valido',
    });
  }
};

const validarJWT = (req, res, next) => {
  //leer el token
  const token = req.header('x-token');

  if (!token) {
    return res.status(404).json({
      ok: false,
      msg: 'no existe token',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid; //puedo enviar este id a la petición opcional
    next();
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      ok: false,
      msg: 'token no valido',
    });
  }
};

module.exports = {
  validarJWT,
  validarToken,
};

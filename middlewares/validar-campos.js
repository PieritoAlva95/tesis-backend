<<<<<<< HEAD
const {response} = require('express')
const {validationResult} = require('express-validator');

const validarCampos = (req, res = response, next) =>{

     //veo que no me lleguen errores de la ruta en caso que haya los imprime
     const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok:false,
            errors: errores.mapped()
        });
    }
     
    next();
}


module.exports = {
    validarCampos
}
=======
const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
  //veo que no me lleguen errores de la ruta en caso que haya los imprime
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errores.mapped(),
    });
  }

  next();
};

module.exports = {
  validarCampos,
};
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e

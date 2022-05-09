const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
  actualizarOferta,
  ofertaPorPostulante,
} = require('../controllers/interesado');

const router = Router();

router.put('/:id', [validarJWT], actualizarOferta);

module.exports = router;

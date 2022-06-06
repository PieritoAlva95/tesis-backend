<<<<<<< HEAD
const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');


const {actualizarOferta, ofertaPorPostulante} = require('../controllers/interesado');


const router = Router();


router.put('/:id',
    [
        validarJWT
    ] ,actualizarOferta);
=======
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
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e

module.exports = router;

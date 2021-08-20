const {Router} = require('express');
const {login, renewToken} = require('../controllers/login');
const {check} = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');

const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();



router.post('/', 
    [
        check('password', 'El pass es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    login
)

router.get( '/renew',
    validarJWT,
    renewToken
)

module.exports = router;
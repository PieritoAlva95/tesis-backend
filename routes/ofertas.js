const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
  crearOferta,
  verOfertaUnica,
  verOfertas,
  actualizarOferta,
  borrarOferta,
  verOfertasByUser,
  getOfertasDiferentesUser,
  verOfertasContratadasByUser,
  getBuscarOfertas,
  getOfertasByCategoria,
  getOfertasByCategoriaUser,
  getBuscarOfertasUser,
  verContratosUser,
  verOfertasAdmin,
  bloquearOfertasUser,
  getOfertasByUser,
<<<<<<< HEAD
  getOfertasMovilUserLogueado,
  enviarUnaNotificacion,

=======
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
} = require('../controllers/oferta');

const router = Router();

router.get('/', verOfertas);
<<<<<<< HEAD

//AGREGO LA RUTA PARA LAS NOTIFICACIONES
router.get('/notificacion-usuario/:idOferta', enviarUnaNotificacion);



=======
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
router.get('/admin/ofertas', verOfertasAdmin);

router.post('/bloquear/user/:id', bloquearOfertasUser);

router.get('/:id', verOfertaUnica);

router.get('/usuario/:id', verOfertasByUser);
router.get('/bloquear/usuario/:id', getOfertasByUser);

router.get('/usuario/categoria/:text/:id', getOfertasByCategoriaUser);
router.get('/usuario/busqueda/:text/:id', getBuscarOfertasUser);

router.get('/usuario/contratos/:id', verOfertasContratadasByUser);
router.get('/busqueda/:text', getBuscarOfertas);
router.get('/busqueda/categoria/:text', getOfertasByCategoria);

router.get('/busqueda/contratos/usuario/:id', verContratosUser);

router.post(
  '/',
  [
    validarJWT,
    check('titulo', 'El titulo de la oferta es necesario').not().isEmpty(),
    check('cuerpo', 'El cuerpo de la oferta es necesario').not().isEmpty(),

    validarCampos,
  ],
  crearOferta
);

//router.get('/' ,getOfertaUsuario);

router.put(
  '/:id',
  [
    validarJWT,
    check('titulo', 'El titulo de la oferta es necesario').not().isEmpty(),
    check('cuerpo', 'El cuerpo de la oferta es necesario').not().isEmpty(),

    validarCampos,
  ],
  actualizarOferta
);

router.delete('/:id', validarJWT, borrarOferta);

router.get('/usuario/get-ofertas/:id', getOfertasDiferentesUser);
<<<<<<< HEAD
router.get('/usuario/ofertas/movil/:id/logueado', getOfertasMovilUserLogueado);
=======
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e

module.exports = router;

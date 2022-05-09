/*
    ruta: api/uploads/
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());

//usuarios/42398473298

//en el postman se envia imagen  y el file
router.put('/:tipo/:id', validarJWT, fileUpload);

//http://localhost:3000/api/upload/usuarios/d40ae04f-89b7-453c-a1e3-57bba1653fd9.jpg
router.get('/:tipo/:foto', retornaImagen);

module.exports = router;

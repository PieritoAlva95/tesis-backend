/*
    ruta: api/uploads/
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

<<<<<<< HEAD

=======
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();

<<<<<<< HEAD
router.use( expressFileUpload() );
=======
router.use(expressFileUpload());
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e

//usuarios/42398473298

//en el postman se envia imagen  y el file
<<<<<<< HEAD
router.put('/:tipo/:id', validarJWT , fileUpload );


//http://localhost:3000/api/upload/usuarios/d40ae04f-89b7-453c-a1e3-57bba1653fd9.jpg
router.get('/:tipo/:foto', retornaImagen );



module.exports = router;
=======
router.put('/:tipo/:id', validarJWT, fileUpload);

//http://localhost:3000/api/upload/usuarios/d40ae04f-89b7-453c-a1e3-57bba1653fd9.jpg
router.get('/:tipo/:foto', retornaImagen);

module.exports = router;
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e

const Usuario = require('../models/usuario');
const fs = require('fs');

<<<<<<< HEAD

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    
    switch( tipo ) {
            
        
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        break;
    }

    //llenar el switch en caso de tener mas imagenes que actualizar de acuerdo al modelo

}



module.exports = { 
    actualizarImagen
}
=======
const borrarImagen = (path) => {
  if (fs.existsSync(path)) {
    // borrar la imagen anterior
    fs.unlinkSync(path);
  }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
  let pathViejo = '';

  switch (tipo) {
    case 'usuarios':
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log('No es un usuario por id');
        return false;
      }

      pathViejo = `./uploads/usuarios/${usuario.img}`;
      borrarImagen(pathViejo);

      usuario.img = nombreArchivo;
      await usuario.save();
      return true;

      break;
  }

  //llenar el switch en caso de tener mas imagenes que actualizar de acuerdo al modelo
};

module.exports = {
  actualizarImagen,
};
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e

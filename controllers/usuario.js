const { response } = require('express');
const Usuario = require('../models/usuario');
const Notification = require('../helpers/notifications');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const enviarUnaNotificacionContratar = async(req, res, next) => {

  let _id = req.params.idUsuario;


  await Usuario
  .findOne({_id}, "tokenfirebase")
  .exec((err, usuarios) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando usuario",
        errors: err,
      });
    }


    const element = usuarios.tokenfirebase;
    console.log('ELEMENT: '+element);
    const data = {
      //tokenId: "fZPNNYfBRCeVsHLQPom5e-:APA91bGK8lfvpVxJdoZcu3_3Un0iemfOv1exTFzA4bfkRBTkJd69IzdiK6P0YmZOmtPATqnYG4s2JrihUkK_yz9QPl7X2rDHO1mQik2zrsNsDC67_fdzV4c47HgelLnBOqvg7VT-Gb_Q",
      tokenId: element,
      titulo: "¡Felicidades!",
      mensaje: 'Ha sido contratado en el trabajo que postuló en Trabajos 24/7',
    }
    Notification.sendPushToOneUser(data);

    /*for (let i = 0; i < usuarios.length; i++) {
      const element = usuarios[i].tokenfirebase;
      if(element){
        console.log('hola: '+element)
        const data = {
          //tokenId: "fZPNNYfBRCeVsHLQPom5e-:APA91bGK8lfvpVxJdoZcu3_3Un0iemfOv1exTFzA4bfkRBTkJd69IzdiK6P0YmZOmtPATqnYG4s2JrihUkK_yz9QPl7X2rDHO1mQik2zrsNsDC67_fdzV4c47HgelLnBOqvg7VT-Gb_Q",
          tokenId: element,
          titulo: "Se ha publicado un oferta en Trabajos 24/7",
          mensaje: oferta.titulo + '\n' + oferta.cuerpo,
        }
        Notification.sendPushToOneUser(data);
      
      }
    }*/
    res.status(200).json({
      ok: true,
    });
  })
  };


const getUsuario = async (req, res) => {
  const desde = Number(req.query.desde) || 0;
  const [usuarios, total] = await Promise.all([
    Usuario.find(
      {},
      'nombres apellidos documentoDeIdentidad  numeroDeCelular email '
    )
      .skip(desde)
      .limit(5),

    Usuario.countDocuments(),
  ]);

  res.json({
    ok: true,
    usuarios,
    total,
  });
};

const getUsuarios = async (req, res) => {
  try {
    const users = await Usuario.find({ esAdmin: false });
    res.json({
      ok: true,
      ususario: users,
    });
  } catch (error) {
    res.json({
      ok: false,
      mensaje: 'Error del server',
    });
  }
};

const getUsuariosAdmin = async (req, res) => {
  try {
    const users = await Usuario.find({ _id: { $ne: req.params.id } });
    res.json(users);
  } catch (error) {
    res.json({
      ok: false,
      mensaje: 'Error del server',
    });
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const user = await Usuario.findById(req.params.id);
    res.json({
      ok:true,
      usuario:user
    });
  } catch (error) {
    res.json({
      ok:false,
      mensaje: 'Error, el usuario no existe'
    });
  }
};

const crearUsuario = async (req, res = response) => {
  const { email, password, numeroDeCelular, documentoDeIdentidad } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });
    const existeTelefono = await Usuario.findOne({ numeroDeCelular });
    const existeCedula = await Usuario.findOne({ documentoDeIdentidad });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo electrónico ya existe',
      });
    }

    if (existeTelefono) {
      return res.status(400).json({
        ok: false,
        msg: 'El número de telefono ya existe',
      });
    }

    if (existeCedula) {
      return res.status(400).json({
        ok: false,
        msg: 'El número de cédula ya existe',
      });
    }

    const usuario = new Usuario(req.body);
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar usuario
    await usuario.save();

    //generar token
    const token = await generarJWT(usuario.id);
    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error inesperado, consulta con el administrador',
    });
  }
};

const actualizarUsuario = async (req, res) => {
  const uid = req.params.id;
  try {
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no existe',
      });
    }

    const cambio = {
      ...req.body,
      usuario: uid,
    };
    const token = await generarJWT(usuario.id);
    const usuarioDB = await Usuario.findByIdAndUpdate(uid, cambio, {
      new: true,
    });

    res.json({
      ok: true,
      token,
      usuarioDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error inesperado, consulta con el administrador',
    });
  }
};

   //FUNCIÓN PARA ACTUALIZAR TOKEN DE FIREBASE-FLUTTER
   const actualizarFirebaseTokenUsuario = async (req, res) => {
    let id = req.params.id;
    const { tokenfirebase } = req.body;

    console.log("TOKENFCM: " + tokenfirebase);

    Usuario.findById(id, (err, usuario) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al buscar usuario",
          errors: err,
        });
      }

      if (!usuario) {
        return res.status(400).json({
          ok: false,
          mensaje: "El usuario con el id: " + id + " no existe",
          errors: { message: "No existe un usuario con ese ID" },
        });
      }
      usuario.tokenfirebase = tokenfirebase;

      usuario.save((err, usuarioGuardado) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: "Error al actualizar usuario",
            errors: err,
          });
        }

        res.status(200).json({
          ok: true,
          usuario: usuarioGuardado,
        });
      });
    });
  };

const borrarUsuario = async (req, res) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no existe',
      });
    }

    await Usuario.findByIdAndDelete(uid);
    res.json({
      ok: true,
      msg: 'Usuario Eliminado',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error revise los logs',
    });
  }
};

const cambiarPassword = async (req, res) => {
  const uid = req.params.id;
  const usuario = await Usuario.findById(uid);
  const passAct = req.body.passwordActual;
  const validPassword = bcryptjs.compareSync(passAct, usuario.password);
  try {
    if (validPassword) {
      if (!usuario) {
        return res.status(404).json({
          ok: false,
          msg: 'El usuario no existe',
        });
      }

      const salt = bcryptjs.genSaltSync();
      const pass = bcryptjs.hashSync(req.body.password, salt);
      usuario.password = pass;
      const usuarioDB = await Usuario.findByIdAndUpdate(uid, usuario);

      res.json({
        ok: true,
        usuarioDB,
        msg: 'Su contraseña se ha actualizado correctamente',
      });
    } else {
      res.json({
        ok: false,
        msg: 'La contraseña es actual es incorrecta',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error inesperado, consulta con el administrador',
    });
  }
};

module.exports = {
  getUsuario,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
  getUsuarioById,
  getUsuarios,
  getUsuariosAdmin,
  cambiarPassword,
  actualizarFirebaseTokenUsuario,
  enviarUnaNotificacionContratar,
};

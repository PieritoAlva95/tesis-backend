const { response } = require('express');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const nodemailer = require('nodemailer');

const Oferta = require('../models/oferta');
const Usuario = require('../models/usuario');

require('dotenv').config();
const API_KEY_MAILS = process.env.API_KEY_MAILS;

<<<<<<< HEAD

const enviarUnaNotificacion = async(req, res, next) => {

  let _id = req.params.idOferta;

  const oferta = await ofertaModel.findById(_id);
  console.log(oferta.nombre)

  await usuarioModel
  .find({}, "tokenfirebase")
  .exec((err, usuarios) => {
    
    for (let i = 0; i < usuarios.length; i++) {
      const element = usuarios[i].tokenfirebase;
      if(element){
        console.log('hola: '+element)
        const data = {
          //tokenId: "fZPNNYfBRCeVsHLQPom5e-:APA91bGK8lfvpVxJdoZcu3_3Un0iemfOv1exTFzA4bfkRBTkJd69IzdiK6P0YmZOmtPATqnYG4s2JrihUkK_yz9QPl7X2rDHO1mQik2zrsNsDC67_fdzV4c47HgelLnBOqvg7VT-Gb_Q",
          tokenId: element,
          titulo: "Se ha publicado un oferta en LojaHouse",
          mensaje: oferta.titulo + '\n' + oferta.cuerpo,
        }
        Notification.sendPushToOneUser(data);
      
      }
    }
    res.status(200).json({
      ok: true,
    });
  })
  };





=======
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
const crearOferta = async (req, res = response) => {
  const uid = req.uid;
  const oferta = new Oferta({
    usuario: uid,
    fechaCreacion: new Date().toISOString(),
    ...req.body,
  });

  try {
    const ofertaDB = await oferta.save();
    res.json({
      ok: true,
      medico: ofertaDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'consulte  con el administrador',
    });
  }
};

//ver información de una solo oferta

const verOfertaUnica = async (req, res = response) => {
  try {
    const id = req.params.id;
    const ofertaDB = await Oferta.findById(id);

    if (!ofertaDB) {
      return res.status(404).json({
        ok: true,
        msg: 'Oferta no encontrado por id',
      });
    }

    res.json({
      ok: true,
      ofertaDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'consulte  con el administrador',
    });
  }
};

//ver todas las ofertas
const verOfertas = async (req, res) => {
  const desde = Number(req.query.desde) || 0;
  const [ofertas, total] = await Promise.all([
    Oferta.find({
      disponible: 'sin contrato',
      status: true,
<<<<<<< HEAD
      statusUser: true
=======
      statusUser: true,
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
    }).sort({ fechaCreacion: -1 }),

    Oferta.countDocuments(),
  ]);

  res.json({
    ok: true,
    ofertas,
    total,
  });
};

const verOfertasAdmin = async (req, res) => {
  const desde = Number(req.query.desde) || 0;
  const [ofertas, total] = await Promise.all([
<<<<<<< HEAD
    Oferta.find({statusUser: true}).sort({ fechaCreacion: -1 }),
=======
    Oferta.find({ statusUser: true }).sort({ fechaCreacion: -1 }),
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e

    Oferta.countDocuments(),
  ]);

  res.json({
    ok: true,
    ofertas,
    total,
  });
};

const verOfertasByUser = async (req, res) => {
  const listaOfertas = await Oferta.find({
    usuario: req.params.id,
<<<<<<< HEAD
    disponible: 'sin contrato', status: true, statusUser: true
=======
    disponible: 'sin contrato',
    status: true,
    statusUser: true,
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
  }).sort({ fechaCreacion: -1 });
  res.json(listaOfertas);
};

const getOfertasByUser = async (req, res) => {
  const listaOfertas = await Oferta.find({
<<<<<<< HEAD
    usuario: req.params.id
=======
    usuario: req.params.id,
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
  });
  res.json(listaOfertas);
};

const bloquearOfertasUser = async (req, res) => {
  try {
<<<<<<< HEAD

    const listaOfertas = await Oferta.find({
      usuario: req.params.id, statusUser: true
    });

    listaOfertas.forEach(oferta => {
    desactivarOfertas(oferta);
    });

    res.status(200).json({
      ok:true,
      msg:"Usuario y ofertas bloqueado correctamente"
    });

=======
    const listaOfertas = await Oferta.find({
      usuario: req.params.id,
      statusUser: true,
    });

    listaOfertas.forEach((oferta) => {
      desactivarOfertas(oferta);
    });

    res.status(200).json({
      ok: true,
      msg: 'Usuario y ofertas bloqueado correctamente',
    });
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al Bloquear el usuario',
    });
  }
<<<<<<< HEAD
}

const desactivarOfertas = async(oferta) => {
  console.log(oferta.statusUser);
  
    const statusUser = {statusUser: false };

    await Oferta.findByIdAndUpdate(oferta._id, {$set: statusUser});
}

const verContratosUser = async (req, res) => {
  const listaOfertas = await Oferta.find({ disponible: 'con contrato', status: true, statusUser: true }).sort({
=======
};

const desactivarOfertas = async (oferta) => {
  console.log(oferta.statusUser);

  const statusUser = { statusUser: false };

  await Oferta.findByIdAndUpdate(oferta._id, { $set: statusUser });
};

const verContratosUser = async (req, res) => {
  const listaOfertas = await Oferta.find({
    disponible: 'con contrato',
    status: true,
    statusUser: true,
  }).sort({
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
    fechaCreacion: -1,
  });
  let lista = [];
  listaOfertas.forEach((oferta) => {
    oferta.interesados.forEach((interesado) => {
      if (interesado.postulante == req.params.id) {
        lista.push(oferta);
      }
    });
  });
  res.json(lista);
};

const verOfertasContratadasByUser = async (req, res) => {
  const listaOfertas = await Oferta.find({
    usuario: req.params.id,
    disponible: 'con contrato',
    status: true,
<<<<<<< HEAD
    statusUser: true
=======
    statusUser: true,
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
  }).sort({ fechaCreacion: -1 });
  res.json(listaOfertas);
};

const getOfertasDiferentesUser = async (req, res) => {
  const listaOfertas = await Oferta.find({
    usuario: { $ne: req.params.id },
    disponible: 'sin contrato',
    status: true,
<<<<<<< HEAD
    statusUser: true
=======
    statusUser: true,
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
  }).sort({ fechaCreacion: -1 });
  res.json(listaOfertas);
};

<<<<<<< HEAD
const getOfertasMovilUserLogueado = async (req, res) => {
  const listaOfertas = await Oferta.find({
    usuario: { $ne: req.params.id },
    disponible: 'sin contrato',
    status: true,
    statusUser: true
  }).sort({ fechaCreacion: -1 });
  res.json({
    ok: true,
    ofertas: listaOfertas
  });
  //json(listaOfertas);
};

=======
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
const getBuscarOfertas = async (req, res) => {
  try {
    if (req.params.text == '') {
      res.json({
        ok: true,
        ofertas: {},
      });
    } else {
      const busqueda = await Oferta.find({
        titulo: new RegExp(req.params.text),
        disponible: 'sin contrato',
        status: true,
<<<<<<< HEAD
        statusUser: true
=======
        statusUser: true,
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
      }).sort({ fechaCreacion: -1 });
      res.json({
        ok: true,
        ofertas: busqueda,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Consulte  con el administrador',
    });
  }
};

const getBuscarOfertasUser = async (req, res) => {
  try {
    if (req.params.text == '') {
      res.json({
        ok: true,
        ofertas: {},
      });
    } else {
      const busqueda = await Oferta.find({
        titulo: new RegExp(req.params.text),
        usuario: { $ne: req.params.id },
<<<<<<< HEAD
        disponible: 'sin contrato', status: true,
        statusUser: true
=======
        disponible: 'sin contrato',
        status: true,
        statusUser: true,
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
      }).sort({ fechaCreacion: -1 });
      res.json({
        ok: true,
        ofertas: busqueda,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Consulte  con el administrador',
    });
  }
};

const getOfertasByCategoria = async (req, res) => {
  try {
    if (req.params.text == '') {
      res.json({
        ok: true,
        ofertas: {},
      });
    } else {
      const busqueda = await Oferta.find({
        categoria: new RegExp(req.params.text),
<<<<<<< HEAD
        disponible: 'sin contrato', status: true,
        statusUser: true
=======
        disponible: 'sin contrato',
        status: true,
        statusUser: true,
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
      }).sort({ fechaCreacion: -1 });
      res.json({
        ok: true,
        ofertas: busqueda,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Consulte  con el administrador',
    });
  }
};

const getOfertasByCategoriaUser = async (req, res) => {
  try {
    if (req.params.text == '') {
      res.json({
        ok: true,
        ofertas: {},
      });
    } else {
      const busqueda = await Oferta.find({
        categoria: new RegExp(req.params.text),
        usuario: { $ne: req.params.id },
<<<<<<< HEAD
        disponible: 'sin contrato', status: true,
        statusUser: true
=======
        disponible: 'sin contrato',
        status: true,
        statusUser: true,
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
      }).sort({ fechaCreacion: -1 });
      res.json({
        ok: true,
        ofertas: busqueda,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Consulte  con el administrador',
    });
  }
};

const actualizarOferta = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const ofertaDB = await Oferta.findById(id);

    if (!ofertaDB) {
      return res.status(404).json({
        ok: true,
        msg: 'Oferta no encontrado por id',
      });
    }

    const cambioOferta = {
<<<<<<< HEAD
      ...req.body
=======
      ...req.body,
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
    };

    if (cambioOferta.interesados.aceptado === true) {
      const idUsuarioContratado = cambioOferta.interesados.postulante;
      const usuarioContratado = await Usuario.findById(idUsuarioContratado);
      const usuarioQueContrata = await Usuario.findById(cambioOferta.usuario);
      if (usuarioContratado && usuarioQueContrata) {
        const emailUsuarioContratado = usuarioContratado.email;
        const emailUsuarioQueContrata = usuarioQueContrata.email;
        const celularUsuarioQueContrata = usuarioQueContrata.numeroDeCelular;
        const transporter = nodemailer.createTransport(
          sendgridTransport({
            auth: {
              api_key: API_KEY_MAILS,
            },
          })
        );

        let mailOptions = {
          to: emailUsuarioContratado,
          from: 'jpalvaradoc@unl.edu.ec',
          subject: 'Notificación de contrato Jobs - Trabajos 24/7',
          html: `
              <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
                <tr height="200px">
                  <td bgcolor="" width="600"px>
                    <h1 style="color: #fff; text-align:center">Notificación de contrato</h1>
                    <p style="color:#fff; text-align:center">
                      <span style:"color: #fff">Nos place comunicarte que has sido contratado en la oferta </span><br>
                      <span style:"color: #fff">con titulo: ${cambioOferta.titulo} publicada por ${cambioOferta.nombreUsuario}</span><br><br>
                      <span style:"color: #fff">te puedes contactar mediante el correo ${emailUsuarioQueContrata}</span><br><br>
                      <span style:"color: #fff"> o al numero de celular ${celularUsuarioQueContrata}</span><br><br>
                      <span style:"color: #fff"><b>No te olvides de ingresar a la plataforma y revisar la seccion de contratos</b></span><br>
                      <span style:"color: #fff"><b>Gracias por confiar en nosotros!</b></span><br>
                    </p>
                  </td>
                </tr>
            
                <tr bgcolor="#fafafa">
                  <td style="text-align:center">
                    <p><a href="#">Inicia Sesión en Trabajos 24/7</a></p>
                  </td>
                </tr>
            
              </table>
              `,
        };

        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            return res.status(404).json({
              ok: false,
              msg: `Ha ocurrido un problema en el envio del correo. Error: ${err}`,
            });
          }
        });
      }
    }

    const ofertaActualizado = await Oferta.findByIdAndUpdate(id, cambioOferta, {
      new: true,
    });

    res.json({
      ok: true,
      oferta: ofertaActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Consulte  con el administrador',
    });
  }
};

const borrarOferta = async (req, res = response) => {
  const id = req.params.id;

  try {
    const oferta = await Oferta.findById(id);
    if (!oferta) {
      return res.status(404).json({
        ok: true,
        msg: 'oferta no encontrado por id',
      });
    }
    await Oferta.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: 'Oferta borrado',
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

module.exports = {
  crearOferta,
  actualizarOferta,
  verOfertaUnica,
  verOfertas,
  borrarOferta,
  verOfertasByUser,
  getOfertasDiferentesUser,
<<<<<<< HEAD
  getOfertasMovilUserLogueado,
=======
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
  verOfertasContratadasByUser,
  getBuscarOfertas,
  getOfertasByCategoria,
  getBuscarOfertasUser,
  getOfertasByCategoriaUser,
  verContratosUser,
  verOfertasAdmin,
  bloquearOfertasUser,
  getOfertasByUser,
<<<<<<< HEAD
  enviarUnaNotificacion,

=======
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
};

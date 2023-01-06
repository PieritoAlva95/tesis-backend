const { response } = require('express');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const nodemailer = require('nodemailer');

const Oferta = require('../models/oferta');
const Usuario = require('../models/usuario');
const Notification = require('../helpers/notifications');

require('dotenv').config();
const API_KEY_MAILS = process.env.API_KEY_MAILS;


const enviarUnaNotificacion = async (req, res, next) => {

  let _id = req.params.idOferta;

  const oferta = await Oferta.findById(_id);
  console.log(oferta.nombre)

  await Usuario
    .find({}, "tokenfirebase")
    .exec((err, usuarios) => {

      for (let i = 0; i < usuarios.length; i++) {
        const element = usuarios[i].tokenfirebase;
        if (element) {
          console.log('hola: ' + element)
          const data = {
            //tokenId: "fZPNNYfBRCeVsHLQPom5e-:APA91bGK8lfvpVxJdoZcu3_3Un0iemfOv1exTFzA4bfkRBTkJd69IzdiK6P0YmZOmtPATqnYG4s2JrihUkK_yz9QPl7X2rDHO1mQik2zrsNsDC67_fdzV4c47HgelLnBOqvg7VT-Gb_Q",
            tokenId: element,
            titulo: "Se ha publicado un oferta en Trabajos 24/7",
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
      statusUser: true
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
    Oferta.find({ statusUser: true }).sort({ fechaCreacion: -1 }),

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
    disponible: 'sin contrato', status: true, statusUser: true
  }).sort({ fechaCreacion: -1 });
  res.json(listaOfertas);
};

const getOfertasByUser = async (req, res) => {
  const listaOfertas = await Oferta.find({
    usuario: req.params.id
  });
  res.json(listaOfertas);
};

const bloquearOfertasUser = async (req, res) => {
  try {

    const listaOfertas = await Oferta.find({
      usuario: req.params.id, statusUser: true
    });

    listaOfertas.forEach(oferta => {
      desactivarOfertas(oferta);
    });

    res.status(200).json({
      ok: true,
      msg: "Usuario y ofertas bloqueado correctamente"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al Bloquear el usuario',
    });
  }
}

const desactivarOfertas = async (oferta) => {
  console.log(oferta.statusUser);

  const statusUser = { statusUser: false };

  await Oferta.findByIdAndUpdate(oferta._id, { $set: statusUser });
}

const verContratosUser = async (req, res) => {
  const listaOfertas = await Oferta.find({ disponible: 'con contrato', status: true, statusUser: true }).sort({
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
    statusUser: true
  }).sort({ fechaCreacion: -1 });
  res.json(listaOfertas);
};

const getOfertasDiferentesUser = async (req, res) => {
  const listaOfertas = await Oferta.find({
    usuario: { $ne: req.params.id },
    disponible: 'sin contrato',
    status: true,
    statusUser: true
  }).sort({ fechaCreacion: -1 });
  res.json(listaOfertas);
};

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
        statusUser: true
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
        disponible: 'sin contrato', status: true,
        statusUser: true
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
        disponible: 'sin contrato', status: true,
        statusUser: true
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
        disponible: 'sin contrato', status: true,
        statusUser: true
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

  try {
    const ofertaDB = await Oferta.findById(id);
    console.log(`ofertaDB: ${ofertaDB}`)

    if (!ofertaDB) {
      return res.status(404).json({
        ok: true,
        msg: 'Oferta no encontrado por id',
      });
    }

    const cambioOferta = {
      ...req.body,
    };

    console.log(`CAMBIO_OFERTA: ${JSON.stringify(cambioOferta)}`)

    const ofertaActualizado = await Oferta.findByIdAndUpdate(id, cambioOferta, {
      new: true,
    }, (error, oferta) => {
      if (error) {
        return res.status(404).json({
          ok: false,
          msg: "Ha ocurrido un error en la actualizacion!",
        })
      }
      console.log(`OFERTA ACTUALIZADA: ${JSON.stringify(oferta)}`)
    });

    if (ofertaActualizado) {
      const resultado = ofertaActualizado.interesados.filter(
        interesado => interesado.aceptado === true
      )
      console.log(`RESULTADO: ${resultado} es de tipo : ${typeof (resultado)}`)
      const objResultado = { ...resultado }
      console.log(`OBJ_RESULTADO ${objResultado}`)
      resultado.forEach(
        interesado => console.log(`POSTULANTE: ${interesado.postulante}`)
      )
    }

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
  getOfertasMovilUserLogueado,
  verOfertasContratadasByUser,
  getBuscarOfertas,
  getOfertasByCategoria,
  getBuscarOfertasUser,
  getOfertasByCategoriaUser,
  verContratosUser,
  verOfertasAdmin,
  bloquearOfertasUser,
  getOfertasByUser,
  enviarUnaNotificacion,

};

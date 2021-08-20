const { response } = require('express');
const Oferta = require('../models/oferta');

//ingresar postulaciones
const actualizarOferta = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.body.usuario;
  try {
    const ofertaDB = await Oferta.findById(id);

    if (!ofertaDB) {
      return res.status(404).json({
        ok: true,
        msg: 'Oferta no encontrado por id',
      });
    }

    const cambioOferta = {
      ...req.body,
      usuario: uid,
    };

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
      msg: 'consulte  con el administrador',
    });
  }
};

module.exports = {
  actualizarOferta,
};

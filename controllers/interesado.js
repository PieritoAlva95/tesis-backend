const { response } = require('express');
const Oferta = require('../models/oferta');

//ingresar postulaciones
const actualizarOferta = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.body.usuario;

  try {
    const config = {
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'workjobstesis@gmail.com',
        pass: 'mslvplvwdeyxtyvq'
      }
    }
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

    if (cambioOferta.interesados.aceptado === true) {
      const idUsuarioContratado = cambioOferta.interesados.postulante;
      const usuarioContratado = await Usuario.findById(idUsuarioContratado);
      const usuarioQueContrata = await Usuario.findById(cambioOferta.usuario);
      if (usuarioContratado && usuarioQueContrata) {
        const emailUsuarioContratado = usuarioContratado.email;
        const emailUsuarioQueContrata = usuarioQueContrata.email;
        const celularUsuarioQueContrata = usuarioQueContrata.numeroDeCelular;

        let mailOptions = {
          to: emailUsuarioContratado,
          from: 'workjobstesis@gmail.com',
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
              </table>
              `,
        };

        const transport = nodemailer.createTransport(config);

        transport.sendMail(mailOptions, (err) => {
          if (err) {
            return res.status(404).json({
              ok: false,
              msg: `Ha ocurrido un problema en el envio del correo. Error: ${err}`,
            });
          }
          console.log(`NO_HUBO_ERROR_MAIL`)
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
    res.status(500).json({
      ok: false,
      msg: '/api/postulante/:id - Ha ocurrido un error, consulte con el administrador!',
      error: error.toString()
    });
  }
};

module.exports = {
  actualizarOferta,
};

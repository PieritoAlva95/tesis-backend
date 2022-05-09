const bcryptjs = require('bcryptjs');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const nodemailer = require('nodemailer');

const Usuario = require('../models/usuario');

require('dotenv').config();
const API_KEY_MAILS = process.env.API_KEY_MAILS;

const resetearPassword = async (req, res) => {
  const userEmail = req.body.email;

  try {
    const usuarioDB = await Usuario.findOne({ email: userEmail });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no existe',
      });
    }

    const passwordNueva = Math.floor(100000 + Math.random() * 900000) + '';
    passwordEncriptada = await bcryptjs.hash(passwordNueva, 12);

    await Usuario.findOneAndUpdate(
      { _id: usuarioDB.id },
      { password: passwordEncriptada },
      (error) => {
        if (error) {
          return res.status(404).json({
            ok: false,
            msg: 'Ha ocurrido un error en el cambio de contraseña.',
          });
        } else {
          const transporter = nodemailer.createTransport(
            sendgridTransport({
              auth: {
                api_key: API_KEY_MAILS,
              },
            })
          );

          let mailOptions = {
            to: userEmail,
            from: 'jpalvaradoc@unl.edu.ec',
            subject: 'Cambio de contraseña Jobs - Trabajos 24/7',
            html: `
              <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
                <tr height="200px">
                  <td bgcolor="" width="600"px>
                    <h1 style="color: #fff; text-align:center">Cambio de Contraseña</h1>
                    <p style="color:#fff; text-align:center">
                      <span style:"color: #fff">Se ha cambiado tu contraseña, puedes acceder con tu</span><br>
                      <span style:"color: #fff">correo: ${userEmail} y tu nueva contraseña: ${passwordNueva}</span><br><br>
                      <span style:"color: #fff"><b>NO TE OLVIDES DE ACTUALIZAR TU CONTRASEÑA CUANDO VUELVAS A INGRESAR A LA PLATAFORMA</b></span><br>
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
    );

    res.json({
      ok: true,
      msg: 'La contraseña ha sido actualizada con éxito. Por favor revise su correo electrónico.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Se ha producido un error inesperado.',
    });
  }
};

module.exports = {
  resetearPassword,
};

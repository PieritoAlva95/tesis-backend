const { Schema, model } = require('mongoose');

const OfertaSchema = Schema(
  {
    titulo: { type: String, require: true },
    cuerpo: { type: String, require: true },
    precio: { type: Number, require: true },
    tipoPago: { type: String, require: true },
    categoria: { type: String, require: true },
    usuario: { require: true, type: Schema.Types.ObjectId, ref: 'Usuario' },
    nombreUsuario: { require: true, type: String },
    fechaCreacion: { type: String },
    interesados: [
      {
        postulante: { type: String, require: true },
        nombres: { type: String, require: true },
        img: { type: String },
        aceptado: { type: Boolean, require: true, default: false },
        fechaPostulacion: { type: Date, default: Date.now() },
      },
    ],
    disponible: { type: String, default: 'sin contrato' },
    status: { type: Boolean, default: true },
    statusUser: { type: Boolean, default: true }
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = model('Oferta', OfertaSchema);

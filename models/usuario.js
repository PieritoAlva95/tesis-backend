const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema(
  {
    nombres: { type: String, require: true },
    apellidos: { type: String, require: true },
    documentoDeIdentidad: { type: String, require: true },
    numeroDeCelular: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    img: { type: String, default: 'no-img.jpg' },
    skills: [{ type: String, require: false, default: '' }],
<<<<<<< HEAD
    bio: { type: String, require:'' },
=======
    bio: { type: String, require: '' },
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
    redesSociales: {
      twitter: { type: String, default: '' },
      facebook: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    experiencia: [
      {
        titulo: { type: String },
        empresa: { type: String },
        fechaInicio: { type: String },
        fechaFin: { type: String },
        descripcion: { type: String },
      },
    ],
    estudios: [
      {
        nombreInstitucion: { type: String },
        titulo: { type: String },
        fechaInicio: { type: String },
        fechaFin: { type: String },
        descripcion: { type: String },
      },
    ],
    esAdmin: { type: Boolean, default: false },
    fechaCreacion: { type: Date, default: Date.now() },
<<<<<<< HEAD
    activo:{type:Boolean, default:true},
    tokenfirebase: {type: String, unique: [true, 'El token debe ser único']},
=======
    activo: { type: Boolean, default: true },
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

//para modificar el _id de la tabla cambia de _id a uid
UsuarioSchema.method('toJSON', function () {
  //esto extraigo y cuando haga un get no lo devuelvo
  const { __v, _id, password, ...object } = this.toObject();

  object.uid = _id;
  return object;
});

module.exports = model('Usuario', UsuarioSchema);

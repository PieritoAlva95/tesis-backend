require('dotenv').config(); //leo las variables de entorno
require('./db/config');

const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

//Servidor expresss
const app = express();

//Archivo de LOGS
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

//Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/login'));
app.use('/api/resetear-password', require('./routes/resetearPassword'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/oferta', require('./routes/ofertas'));
app.use('/uploads', express.static(path.resolve('./uploads/usuarios')));
app.use('/api/postulante', require('./routes/interesado'));

app.listen(process.env.PORT, () => {
  console.log('servidor corriendo correctamente');
});

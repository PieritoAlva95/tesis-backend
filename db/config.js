const mongoose = require('mongoose');
<<<<<<< HEAD
require('dotenv').config();  //leo las variables de entorno


mongoose.connect(process.env.DB_CNN, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('base de datos conectado'))
    .catch(err => console.log(err));
=======
require('dotenv').config(); //leo las variables de entorno

mongoose
  .connect(process.env.DB_CNN, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((db) => console.log('base de datos conectado'))
  .catch((err) => console.log(err));
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e

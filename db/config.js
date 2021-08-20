const mongoose = require('mongoose');
require('dotenv').config();  //leo las variables de entorno


mongoose.connect(process.env.DB_CNN, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('base de datos conectado'))
    .catch(err => console.log(err));
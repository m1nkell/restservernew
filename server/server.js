require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

<<<<<<< HEAD
app.use(require('./routes/usuario'));
=======

//Configuracion global de rutas
app.use(require('./routes/index'));
>>>>>>> Login de la seccion 10

 mongoose.connect(process.env.URLDB,
                                { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
                                (err,res) => {
    
    if (err) throw err;
    
    console.log(`Servidor ON LINE`);

});


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});
// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

<<<<<<< HEAD
=======

// ============================
//  Fecha de caducidad de TOKEN
// ============================

process.env.CADUCIDAD_TOKEN = 60*60*24*30;


// ============================
//  SEED del TOKEN
// ============================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


>>>>>>> Login de la seccion 10
let url;

if( process.env.NODE_ENV === 'dev' ){
    url = 'mongodb://localhost:27017/cafe';
}else{
    url = process.env.MONGO_URI;
}

process.env.URLDB = url;




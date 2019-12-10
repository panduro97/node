// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  SEED de autenticacion
// ============================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ============================
//  vencimiento del token
// ============================

    process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ============================
//  base de datos
// ============================

let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ============================
//  google cliente id
// ============================

process.env.CLIENT_ID = process.env.CLIENTE_ID || "330641136536-u25hfl9s5g0k2eecd42nkkv86gnaof6h.apps.googleusercontent.com";

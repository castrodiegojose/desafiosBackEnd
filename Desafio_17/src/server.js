///////////////// IMPORTS////////////////////
//----------- Librerias --------------------//
import express, { json } from 'express';
import dotenv from 'dotenv';
dotenv.config();



//---------- Modulos ------------------------//
import port from './options/env.js'
import './signupDB.js'
//import  MensajeService  from "./services/mensajesService.js"
import  ProductService  from "./services/productosService.js"
import router from './routes/routes.js';


const app = express();

const classMAria = new ProductService()
await classMAria.checkAndCreateTable();


///////////////// MIDDLEWARES////////////////////

app.use(express.json())
app.use(express.urlencoded({extended: true}));

// ///////////////// RUTAS ////////////////////
app.use('/', router)

///////////////// SERVER ////////////////////

app.listen( port, function () {
    console.log(`listening on port ${port}`);
}); 




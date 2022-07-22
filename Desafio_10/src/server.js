///////////////// IMPORTS////////////////////
//----------- Librerias --------------------//
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path'
//---------- Persistencia por Mongo -----------//
import MongoStore from 'connect-mongo';
//---------- Modulos ------------------------//
import {classMAria, classSqLite} from './classDB.js';
import router from './routes/routes.js';

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

classSqLite.createTableMsj();
classMAria.createTable();

///////////////// MIDDLEWARES////////////////////

//------- SESSION -----------//
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://diego:32882457@cluster0.dcufv.mongodb.net/DiegoDB?retryWrites=true&w=majority',
        ttl: 10}),
    secret: '1234567890!"#$%&/()=',
    resave: false,
    saveUninitialized: false,
    cookie:{
         //maxAge:60000
        expires:60000
    }
}))
//------- MOTOR DE PLANTILLAS --------//
app.use(express.static("./src/public"));
app.set("views", "./src/views");
app.set("view engine", ".ejs");
app.use(express.urlencoded({extended: true}));

// ///////////////// RUTAS ////////////////////
app.use('/', router)

///////////////// SERVER ////////////////////

httpServer.listen(8080, function () {
    console.log('listening on port 8080');
}); 

///////////////// WEB SOCKET ////////////////////

io.on('connection', socket => {
    console.log(`Un cliente se ha conectado:${socket.id.substring(0,4)}`);
    let productos=[];
    socket.on('new-product', async (data) => {
        classMAria.guardarProducto(data)
        productos = await classMAria.getAllProducts();
        io.sockets.emit('product-refresh', productos);
    });
    
    socket.on('new-message', async (data) => {
        let mensajes=[];
        classSqLite.guardarMensaje(data)
        mensajes = await classSqLite.getAllMessages()
        io.sockets.emit('message-refresh', mensajes);
    });
});






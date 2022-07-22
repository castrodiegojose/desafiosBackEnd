const path = require('path');
const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);

httpServer.listen(8080, function () {
    console.log('listening on port 8080');
});


const io = new IOServer(httpServer);


app.use(express.static(__dirname + '/public'));
app.set("views", __dirname + "/views")
app.set("view engine", ".ejs");



const productos = []


const mensajes = []

// escucho si un cliente se conecta

app.get('/', function (req, res) {
    res.render('index', {productos, mensajes});
})




io.on('connection', socket => {
    
    console.log(`Un cliente se ha conectado:${socket.id.substring(0,4)}`);

       
    socket.on('new-product', (data) => {
        console.log(data)
        productos.push(data)
        io.sockets.emit('product-refresh', productos);
    });

  
    
    socket.on('new-message', (data) => {

        console.log(data)
        mensajes.push(data);
        io.sockets.emit('message-refresh', mensajes);
    });
    
    
});






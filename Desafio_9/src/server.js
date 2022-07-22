
const BaseMaria = require('./classDB.js')
const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const RandomCat = require('./classRandomCats.js')

// const {mysqlOptions} = require('./options/mariaDB');
// const {sqLite} = require('./options/sqliteDB.js') 

const app = express();
const httpServer = new HttpServer(app);



const io = new IOServer(httpServer);


app.use(express.static(__dirname + '/public'));
app.set("views", __dirname + "/views")
app.set("view engine", ".ejs");

/// genero dos clases una con la conf de mariaDB y otra con Sqlite
const classMAria = new BaseMaria();
const classSqLite = new BaseMaria();
const classRandom = new RandomCat();


classSqLite.createTableMsj();
classMAria.createTable();
    

// escucho si un cliente se conecta

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/', async (req, res) => {    
  
    
    const productos = await classMAria.getAllProducts()
    const mensajes = await classSqLite.getAllMessages()
    console.log(productos)
    console.log(mensajes)
    res.render('index', {productos, mensajes})     
    
    
})

app.get('/api/gatos-test', async (req, res) => {

    const catsRandom = await classRandom.catsRandom();
    //console.log(prodRandom)
    res.render('catTest', {catsRandom})
})


httpServer.listen(8080, function () {
    console.log('listening on port 8080');
}); 



io.on('connection', socket => {
    
    console.log(`Un cliente se ha conectado:${socket.id.substring(0,4)}`);

       
    socket.on('new-product', async (data) => {

        console.log(data)
        classMAria.guardarProducto(data)
        productos = await classMAria.getAllProducts();
        io.sockets.emit('product-refresh', productos);
    });

  
    
    socket.on('new-message', async (data) => {

        console.log(data)
        classSqLite.guardarMensaje(data)
        mensajes = await classSqLite.getAllMessages()

        io.sockets.emit('message-refresh', mensajes);
    });
    
    
});






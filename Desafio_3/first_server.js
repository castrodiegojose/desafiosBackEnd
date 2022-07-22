const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');

app.listen(port,()=>{
    console.log("servidor escuchando en el puerto:",port)
})
app.on("error", error => console.log(`Error en servidor : ${error}`))



class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    this.array = [];
  }

  getById() {

    const min = 1;
    const max = 4

    let num =  Math.floor(Math.random() * (max - min) + min);

    let readFile = fs.readFileSync(`${this.nombreArchivo}`, "utf-8");

    this.array = JSON.parse(readFile);

    const i = this.array.find((item) => item.id === num);

    if (i) return JSON.stringify(i);

    return null;
    
  }


  getAll() {

    let readFile = fs.readFileSync(`${this.nombreArchivo}`, "utf-8");

    return readFile;

  }
}

const prueba = new Contenedor('./productos.txt');



app.get('/', (req,res)=>{
    res.send(`<h1 style="color:blue"> BIENVENIDOS AL DESAFIO NUMERO 3 </h1>`);
})


app.get('/productos', (req,res)=>{

    productos = prueba.getAll()
    
    res.send(
       
        `<h1 style="color:blue"> Todos los productos : ${productos}</h1>`
    
    );
})


app.get('/productosRandom', (req,res)=>{
    
    productoran = prueba.getById();

    res.send(
       
        `<h1 style="color:blue"> Producto al azar : ${productoran}</h1>`
    
    );
})
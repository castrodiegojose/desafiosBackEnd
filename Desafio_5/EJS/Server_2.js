const express = require('express');
//const { get } = require('express/lib/response');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views")



const productos = []

app.get("/productos",(req,res)=>{

  res.render("index", {productos})
})


app.post('/productos',(req,res)=>{
  
  let newProd = req.body
  productos.push(newProd)
  res.render("index",{productos})
  
})

app.get("/productosHandle", (req,res)=>{
  res.render("prodtable",{productos})
})


app.listen(port,()=>{
    console.log("servidor escuchando en el puerto:",port)
})
app.on("error", error => console.log(`Error en servidor : ${error}`))


const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// motor de plantillas

app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  defaultsLayout: 'index.hbs',
  layoutsDir: __dirname + '/views',
  partialsDir: __dirname + '/views/partials'
}))

app.set("view engine", "hbs");
app.set("views", __dirname + "/views")



const productos = []

app.get("/productos",(req,res)=>{

  res.render("main", {productos})
})


app.post('/productos',(req,res)=>{
  
  let newProd = req.body
  productos.push(newProd)
  res.render("main",{productos})
  
})

app.get("/productosHandle", (req,res)=>{
  res.render("index",{productos})
})


app.listen(port,()=>{
    console.log("servidor escuchando en el puerto:",port)
})
app.on("error", error => console.log(`Error en servidor : ${error}`))


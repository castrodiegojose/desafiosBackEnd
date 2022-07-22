const express = require('express');
//const { get } = require('express/lib/response');
const app = express();


const port = 8080;

app.use('/static', express.static(__dirname+'/public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

class Contenedor {
    constructor(productos) {
      this.productos= [];
    }

    getAll() {

        return this.productos;    

    }

    getById(num) {


        //console.log(this.productos);

        const i = this.productos.find(item => item.id === num);


        if (i) return i;
    
        return null;
        
    }

    async save(objeto) {
        try {
                       
          let newid = this.productos.length + 1;
    
          //console.log(newid);
    
          objeto.id = newid;
    
          this.productos.push(objeto);    
          
        } 
        catch (err) {
          console.error("ERROR AL ESCRIBIR EL ARCHIVO", err);
        }
      }

    deleteById(id) {

       
      const index = this.productos.findIndex(item => item.id === id)

      console.log(this.productos.index)

      this.productos.splice(index,1)


      return ({'Se elimino el producto con el siguiente id': id})
  
        
    }

    putUpload(id, newprod){

      const index = this.productos.findIndex(item => item.id === id)
   
      newprod.id = id

      this.productos[index] = newprod

      return ({'Se actualizo el siguiente producto': newprod})


    }
    
}

const productos = new Contenedor();




app.route('/api/productos/')
    .get((req, res) =>{
        
        res.send(productos.getAll())

    })
    .post((req, res) =>{

        newproduct=req.body

        productos.save(newproduct)

        res.send({'producto agregado':newproduct});
    })


app.route('/api/productos/:id')
    
    .get((req, res) =>{

        id = parseInt(req.params.id)

        if(productos.getById(id) == null){
          res.send({error:'producto no encontrado'})
        }
        else{    
          res.send(productos.getById(id))
        }    
    })

    .put((req, res) =>{
        id = parseInt(req.params.id)
        newprod = req.body

        res.send(productos.putUpload(id, newprod))

    })

    .delete((req, res) =>{
        id = parseInt(req.params.id)
        res.send(productos.deleteById(id))

    })



app.listen(port,()=>{
    console.log("servidor escuchando en el puerto:",port)
})
app.on("error", error => console.log(`Error en servidor : ${error}`))
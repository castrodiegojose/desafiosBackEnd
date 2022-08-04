import ProductService  from "../services/productosService.js"
const classMAria = new ProductService()

//import   crypto  from "crypto";
//import { Producto }  from "../models/productoGraphql.js";

async function getProductos({ campo, valor }) {
    let productos = await classMAria.getAllProducts()
    if( campo && valor ){
        return productos.filter(p=>p[ campo ] == valor);
    } else {
        return productos;
    }
}

async function getProducto ({ id }) {
    let producto = await classMAria.getProductById(id)
    if(!producto) {
        throw new Error ('Producto not found');
    } else {
        return producto[0];
    }
} 

async function createProducto({datos}){
    const nuevoProducto = JSON.parse(JSON.stringify(datos))
    //const nuevoProducto = new Producto(datosOrden);
    //console.log("entro en el controller", nuevoProducto)

    let created = await classMAria.saveProduct(nuevoProducto)
    console.log(created)
    if(created === null)  throw new Error ("The product is already saved"); 
    return nuevoProducto;
}

export { getProducto, getProductos, createProducto } 
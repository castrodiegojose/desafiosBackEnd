import { buildSchema } from "graphql";

// class Producto{
//     constructor( producto, precio, foto){
//         this.producto = producto;
//         this.precio = precio;
//         this.foto = foto;
//     }
// }

// id: ID!
const schema = buildSchema (`
    type Producto {
        id:ID!,
        producto: String,
        precio: Float,
        foto: String
    }
    input ProductoInput{
        producto: String,
        precio: Float,
        foto: String
    }
    type Query{
        getProductos(campo: String, valor:String) : [Producto],
        getProducto(_id:ID!): Producto
    }
    type Mutation {
        createProducto(datos: ProductoInput): Producto
    }`
);

// export {Producto, schema};
export {schema};
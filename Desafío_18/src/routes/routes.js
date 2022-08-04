import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from "../models/productoGraphql.js";
import { createProducto, getProducto, getProductos } from "../controllers/controllerGraphql.js";


const router = express.Router();
//const Controller = Controllers.getInstance()


//----------- RUTAS --------------//


router.use('/graphql/productos',graphqlHTTP({
    schema: schema,
    rootValue:{
        getProducto,
        getProductos,
        createProducto
    },
    graphiql: true,
}))


export default router
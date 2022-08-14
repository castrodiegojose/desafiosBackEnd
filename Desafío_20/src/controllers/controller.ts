// deno-lint-ignore-file
import DaoProductos from '../DAO/daoProductos.ts'
import { Request, Response } from '../../deps.ts'

//import "../passport/local-auth.js"


const daoProductos = new DaoProductos()
let instance: any = null

export default class Controllers{
   
    async prodsGet({ response }: { response: any }){        
        const productos = await daoProductos.getProducts()
        if (!productos){
            response.status = 500;
            response.body = {
                success: false,
                msg: "Server Error",
            }
        }
        else {
            response.status = 200;
            response.body = {
                success: true,
                data: productos,
            }
        }
    }

    async prodGet({ params, response }:{
        params: { id: any };
        response: any;
    }){
        console.log("en controller:", params.id)
        const producto = await daoProductos.getProduct(parseInt(params.id))
        if(!producto){
            response.status = 404;
            response.body = {
                success : false,
                msg: "No product found",
            }
        } else {
            response.status = 200;
            response.body = {
                success : true,
                data : producto,
            }
        }
    }

    async prodPost({request, response}:{request: any, response: any}){
        if(!request.hasBody){
            response.status = 400;
            response.body = {
                success : false,
                msg : "No Data",
            }
        } else {
            try {
                let prod:any;
                prod = await daoProductos.getProducts()
                const newId = prod.length + 1;
                const body = request.body();
                const newProd = await body.value;
                newProd.id = newId
                await daoProductos.save(newProd)
            } catch(err){
                response.body = {
                    success : false,
                    msg : err.toString(),
                }
            }    
        }
    }
   
    static getInstance(){
        if(!instance){
            instance = new Controllers()
        }
        return instance
    }
}
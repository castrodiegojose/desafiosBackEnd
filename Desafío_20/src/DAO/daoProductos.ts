import dbMongo from '../DB/mongoConection.ts'
import { IProducto } from '../models/productosInterface.ts';


const productos = dbMongo.collection("productos");

export default class DaoProductos{
    public prod;
    public allprods;

    constructor(){
        this.allprods = {};
        this.prod = {};
    }

    async getProducts() {
        this.allprods =  await productos.find({}).toArray(); 
        console.log(this.allprods); 
        return this.allprods;
    }

    async getProduct(id:number) {
        this.prod = await productos.findOne({id: id}) as IProducto;  
        console.log("en dao:", this.prod)
       return this.prod
    }

    async save(produc: IProducto){
        try{
            await productos.insertOne(produc);
        }
        catch(err){
            return err.msg;            
        }
    }
}
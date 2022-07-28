import DaoProductos from "../DAO/daoProductos.js";

//let instanceProductService = null;

export default class ProductService{

    constructor(){
        this.collection = DaoProductos.getInstance()
        this.array=[]
    }

    async checkAndCreateTable(){            
        const exists = await this.collection.checkTableP();
        if(!exists){
            this.collection.newTableProd()
        }else{
            console.log('la tabla productos ya existe');
        }
    }
 
    async getAllProducts(){     
        let productos = await this.collection.getProducts()
        if(!productos) return null
        return productos        
    } 

    async getProductById(id){   
        this.array = await this.collection.getProduct(id)
        if(this.array.length === 0) return null
        return this.array       
    } 
     
    async saveProduct(prod){
        this.array = await this.collection.getProducts()
        let result = this.array.includes((prods)=>{
            prods.producto === prod;
        })
        if(result){ return null}
        else{
            await this.collection.save(prod)
            return {"Product added:": prod};
        }
    }

    // static getInstance(){
    //     if(!instanceProductService){
    //         instanceProductService = new ProductService()
    //     }

    //     return instanceProductService
    // }
}

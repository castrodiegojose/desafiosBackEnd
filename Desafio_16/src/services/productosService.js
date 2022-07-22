import DaoProductos from "../DAO/daoProductos.js";

export default class ProductService{

    constructor(){
        this.collection = DaoProductos.getInstance()
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
        return await this.collection.getAllP()
    } 
     
    async guardarProducto(prod){
        await this.collection.save(prod)
    }
}
// const classMAria = new ProductService();

// export default {classMAria};
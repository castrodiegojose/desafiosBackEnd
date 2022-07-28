import ProductService  from "../services/productosService.js"
//import "../passport/local-auth.js"


const classMAria = new ProductService()
let instance = null

export default class Controllers{

    async prodGet(req, res){
        let id = parseInt(req.params.id)
        if(!id){
            let productos = await classMAria.getAllProducts()
            if(!productos) return res.status(404).json("Products not found")
            res.status(200).json(productos)
        }
        else{
            console.log(`entro aca con el id ${id}`)
            let producto = await classMAria.getProductById(id)
            console.log(producto)
            if(!producto) return res.status(404).json("Product not found")
            res.status(200).json(producto)            
        }
    }

    async prodPost(req, res){
        let producto = req.body
        let created = await classMAria.saveProduct(producto)
        console.log(created)
        if(!created) return res.status(500).json("The product is already saved")
        res.status(201).json(created)
    }

    async signUpGet(req, res){
        res.render('signup')
    }

    async signUpPost(res, req, next){
        console.log(`Ruta ${req.url} y Metodo ${req.method}`);
        next();
    }

    async loginGet(req, res){
        res.render('login')
    }

    async loginPost(req, res, next){
        console.log(`Ruta ${req.url} y Metodo ${req.method}`);
        next();
    }

   
    static getInstance(){
        if(!instance){
            instance = new Controllers()
        }

        return instance
    }

}
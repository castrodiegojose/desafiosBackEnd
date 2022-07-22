import ProductService  from "../services/productosService.js"
import "../passport/local-auth.js"
import MensajeService from "../services/mensajesService.js"

const classSqLite = new MensajeService()
const classMAria = new ProductService()

let instance = null

export default class Controllers{

    async indexGet(req, res){
        let user = req.user.email
        const productos = await classMAria.getAllProducts()
        console.log(productos)
        const mensajes = await classSqLite.getAllMessages()
        res.render('index', {productos, mensajes, user}) 
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

    async logOutGet(res, req){
        console.log(`Ruta ${req.url} y Metodo ${req.method}`);
        let user = req.user
        res.render('logout', {user});
        console.log(user)
        // req.session.destroy(err=>{
        //     if (!err) {
        //         res.render('logout', {user});
        //     }
        //     else res.send({status: 'Logout ERROR', body: err});        
        // })
    }

    async pageNotFound(req, res, next){
        console.log(`Ruta ${req.url} y Metodo ${req.method} no establecido`)
        res.status(404).render('error-notfound')
    }

    async getGatosTest(req, res){
        const catsRandom = await classRandom.catsRandom();
        res.render('catTest', {catsRandom})
    }

    static getInstance(){
        if(!instance){
            instance = new Controllers()
        }

        return instance
    }

}
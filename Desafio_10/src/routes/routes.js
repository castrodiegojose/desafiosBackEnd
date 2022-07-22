import express from 'express';
import {classMAria, classSqLite} from '../classDB.js';
import {classRandom} from '../classRandomCats.js';

const router = express.Router();

//----------- AUTENTICADOR --------------//
function auth(req, res, next){
    if (req.session.usuario){
            next()
    } else {
            res.redirect('/login')
    }
}
//----------- RUTAS --------------//
router.get('/', auth, async (req, res) => {  
    let user = req.session.usuario
    const productos = await classMAria.getAllProducts()
    const mensajes = await classSqLite.getAllMessages()
    res.render('index', {productos, mensajes, user})    
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req,res)=>{
    const nombre = req.body;
    req.session.usuario = nombre
    res.redirect('/');
})

router.get('/logout',auth ,async (req, res) => {
    let user = req.session.usuario  
    req.session.destroy(err=>{
        if (!err) {
            res.render('logout', {user});
        }
        else res.send({status: 'Logout ERROR', body: err});        
    })
})

router.get('/api/gatos-test',auth, async (req, res) => {
    const catsRandom = await classRandom.catsRandom();
    res.render('catTest', {catsRandom})
})

export default router
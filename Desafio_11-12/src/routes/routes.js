import express from 'express';
import {classMAria, classSqLite} from '../classDB.js';
import {classRandom} from '../classRandomCats.js';
import passport from 'passport';
import "../passport/local-auth.js"

const router = express.Router();

//----------- AUTENTICADOR --------------//
function isAuthenticated(req, res, next){
    if (req.isAuthenticated()){
            next()
    } else {
            res.redirect('/signup')
    }
}


//----------- RUTAS --------------//
router.get('/', isAuthenticated, async (req, res) => {  
    let user = req.user.email
    const productos = await classMAria.getAllProducts()
    const mensajes = await classSqLite.getAllMessages()
    res.render('index', {productos, mensajes, user})    
})

router.get('/signup',(req, res, next) => {
    res.render('signup')
})

router.post('/signup', passport.authenticate('signup',{
    successRedirect: '/login',
    failureRedirect: '/signup',
    passReqToCallback: true,
})) 

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('login',{    
    successRedirect: '/',
    failureRedirect: '/login',
    passReqToCallback: true,
}))

router.get('/logout',isAuthenticated ,async (req, res) => {
    let user = req.user.email  
    req.session.destroy(err=>{
        if (!err) {
            res.render('logout', {user});
        }
        else res.send({status: 'Logout ERROR', body: err});        
    })
})

router.get('/api/gatos-test',isAuthenticated, async (req, res) => {
    const catsRandom = await classRandom.catsRandom();
    res.render('catTest', {catsRandom})
})

export default router
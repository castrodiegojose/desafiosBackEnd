import express from 'express';
import passport from 'passport';
import "../passport/local-auth.js"
import Controllers from '../controllers/controller.js';


const router = express.Router();
const Controller = Controllers.getInstance()

//----------- AUTENTICADOR --------------//
function isAuthenticated(req, res, next){
    if (req.isAuthenticated()){
            next()
    } else {
            res.redirect('/signup')
    }
}


//----------- RUTAS --------------//
router.get('/', isAuthenticated, Controller.indexGet)

router.get('/signup',Controller.signUpGet)

router.post('/signup', Controller.signUpPost, passport.authenticate('signup',{
    successRedirect: '/login',
    failureRedirect: '/signup',
    passReqToCallback: true,
})) 

router.get('/login', Controller.loginGet)

router.post('/login', Controller.loginPost, passport.authenticate('login',{    
    successRedirect: '/',
    failureRedirect: '/login',
    passReqToCallback: true,
}))

router.get('/logout',isAuthenticated ,Controller.logOutGet)

router.get('/api/gatos-test',isAuthenticated, Controller.getGatosTest)

router.use(Controller.pageNotFound)

export default router
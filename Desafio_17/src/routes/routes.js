import express from 'express';
import Controllers from '../controllers/controller.js';


const router = express.Router();
const Controller = Controllers.getInstance()


//----------- RUTAS --------------//

// router.post('/signup',Controller.signUpPost)

// router.post('/signin', Controller.signInPost) 

router.post('/productos/producto',Controller.prodPost)

router.get('/productos/:id?',Controller.prodGet)

//router.get('/productos/:id?',TokenValidation, Controller.prodGet)


export default router
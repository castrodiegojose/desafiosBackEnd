import { parse } from 'https://deno.land/std@0.140.0/path/win32.ts';
import { Router } from '../../deps.ts'
import Controllers from '../controllers/controller.ts';


const router =  new Router();
const Controller = Controllers.getInstance()


//----------- RUTAS --------------//

router
    .post('/productos',Controller.prodPost)

    .get('/productos',Controller.prodsGet)

    .get('/productos/:id',Controller.prodGet)


export default router
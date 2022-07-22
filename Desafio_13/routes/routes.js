import express from "express";
const router = express.Router()
import {counter} from '../options/function_counter.js'
import { cpus } from 'node:os';

const PORT = parseInt(process.argv[2]) || 8080

router.get('/info', (req, res) => {
    res.send({
        Argumentos_de_entrada : process.argv,
        Sistema_operativo: process.platform,
        Nodejs_Version: process.version,
        Uso_Memoria: process.memoryUsage(),
        Path: process.cwd(),
        Process_ID:process.pid,
        CPUs: cpus().length,
        Puerto: PORT
    })
})

////////////FUNCIONA//////////////
router.get('/api/randoms', async (req, res)=>{
    const cant = parseInt(req.query.cant)
    try{
        const result = await counter(cant)
        res.json({result,PORT})
    }
    catch(err){console.log(err)}
})    

export default router;



import express from "express";
import {fork} from "child_process";
const router = express.Router()
import { cpus } from 'node:os';
//import modo from '../options/env.js'
//import forking from '../modos/fork_father.js'
const PORT = parseInt(process.argv[2]) || 8080

router.get('/info', (req, res) => {
    console.log(
        `Argumentos_de_entrada : ${process.argv},
        Sistema_operativo: ${process.platform},
        Nodejs_Version: ${process.version},
        Uso_Memoria: ${process.memoryUsage()},
        Path: ${process.cwd()},
        Process_ID:${process.pid},
        CPUs: ${cpus().length},
        Puerto: ${PORT}`
    )
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
    const forked = fork("child_random.js")
    forked.on('message', msg => {
        if (msg =='listo'){
            forked.send(cant)
        }else{
            res.json(msg)
        }
    })
})    

export default router;



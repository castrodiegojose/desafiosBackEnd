import express from "express";
const app = express();
import router from "./routes/routes.js";
import modo from './options/env.js'
import {counter} from './options/function_counter.js'
import cluster from 'node:cluster';
import process from 'node:process';
import { cpus } from 'node:os';

const numCpu = cpus().length

if(modo=="FORK"){
    app.use('/', router);
    app.listen(8082, function() {console.log("Servidor puerto 8082")})
}else{
    
    app.get('/api/randoms', (req, res)=>{
        const cant =parseInt(req.query.cant)
        console.log(`response from server: ${process.pid}`)
        res.json(counter(cant));
        cluster.worker.kill()
    })

    if(cluster.isPrimary){
        console.log(`Primary ${process.id} is running`)
        for(let i=0; i < numCpu; i++){
            cluster.fork();
        }
        cluster.on('exit', (worker,code,signal) => {
            console.log(`worker ${worker.process.id} died`)
            cluster.fork();
        });
    }else{
        app.listen(8082, function() {console.log(`Servidor ${process.pid} puerto 8081`)})
    }
}

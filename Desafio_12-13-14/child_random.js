import {counter} from './options/function_counter.js'

//child
console.log("child created", process.pid)

process.on("message", msg =>{
    const result = counter(msg);  
    process.send(result)   
    process.exit();
})

process.send("listo") // funciona con esta linea//


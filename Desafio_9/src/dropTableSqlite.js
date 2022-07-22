///// Modulo creado para borrar la tabla de mensajes /////

const sqlite = require('sqlite3').verbose();

let db = new sqlite.Database('./SqliteDB/mydb.sqlite')

db.run('DROP TABLE mensajes', (err)=>{
    if(err){
        console.log(err.message);
    }
    console.log('table deleted!')

})

db.close()
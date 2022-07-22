const {mysqlOptions} = require('./options/mariaDB.js');
const {sqliteOptions} = require('./options/sqliteDB.js') 


const knexMysql = require('knex')(mysqlOptions);
const knexsqLite = require('knex')(sqliteOptions);


class BaseMaria {

    async createTable(){            

       await knexMysql.schema.hasTable('productos').then(function(exists){
                    if(!exists){

                        knexMysql.schema.createTable('productos', (table) =>{
                            table.increments('id');
                            table.string('producto');
                            table.integer('precio');
                            table.string('foto');
                
                        }) 
                        .then(() => console.log('tabla creada'))
                        .catch(err => {console.log(err); throw err})
                        //.finally(() => knexMysql.destroy()); 
            }
            else{
                console.log('la tabla productos ya existe');
                }
        })
    

    }

    async  getAllProducts(){        

        let productos;         
 
         await knexMysql.from('productos')
             .select('*')
             .then((rows)=>{
                
                 productos=rows;
                 //console.log("consolelog clase:",productos);                 
                           
             })
             .catch(err => {console.log(err);})
             //.finally(() => knex.destroy());
         return productos;          
         
     } 
    
    
    guardarProducto(prod){

        knexMysql('productos').insert(prod)
            .then(() => console.log('productos agregados'))
            .catch(err => {console.log(err); throw err})
            //.finally(() => knex.destroy()) 

    }



    async createTableMsj(){            

        await knexsqLite.schema.hasTable('mensajes').then(function(exists){
                    if(!exists){

                        knexsqLite.schema.createTable('mensajes', (table) =>{
                            table.increments('id');
                            table.string('author');
                            table.string('text');
                                         
                        }) 
                        .then(() => console.log('tabla mensajes creada'))
                        .catch(err => {console.log(err); throw err})
                        //.finally(() => knexsqLite.destroy()); 
            }
            else{
                console.log('la tabla mensajes ya existe');
                }
        })
    

    }

    async  getAllMessages(){        

        let mensajes;         
 
         await knexsqLite.from('mensajes')
             .select('*')
             .then((rows)=>{
                
                 mensajes=rows;
                 console.log("consolelog clase:",mensajes);                 
                           
             })
             .catch(err => {console.log(err);})
             //.finally(() => knex.destroy());
         return mensajes;          
         
     } 

     guardarMensaje(msj){

        knexsqLite('mensajes').insert(msj)
            .then(() => console.log('mensajes agregados'))
            .catch(err => {console.log(err); throw err})
            //.finally(() => knex.destroy()) 

    }

           

    

    

}

    module.exports = BaseMaria;
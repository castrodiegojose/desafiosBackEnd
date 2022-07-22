import {mysqlOptions} from './options/mariaDB.js';
import {sqliteOptions} from './options/sqliteDB.js'; 
import knex from 'knex';


const knexMysql = knex(mysqlOptions)
const knexsqLite = knex(sqliteOptions);

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
             })
             .catch(err => {console.log(err);})
         return productos;          
     } 
    
    guardarProducto(prod){
        knexMysql('productos').insert(prod)
            .then(() => console.log('productos agregados'))
            .catch(err => {console.log(err); throw err})
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
             })
             .catch(err => {console.log(err);})
         return mensajes;          
     } 
     guardarMensaje(msj){
        knexsqLite('mensajes').insert(msj)
            .then(() => console.log('mensajes agregados'))
            .catch(err => {console.log(err); throw err})
    }
}
const classMAria = new BaseMaria();
const classSqLite = new BaseMaria();

export {classMAria, classSqLite};
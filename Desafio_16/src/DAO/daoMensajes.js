import {sqliteOptions} from '../options/sqliteDB.js'; 
import knex from 'knex';

const knexsqLite = knex(sqliteOptions);

let instanceMensajeDao = null


export default class DaoMensajes{


    async checkTableM(){         
        
        const tabla = await knexsqLite.schema.hasTable('mensajes')
        if(!tabla){
            return false;
        }
        return true;
    }

    async newTableMensj(){
        await knexsqLite.schema.createTable('mensajes', (table) =>{
            table.increments('id');
            table.string('author');
            table.string('text');
        }) 
        .then(() => console.log('tabla mensajes creada'))
        .catch(err => {console.log(err); throw err})
    }

    async getAllM(){        
        let mensajes;         
        await knexsqLite.from('mensajes')
            .select('*')
            .then((rows)=>{
                mensajes=rows;
            })
            .catch(err => {console.log(err);})
        return mensajes;          
    } 

    async saveM(msj){
        knexsqLite('mensajes').insert(msj)
        .then(() => console.log('mensajes agregados'))
        .catch(err => {console.log(err); throw err})

    }

    static getInstanceM(){
        if(!instanceMensajeDao){
            instanceMensajeDao = new DaoMensajes()
        }
        return instanceMensajeDao
    }


}
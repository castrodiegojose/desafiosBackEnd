import {mysqlOptions} from '../options/mariaDB.js';
import knex from 'knex';


const knexMysql = knex(mysqlOptions)

let instanceProductDao = null;

export default class DaoProductos{
    

    async checkTableP(){
        const tabla = await knexMysql.schema.hasTable('productos')
        console.log(tabla)
        return tabla
    }

    async newTableProd(){
        await knexMysql.schema.createTable('productos', (table) =>{
            table.increments('id');
            table.string('producto');
            table.integer('precio');
            table.string('foto');
        }) 
        .then(() => console.log('tabla creada'))
        .catch(err => {console.log(err); throw err})
    }

    async getAllP() {
        let productos;         
          await knexMysql.from('productos')
              .select('*')
              .then((rows)=>{
                  productos=rows;
              })
              .catch(err => {console.log(err);})
          return productos;   
    }

    async save(prod){
        await knexMysql('productos').insert(prod)
             .then(() => console.log('productos agregados'))
             .catch(err => {console.log(err); throw err})
    }

    static getInstance(){
        if(!instanceProductDao){
            instanceProductDao = new DaoProductos() 
        }
        return instanceProductDao
    }

}
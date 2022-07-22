import DaoMensajes from "../DAO/daoMensajes.js";

export default class MensajeService{

    constructor(){
        this.collection = DaoMensajes.getInstanceM()
    }

    async checkAndCreateTableM(){            
        
        const exist = await this.collection.checkTableM()
        if(!exist){
            this.collection.newTableMensj()
        }else{
            console.log('la tabla mensajes ya existe');
        }
    }

    async  getAllMessages(){        
        return await this.collection.getAllM()         
    } 

    async guardarMensaje(msj){
      await this.collection.saveM(msj)
    }
}

// const classSqLite = new MensajeService();

// export default {classSqLite}
export async function counter(cant){
    try{
        const min = 1;
        const max = 1001;
        let obj ={} 
        for (let i=0; i<cant; i++) {
            let num =  Math.floor(Math.random() * (max - min) + min);    
            if (obj[num]) {       
                obj[num]++;
            }
            else {
                obj[num] = 1
            }
        }
        return obj;

    }catch(err){console.error(err);}
}
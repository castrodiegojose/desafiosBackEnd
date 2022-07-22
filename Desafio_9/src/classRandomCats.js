const generateCats = require('./utils/cats.utils.js')

class RandomCat{
    
    constructor() {
        this.array = [];
    }

    async catsRandom(){
        this.array = [];
        for (let i = 0; i < 5 ; i++) {
            const catRandom = await generateCats();
            this.array.push(catRandom);
        }
        console.log(this.array)
        return this.array
    
    }
}

module.exports = RandomCat;
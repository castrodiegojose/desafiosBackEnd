import generateCats from './utils/cats.utils.js';

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
        return this.array
    }
}

const classRandom = new RandomCat();

export {classRandom};
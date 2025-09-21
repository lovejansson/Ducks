


// size // 0-10, 10 is best
// wingSpan // 0 - 10, 10 is best
// colorRichness // 0 - 10
// aggressivness // 0 - 10, around 4-6 is the best
// friendly  // 0 - 10, around 4-6 is the best
// fertility // 0 - 10, 10 is the best
// weight // 0 - 10 4-6 is best

export default class DNA {

    constructor(genes) {
        this.genes = genes;
    }

    static crossover(dna1, dna2) {
         const genes = [];

        for(let i = 0; i < dna1.genes.length; ++i) {
            genes.push((dna1.genes[i] + dna2.genes[i]) / 2);
        }
        
        return new DNA(genes);
    }

    static random() {
        const randomInt = (max) => Math.round(Math.random() * max);
        
        return new DNA([randomInt(10), randomInt(10), randomInt(10), randomInt(10), randomInt(10), randomInt(10), randomInt(10)])
    }
    

    static calculateFitness(dna) {
        return dna.genes.reduce((acc, curr) => acc += curr, 0)
    }

    static mutate(dna) {
        dna.genes = dna.genes.map(g => g += Math.round(Math.random()) *( Math.random() > 0.5 ? -1 : 1))
    }
}



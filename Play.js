import DNA from "./DNA.js";
import Duck from "./Duck.js";

export default class Play{

    constructor() {
        this.ducks = Array(20).fill(null).map(_ => new Duck(DNA.random(), Math.random() > 0.5 ? "male" : "female", Math.floor(Math.random() * 10)));
    }

    update() {

        for(const d of this.ducks) {

            d.update();

            if(d.age >= 100 || d.health < 0) {
                this.ducks.splice(this.ducks.indexOf(d), 1) 
            }
        }

        // Create ducklings ( the female will start ovulating and the male will start building a nest!)

        if(this.ducks.length < 16) {

            const bestFemale = this.ducks.filter(d => d.sex === "female").sort((d1, d2) => DNA.calculateFitness(d1.dna) - DNA.calculateFitness(d2.dna))[0];
            const bestMale = this.ducks.filter(d => d.sex === "male").sort((d1, d2) => DNA.calculateFitness(d1.dna) - DNA.calculateFitness(d2.dna))[0];
            
            for(let i = 0; i < 4; ++i) {
                const dna = DNA.crossover(bestMale.dna, bestFemale.dna);
                this.ducks.push(new Duck(dna, Math.random() > 0.5 ? "male" : "female", 0));
            }

        } 
    }

    draw() {
        console.log("Ducks:");

        for(const d of this.ducks) {
            d.draw();
        }

        console.log("-------------------------------");
        console.log("Total " + this.ducks.length);
    }
    
}
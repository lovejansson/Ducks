import DNA from "./DNA.js";
import Duck from "./Duck.js";
import Lake from "./lake.js";
import { Scene } from "./pim-art/index.js";
import { BASE_URL } from "./config.js";
import { getRandomDec, getRandomInt } from "./pim-art/utils/math.js";

export default class Play extends Scene {

    constructor() {
        super();
    }

    async init() {

        this.art.images.add("duck-m-walk", `${BASE_URL}images/duck-m-walk.png`);
        this.art.images.add("duck-m-sit", `${BASE_URL}images/duck-m-sit.png`);
        this.art.images.add("duck-f-walk", `${BASE_URL}images/duck-f-walk.png`);
        this.art.images.add("duck-f-sit", `${BASE_URL}images/duck-f-sit.png`);


        await this.art.images.load();

        this.ducks = Array(1).fill(null).map(_ => new Duck(this, Symbol("duck"), 
        {x: this.art.tileSize * getRandomInt(7, 13), y: this.art.tileSize * getRandomInt(1, 2)},  this.art.tileSize,  this.art.tileSize, DNA.random(), Math.random() > 0.5 ? "m" : "f", Math.floor(Math.random() * 10)));

        this.isInitialized = true;

    }

    update() {

        for(const d of this.ducks) {
            d.update();
        }

        // this.lake.draw(this.gl);

        // for(const d of this.ducks) {

        //     d.update();

        //     if(d.age >= 100 || d.health < 0) {
        //         this.ducks.splice(this.ducks.indexOf(d), 1) 
        //     }
        // }

        // // Create ducklings ( the female will start ovulating and the male will start building a nest!)

        // if(this.ducks.length < 16) {

        //     const bestFemale = this.ducks.filter(d => d.sex === "female").sort((d1, d2) => DNA.calculateFitness(d1.dna) - DNA.calculateFitness(d2.dna))[0];
        //     const bestMale = this.ducks.filter(d => d.sex === "male").sort((d1, d2) => DNA.calculateFitness(d1.dna) - DNA.calculateFitness(d2.dna))[0];

        //     for(let i = 0; i < 4; ++i) {
        //         const dna = DNA.crossover(bestMale.dna, bestFemale.dna);
        //         this.ducks.push(new Duck(dna, Math.random() > 0.5 ? "male" : "female", 0));
        //     }

        // } 
    }


    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.art.images.get("background"), 0, 0, 320, 180);

        for(const d of this.ducks) {
            d.draw(ctx);
        }
    }
}
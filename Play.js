import DNA from "./DNA.js";
import Duck from "./Duck.js";
import { ArtObject, Scene, StaticImage } from "./pim-art/index.js";
import { BASE_URL } from "./config.js";
import { getRandomInt } from "./pim-art/utils/math.js";



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
        {x: this.art.tileSize * getRandomInt(7, 13), y: this.art.tileSize * getRandomInt(3, 5)},  this.art.tileSize,  this.art.tileSize, DNA.random(), Math.random() > 0.5 ? "m" : "f", Math.floor(Math.random() * 10)));

        this.isInitialized = true;
        this.#createAreas();
    }

    update() {
        for(const d of this.ducks) {
            d.update();
        }

     
      
    }


    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {

        ctx.drawImage(this.art.images.get("background"), 0, 0, 640, 360);   

        for(const d of this.ducks) {
            d.draw(ctx);
        }

    //     for(const a of this.areas) {
    //         for(const t of a.tiles) {
    //             if(a.label === "lake") {
    //                 ctx.strokeStyle = "red";
    //             } else {
    //                 ctx.strokeStyle = "yellow";
    //             }
    //             ctx.strokeRect(t.x, t.y, t.width, t.height);
    //     } 
    //   }
    }

    #createAreas() {

        this.areas = [
            {label: "grass", tiles: []}, 
            {label: "lake", tiles: []}
        ];

        for(let r = 3; r <= 5; ++r) {
            for(let c = 5; c <= 35; ++c) {
                this.areas[0].tiles.push({
                    x: c * this.art.tileSize, 
                    y: r * this.art.tileSize, 
                    width: this.art.tileSize, 
                    height: this.art.tileSize});
            }   
        }   

        for(let r = 17; r <= 19; ++r) {
            for(let c = 4; c <= 35; ++c) {
                this.areas[0].tiles.push({
                    x: c * this.art.tileSize, 
                    y: r * this.art.tileSize, 
                    width: this.art.tileSize, 
                    height: this.art.tileSize});
            }   
        }   

        for(let r = 6; r <= 16; ++r) {
            for(let c = 4; c <= 35; ++c) {
                if(c >= 8 && c <= 32) {
                    this.areas[1].tiles.push({
                        x: c * this.art.tileSize, 
                        y: r * this.art.tileSize, 
                        width: this.art.tileSize, 
                        height: this.art.tileSize});
                } else {
                    this.areas[0].tiles.push({
                        x: c * this.art.tileSize, 
                        y: r * this.art.tileSize, 
                        width: this.art.tileSize, 
                        height: this.art.tileSize});
                }
            }   
        } 
    }
}
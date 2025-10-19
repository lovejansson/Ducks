import DNA from "./DNA.js";
import Duck from "./Duck.js";
import { Scene } from "./pim-art/index.js";
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
        this.art.images.add("trees", `${BASE_URL}images/trees.png`);
        this.art.images.add("grass", `${BASE_URL}images/grass.png`);
        
        
        await this.art.images.load();

        this.ducks = Array(12).fill(null).map((_, i) => new Duck(this, Symbol("duck"),
            { x: this.art.tileSize + Math.ceil((this.art.width  * 0.4)) , y: this.art.tileSize * i + ( Math.ceil((this.art.height  * 0.2)))}, this.art.tileSize, this.art.tileSize, DNA.random(), Math.random() > 0.5 ? "m" : "f", Math.floor(Math.random() * 10)));

        this.isInitialized = true;
        this.#createAreas();
    }

    update() {
        for (const d of this.ducks) {
            d.update();
        }
    }


    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {

        ctx.drawImage(this.art.images.get("background"), 0, 0, 640, 360);

        for (const d of this.ducks) {
            d.draw(ctx);
        }

        //     for(const a of this.areas) {
        //         if(a.label === "lake") {
        //                 ctx.strokeStyle = "red";
        //             } else if(a.label === "forest")
        //             {
        //                 ctx.strokeStyle = "blue"
        //             }
        //             else {
        //                 ctx.strokeStyle = "yellow";
        //             }
        //         for(const t of a.tiles) {
                    
        //             ctx.strokeRect(t.x, t.y, t.width, t.height);
        //     } 
        //   }

          
        ctx.drawImage(this.art.images.get("trees"), 0, 0, 640, 360);
                  
        ctx.drawImage(this.art.images.get("grass"), 0, 0, 640, 360);
    }

    #createAreas() {

        this.areas = [
            { label: "forest", tiles: [] },
            { label: "grass", tiles: [] },
            { label: "lake", tiles: [] }
        ];

        // Row parts with only forest

        for (let r = 0; r < 3; ++r) {
            for (let c = 0; c < this.art.width / this.art.tileSize; ++c) {
                this.areas[0].tiles.push({
                    x: c * this.art.tileSize,
                    y: r * this.art.tileSize,
                    width: this.art.tileSize,
                    height: this.art.tileSize
                });
            }
        }

        for (let r = 19; r < this.art.height / this.art.tileSize; ++r) {
            for (let c = 0; c < this.art.width / this.art.tileSize; ++c) {
                this.areas[0].tiles.push({
                    x: c * this.art.tileSize,
                    y: r * this.art.tileSize,
                    width: this.art.tileSize,
                    height: this.art.tileSize
                });
            }
        }

        // Grass parts where there is no lake

        for (let r = 3; r <= 5; ++r) {
            for (let c = 0; c <= this.art.width / this.art.tileSize; ++c) {

                const area = (() => {

                   if (c < 5 || c > 35) {
                        return this.areas[0];
                    } else {
                        return this.areas[1];
                    }
                })();

                area.tiles.push({
                    x: c * this.art.tileSize,
                    y: r * this.art.tileSize,
                    width: this.art.tileSize,
                    height: this.art.tileSize
                });
            }
        }
        for (let r = 17; r <= 19; ++r) {
           for (let c = 0; c <= this.art.width / this.art.tileSize; ++c) {

                  const area = (() => {
                    if (c < 4 || c > 35) {
                        return this.areas[0];
                    }else {
                        return this.areas[1];
                    }
                  })();

                area.tiles.push({
                    x: c * this.art.tileSize,
                    y: r * this.art.tileSize,
                    width: this.art.tileSize,
                    height: this.art.tileSize
                });
            }
        }

        // Middle part where lake is
        for (let r = 6; r <= 16; ++r) {
            for (let c = 0; c <= this.art.width / this.art.tileSize; ++c) {

                 const area = (() => {
                    if (c < 4 || c > 35) {
                        return this.areas[0];
                    } else if (c >= 8 && c <= 32) {
                        return this.areas[2];
                    } else {
                        return this.areas[1];
                    }
                  })();


                area.tiles.push({
                    x: c * this.art.tileSize,
                    y: r * this.art.tileSize,
                    width: this.art.tileSize,
                    height: this.art.tileSize
                });
            }

        }

    }
}
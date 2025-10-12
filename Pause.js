
import {Scene} from "./pim-art/index.js";
import { BASE_URL } from "./config.js";


export default class Pause  extends Scene {

    constructor() {
           super();
    }

    async  init() {
        this.art.images.add("background", `${BASE_URL}images/background.png`);
        await this.art.images.load();
        this.isInitialized = true;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.art.images.get("background"), 0, 0, 640, 360);        
    }
    
}
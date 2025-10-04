
import Play from "./Play.js";
import Pause from "./Pause.js";
import {Art} from "./pim-art/index.js";
import {Debugger} from "./debugger.js";

export const debug = Debugger(true);

const art = new Art({ 
    pause: new Pause(),
    play: new Play(),
    width: 320,
    height: 180,
    tileSize: 16,
    canvas: "#canvas-art",
    displayGrid: true
});


art.play();

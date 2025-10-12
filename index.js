
import Play from "./Play.js";
import Pause from "./Pause.js";
import {Art} from "./pim-art/index.js";
import {Debugger} from "./debugger.js";

const btnDevInfoOpen = document.getElementById("btn-dev-info-open");
const dialogDevInfo = document.getElementById("dialog-dev-info");
const btnDevInfoClose = document.getElementById("btn-dev-info-close");

btnDevInfoOpen.addEventListener("click", () => {
    dialogDevInfo.showModal();
});

btnDevInfoClose.addEventListener("click", () => {
    dialogDevInfo.close();
});

export const debug = Debugger(true);

const art = new Art({ 
    pause: new Pause(),
    play: new Play(),
    width: 640,
    height: 360,
    tileSize: 16,
    canvas: "#canvas-art",
    displayGrid: false
});


art.play();

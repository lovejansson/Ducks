
import Play from "./Play.js";

const play = new Play();


function main() {
    play.update();
    play.draw();
}

const interval = setInterval(main, 100);

setTimeout(() => {
    clearInterval(interval);
}, 1000 * 60 * 1);
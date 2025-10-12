import { debug } from "./index.js";
import { Sprite, StaticImage } from "./pim-art/index.js";
import * as Array from "./pim-art/utils/array.js"
import { getCollision, } from "./pim-art/collision.js";

class LifeCycleState {
    /**
     * @param {Duck} duck 
     */
    enter(duck) {

    }

    /**
    * @param {Duck} duck 
    */
    update(duck) {

    }

    /**
    * @param {Duck} duck 
    */
    exit(duck) {

    }
}



class ActionState {
    /**
     * @param {Duck} duck 
     */
    enter(duck) {

    }

    /**
    * @param {Duck} duck 
    */
    update(duck) {

    }

    /**
    * @param {Duck} duck 
    */
    exit(duck) {

    }
}

class Ducking extends ActionState {
    /**
     * @param {Duck} duck 
     */
    enter(duck) {

    }

    /**
    * @param {Duck} duck 
    */
    update(duck) {

    }

    /**
    * @param {Duck} duck 
    */
    exit(duck) {

    }
}

class Grazing extends ActionState {
    /**
  * @param {Duck} duck 
  */
    enter(duck) {

    }

    /**
    * @param {Duck} duck 
    */
    update(duck) {

    }

    /**
    * @param {Duck} duck 
    */
    exit(duck) {

    }
}

class Sleeping extends ActionState {
    /**
   * @param {Duck} duck 
   */
    enter(duck) {

    }

    /**
    * @param {Duck} duck 
    */
    update(duck) {

    }

    /**
    * @param {Duck} duck 
    */
    exit(duck) {

    }
}

class Walking extends ActionState {
    /**
   * @param {Duck} duck 
   */
    enter(duck) {
        duck.animations.play(`walk-${duck.direction}`);
    }

    /**
    * @param {Duck} duck 
    */
    update(duck) {
        if (!duck.animations.isPlaying(`walk-${duck.direction}`)) {
            duck.animations.play(`walk-${duck.direction}`);
        }


        if (duck.scene.art.keys.up) {
            duck.direction = "n";
            duck.pos.y -= 1;
        } else if (duck.scene.art.keys.right) {
            duck.direction = "e";
            duck.pos.x += 1;
        } else if (duck.scene.art.keys.down) {
            duck.direction = "s";
            duck.pos.y += 1;
        } else if (duck.scene.art.keys.left) {
            duck.direction = "w";
            duck.pos.x -= 1;
        }

    }

    /**
    * @param {Duck} duck 
    */
    exit(duck) {
        duck.animations.stop(`sit-${duck.direction}`);
    }
}

class Swimming extends ActionState {
    /**
   * @param {Duck} duck 
   */
    enter(duck) {
        duck.animations.play(`sit-${duck.direction}`);
    }

    /**
    * @param {Duck} duck 
    */
    update(duck) {
        if (!duck.animations.isPlaying(`sit-${duck.direction}`)) {
            duck.animations.play(`sit-${duck.direction}`);
        }


        if (duck.scene.art.keys.up) {
            duck.direction = "n";
            duck.pos.y -= 1;
        } else if (duck.scene.art.keys.right) {
            duck.direction = "e";
            duck.pos.x += 1;
        } else if (duck.scene.art.keys.down) {
            duck.direction = "s";
            duck.pos.y += 1;
        } else if (duck.scene.art.keys.left) {
            duck.direction = "w";
            duck.pos.x -= 1;
        }

    }

    /**
    * @param {Duck} duck 
    */
    exit(duck) {
        duck.animations.stop(`sit-${duck.direction}`);
    }
}

class SittingIdle extends ActionState {
    /**
    * @param {Duck} duck 
    */
    enter(duck) {
        duck.animations.play(`sit-${duck.direction}`);
    }

    /**
    * @param {Duck} duck 
    */
    update(duck) {

    }

    /**
    * @param {Duck} duck 
    */
    exit(duck) {
        duck.animations.stop(`sit-${duck.direction}`);
    }
}


class StandingIdle extends ActionState {
    /**
    * @param {Duck} duck 
    */
    enter(duck) {
        duck.animations.play(`stand-${duck.direction}`);
    }

    /**
    * @param {Duck} duck 
    */
    update(duck) {

    }

    /**
    * @param {Duck} duck 
    */
    exit(duck) {
        duck.animations.stop(`stand-${duck.direction}`);
    }
}


export default class Duck extends Sprite {

    /**
     * @type {ActionState}
     */
    #actionState;

    /**
     * @param {Scene} scene
     * @param {Symbol} id
     * @param {{ x: number, y: number }} pos
     * @param {number} width
     * @param {number} height
     * @param {string | undefined} image 
     */
    constructor(scene, id, pos, width, height, dna, sex, age) {
        super(scene, id, pos, width, height);

        this.TAG = "Duck";
        this.direction = ["n", "e", "s", "w"].random();
        this.sex = sex;
        this.dna = dna;
        this.age = age;
        this.health = 100;


        this.animations.create("walk-n", { frames: `duck-${sex}-walk`, frameRate: 100, numberOfFrames: 4, startIdx: 7, loop: true });
        this.animations.create("walk-e", { frames: `duck-${sex}-walk`, frameRate: 100, numberOfFrames: 3, startIdx: 4, loop: true });
        this.animations.create("walk-s", { frames: `duck-${sex}-walk`, frameRate: 100, numberOfFrames: 4, startIdx: 0, loop: true });
        this.animations.create("walk-w", { frames: `duck-${sex}-walk`, frameRate: 100, numberOfFrames: 3, startIdx: 11, loop: true });


        this.animations.create("stand-n", { frames: `duck-${sex}-walk`, frameRate: 100000, numberOfFrames: 1, startIdx: 7, loop: true });
        this.animations.create("stand-e", { frames: `duck-${sex}-walk`, frameRate: 100000, numberOfFrames: 1, startIdx: 4, loop: true });
        this.animations.create("stand-s", { frames: `duck-${sex}-walk`, frameRate: 100000, numberOfFrames: 1, startIdx: 0, loop: true });
        this.animations.create("stand-w", { frames: `duck-${sex}-walk`, frameRate: 100000, numberOfFrames: 1, startIdx: 11, loop: true });

        this.animations.create("sit-n", { frames: `duck-${sex}-sit`, frameRate: 100000, numberOfFrames: 1, startIdx: 2, loop: true });
        this.animations.create("sit-e", { frames: `duck-${sex}-sit`, frameRate: 100000, numberOfFrames: 1, startIdx: 1, loop: true });
        this.animations.create("sit-s", { frames: `duck-${sex}-sit`, frameRate: 100000, numberOfFrames: 1, startIdx: 0, loop: true });
        this.animations.create("sit-w", { frames: `duck-${sex}-sit`, frameRate: 100000, numberOfFrames: 1, startIdx: 3, loop: true });

        this.actionState = new Walking();
    }

    set actionState(state) {
        debug(`${this.TAG}: set action state ${state}`);
        this.#actionState = state;
        this.#actionState.enter(this);
    }

    isWalking() {
        return this.#actionState instanceof Walking;
    }

    isSwimming() {
        return this.#actionState instanceof Swimming;
    }

    update() {

        const tileCollision = this.#checkAreaCollision();

        if (tileCollision) {
            if (tileCollision.label === "lake" && !this.isSwimming()) {
                this.#actionState.exit(this);
                this.#actionState = new Swimming();
            } else if (tileCollision.label === "grass" && !this.isWalking()) {
                this.#actionState.exit(this);
                this.#actionState = new Walking();
            }

        }

        this.#actionState.update(this);

        this.animations.update();
    }

    #checkAreaCollision() {
        const collidedWith = []

        for (const a of this.scene.areas) {
            for (const t of a.tiles) {
                const c = getCollision(this, new StaticImage(this, Symbol("tile"), { x: t.x, y: t.y }, t.width, t.height));
                if (c) {
                    collidedWith.push({ label: a.label, overlap: c.overlap });
                }
            }
        }

        return collidedWith.sort((a, b) => (b.overlap.x + b.overlap.y) - (a.overlap.x + a.overlap.y))[0];

    }

    // draw() {


    //     const [
    //         size,
    //         wingSpan,
    //         colorRichness,
    //         aggressivness,
    //         friendly,
    //         fertility,
    //         weight
    //     ] = this.dna.genes;

    //     console.log(
    //         `Sex: ${this.sex} Size: ${size}, Wing Span: ${wingSpan}, Color Richness: ${colorRichness}, ` +
    //         `Aggressiveness: ${aggressivness}, Friendly: ${friendly}, Fertility: ${fertility}, Weight: ${weight}, ` +
    //         `Age: ${this.age}, Health: ${this.health}`
    //     );
    // }
}
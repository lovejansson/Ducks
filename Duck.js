import { debug } from "./index.js";
import { Sprite, StaticImage } from "./pim-art/index.js";
import * as Array from "./pim-art/utils/array.js"
import { getCollision, } from "./pim-art/collision.js";
import { getRandomInt } from "./pim-art/utils/math.js";

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
    * @param {CollisionResult[]} collisions 
    */
    update(duck,collisions) {

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


/**
 * 
 * Nu måste vi se till så att ankan inte går utanför griden, ankan måste vända om till 
 * närmaste
 * 
 */
class RandomWalk {
    /**
     * 
     * @param {Sprite} sprite 
     * @param {{start: number, end: number}} tileRange 
     */
    constructor(sprite, tileRange) {
        this.sprite = sprite;
        this.tileRange = tileRange;
        this.currWalkLength = 0;
        this.currWalkLengthGoal = getRandomInt(tileRange.start, tileRange.end) * sprite.scene.art.tileSize;
    }

    
    update() {
        
    //    debug("RandomWalk update ", this.currWalkLength, this.currWalkLengthGoal)
        // If duck walked for currWalkLenth goal or is colliding with something it should turn
        if( this.currWalkLength >= this.currWalkLengthGoal ) {
            // Switch direction
            this.currWalkLength = 0;
            this.sprite.direction = this.getNewDirection();
        } else {
          
            this.currWalkLength += 1
        }
    }

    getNewDirection() {
        let direction = ["n", "e", "s", "w"].random();

        while (direction === this.sprite.direction) {
            direction = ["n", "e", "s", "w"].random();
        }

        return direction;
    }
}

class Walking extends ActionState {
    /**
   * @param {Duck} duck 
   */
    enter(duck) {
        duck.animations.play(`walk-${duck.direction}`);
        this.randomWalk = new RandomWalk(duck, {start: 2, end: 4});
    }

    /**
    * @param {Duck} duck 
    * @param {CollisionResult[]} collisions
    */
    update(duck, collisions) {

        // Kolla om den är på väg mot en skog och isf byta håll?

        const tileAreaCollision = collisions.filter(c => c.obj.id.description === "forest").sort((a, b) => (b.overlap.x + b.overlap.y) 
        - (a.overlap.x + a.overlap.y))[0];

        let prevDir = duck.direction;

        if (tileAreaCollision) {
            
            if (tileAreaCollision.obj.id.description === "forest") {
            
                switch(duck.direction) {
                    case "n":
                       
                if(tileAreaCollision.blocked.top)  {
                    
                    duck.direction = "s";  
                    break;}
                case "e":
                    if(tileAreaCollision.blocked.right)  duck.direction = "w";     
                    break;
                case "s":
                    if(tileAreaCollision.blocked.bottom)  duck.direction = "n";     
                    break;
                case "w":
                    if(tileAreaCollision.blocked.left) duck.direction = "e";                  
                    break;
                }
            } 
        }


        const duckIsBlocked = collisions.find(dc => dc.obj.id.description === "duck" && (duck.direction === "n" && dc.blocked.top 
            || duck.direction === "s" && dc.blocked.bottom
        || duck.direction === "e" && dc.blocked.right
        || duck.direction === "w" && dc.blocked.left)) !== undefined;


        if(duckIsBlocked) {

            // Find a direction for duck to move 
            const blockedDirections = collisions.reduce((acc, c) => {
                if (c.blocked.top) acc.push("n");
                if (c.blocked.right) acc.push("e");
                if (c.blocked.bottom) acc.push("s");
                if (c.blocked.left) acc.push("w");
                return acc;
            }, []);

            const directions = ["n", "e", "s", "w"];
            const available = directions.filter(d => !blockedDirections.includes(d));

            if (available.length > 0) {
                // pick a random available direction
                duck.direction = available[Math.floor(Math.random() * available.length)];
                    this.randomWalk.update();


                switch(duck.direction) {
                    case "n":
                        duck.pos.y -= 1;
                        break;
                    case "e":
                        duck.pos.x += 1;
                        break;
                    case "s":
                        duck.pos.y += 1;
                        break;
                    case "w":
                        duck.pos.x -= 1;
                        break;
                }
            }


        } else {
              this.randomWalk.update();


                switch(duck.direction) {
                    case "n":
                        duck.pos.y -= 1;
                        break;
                    case "e":
                        duck.pos.x += 1;
                        break;
                    case "s":
                        duck.pos.y += 1;
                        break;
                    case "w":
                        duck.pos.x -= 1;
                        break;
                }
        }




        // if(duckCollision) {    
            
        // // debug("Duck collision: ", duckCollision);
    
        //      switch(duck.direction) {
        //             case "n":
                       
        //         if(duckCollision.blocked.top)  duck.direction = "s";  
        //             break;
        //         case "e":
        //             if(duckCollision.blocked.right)  duck.direction = "w";     
        //             break;
        //         case "s":
        //             if(duckCollision.blocked.bottom)  duck.direction = "n";     
        //             break;
        //         case "w":
        //             if(duckCollision.blocked.left) duck.direction = "e";                  
        //             break;
        //         }
        // }


        if (!duck.animations.isPlaying(`walk-${duck.direction}`)) {
            duck.animations.play(`walk-${duck.direction}`);
        }

    }

    /**
    * @param {Duck} duck 
    */
    exit(duck) {
        duck.animations.stop(`walk-${duck.direction}`);
    }
}

class Swimming extends ActionState {
    /**
   * @param {Duck} duck 
   */
    enter(duck) {
        duck.animations.play(`sit-${duck.direction}`);
        this.randomWalk = new RandomWalk(duck, {start: 2, end: 4});
    }

   /**
    * @param {Duck} duck 
    * @param {CollisionResult[]} collisions
    */
    update(duck, collisions) {

     const tileAreaCollision = collisions.filter(c => c.obj.id.description === "forest").sort((a, b) => (b.overlap.x + b.overlap.y) 
        - (a.overlap.x + a.overlap.y))[0];

    
        // debug("Walking: ", tileAreaCollision, duckCollision);

        // Switch direction if heading to and colliding with forest 

        if (tileAreaCollision) {
            
            if (tileAreaCollision.obj.id.description === "forest") {
               
                switch(duck.direction) {
                    case "n":
                       
                if(tileAreaCollision.blocked.top)  duck.direction = "s";  
                    break;
                case "e":
                    if(tileAreaCollision.blocked.right)  duck.direction = "w";     
                    break;
                case "s":
                    if(tileAreaCollision.blocked.bottom)  duck.direction = "n";     
                    break;
                case "w":
                    if(tileAreaCollision.blocked.left) duck.direction = "e";                  
                    break;
                }
            } 
        }

        if (!duck.animations.isPlaying(`sit-${duck.direction}`)) {
            duck.animations.play(`sit-${duck.direction}`);
        }


        const duckIsBlocked = collisions.find(dc => dc.obj.id.description === "duck" && (duck.direction === "n" && dc.blocked.top 
            || duck.direction === "s" && dc.blocked.bottom
        || duck.direction === "e" && dc.blocked.right
        || duck.direction === "w" && dc.blocked.left)) !== undefined;


        if(duckIsBlocked) {

            // Find a direction for duck to move 
                    const blockedDirections = collisions.reduce((acc, c) => {
                if (c.blocked.top) acc.push("n");
                if (c.blocked.right) acc.push("e");
                if (c.blocked.bottom) acc.push("s");
                if (c.blocked.left) acc.push("w");
                return acc;
            }, []);

            const directions = ["n", "e", "s", "w"];
            const available = directions.filter(d => !blockedDirections.includes(d));

            if (available.length > 0) {
                // pick a random available direction
                duck.direction = available[Math.floor(Math.random() * available.length)];
                    this.randomWalk.update();


                switch(duck.direction) {
                    case "n":
                        duck.pos.y -= 1;
                        break;
                    case "e":
                        duck.pos.x += 1;
                        break;
                    case "s":
                        duck.pos.y += 1;
                        break;
                    case "w":
                        duck.pos.x -= 1;
                        break;
                }
            }


        } else {
              this.randomWalk.update();


                switch(duck.direction) {
                    case "n":
                        duck.pos.y -= 1;
                        break;
                    case "e":
                        duck.pos.x += 1;
                        break;
                    case "s":
                        duck.pos.y += 1;
                        break;
                    case "w":
                        duck.pos.x -= 1;
                        break;
                }
        }


 

        // if (duck.scene.art.keys.up) {
        //     duck.direction = "n";
        //     duck.pos.y -= 1;
        // } else if (duck.scene.art.keys.right) {
        //     duck.direction = "e";
        //     duck.pos.x += 1;
        // } else if (duck.scene.art.keys.down) {
        //     duck.direction = "s";
        //     duck.pos.y += 1;
        // } else if (duck.scene.art.keys.left) {
        //     duck.direction = "w";
        //     duck.pos.x -= 1;
        // }

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
     * @param {"n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw"} direction
     */
    constructor(scene, id, pos, width, height, dna, sex, age) {
        super(scene, id, pos, width, height, ["n", "e", "s", "w"].random());
        this.TAG = "Duck";
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
        // this.#actionState.exit(this);
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

        const collisions = this.#getCollisions();

        // Switch states between walking and swimming when passing grass/lake 

        const tileWalkingAreaCollision = collisions.filter(c => ["grass", "lake"].includes(c.obj.id.description)).sort((a, b) => (b.overlap.x + b.overlap.y) 
        - (a.overlap.x + a.overlap.y))[0];

        if (tileWalkingAreaCollision) {
            if (tileWalkingAreaCollision.obj.id.description === "lake" && !this.isSwimming()) {
                 this.actionState = new Swimming();
            } else if (tileWalkingAreaCollision.obj.id.description === "grass" && !this.isWalking()) {
                this.actionState = new Walking();
            } 

        }

        this.#actionState.update(this, collisions);

        this.animations.update();
    }

    #getCollisions() {
        const collisions = [];

        for (const a of this.scene.areas) {
            for (const t of a.tiles) {
                const c = getCollision(this, new StaticImage(this, Symbol(a.label), { x: t.x, y: t.y }, t.width, t.height));
                if (c) {
                    collisions.push(c);
                }
            }
        }

        for(const d of this.scene.ducks) {
            if(d.id !== this.id) {
 const c = getCollision(this, d);
            
            if (c) {
                collisions.push(c);
            }
            }
           
        }

        return collisions;

    }

    // draw() {sssssssss


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
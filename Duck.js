


class LifeCycleState {
    update(duck) {

    }
}

class Duckling extends LifeCycleState {
    update(duck) {

    }
}

class MotherOfDucks extends LifeCycleState {
    update(duck) {

    }
}

class FatherOfDucks extends LifeCycleState {
    update(duck) {

    }
}

class Swimming extends LifeCycleState {
    update(duck) {

    }
}

class ActionState {
    update(duck) {

    }
}

class Swimming extends ActionState {
    update(duck) {

    }
}

class Ducking extends ActionState {
    update(duck) {

    }
}

class Grazing extends ActionState {
      update(duck) {

    }
}

class Sleeping extends ActionState {
      update(duck) {

    }
}

class Incubating extends ActionState {
    update(duck) {

    }
}

class SittingIdle extends ActionState {
    update(duck) {

    }
}

class StandingIdle extends ActionState {
    update(duck) {

    }
}


export default class Duck {

    constructor(dna, sex, age) {
        this.sex = sex;
        this.dna = dna;
        this.age = age;
        this.health = 100;
    }

    update() {

        this.health -= 20;

        if(this.health < 50) {
            this.health += (Math.floor(Math.random() * 50));
            this.age += 1;
        }
    }

    draw() {

        const [
            size,
            wingSpan,
            colorRichness,
            aggressivness,
            friendly,
            fertility,
            weight
        ] = this.dna.genes;

        console.log(
            `Sex: ${this.sex} Size: ${size}, Wing Span: ${wingSpan}, Color Richness: ${colorRichness}, ` +
            `Aggressiveness: ${aggressivness}, Friendly: ${friendly}, Fertility: ${fertility}, Weight: ${weight}, ` +
            `Age: ${this.age}, Health: ${this.health}`
        );
    }
}
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, health) {
        super(scene, x, y, texture, frame);

        this.health = health;

        scene.add.existing(this);

        return this;
    }

    takeDamage() {
        if (this.health > 1) {
            this.health--;
        }
        else {
            this.scene.lose();
        }
    }

    update() { }

}
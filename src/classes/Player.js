class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, health) {
        super(scene, x, y, texture, frame);

        this.health = health;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        return this;
    }

    takeDamage(damage) {
        if (this.health > 1) {
            this.health -= damage;
        }
        else {
            this.scene.lose();
        }
    }

    update() { }

}
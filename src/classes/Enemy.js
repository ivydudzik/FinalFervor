class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, health) {
        super(scene, x, y, texture, frame);

        this.health = health;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        return this;
    }

    takeDamage(damage) {
        this.health -= damage;
    }

    update() { }

}
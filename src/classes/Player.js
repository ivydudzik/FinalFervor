class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, health) {
        super(scene, x, y, texture, frame);

        // Stats
        this.health = health;
        this.speed = 75;
        this.fireDelay = 500;
        this.arrowSpeed = 250;
        this.arrowLifetime = 500;

        // State tracking to allow continuous shooting
        this.isWaitingToFire = false;
        this.lastFiredAt = 0;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set up Phaser-provided cursor key input containing 4 hotkeys for Up, Down, Left and Right, and also Space Bar and shift.
        this.cursors = scene.input.keyboard.createCursorKeys();

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

    update() {
        // Update Loop Here
        this.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.setVelocityX(-1);
        }
        else if (this.cursors.right.isDown) {
            this.setVelocityX(1);
        }

        if (this.cursors.up.isDown) {
            this.setVelocityY(-1);
        }
        else if (this.cursors.down.isDown) {
            this.setVelocityY(1);
        }

        this.body.velocity.normalize()

        this.body.velocity.x *= this.speed;
        this.body.velocity.y *= this.speed;
    }

}
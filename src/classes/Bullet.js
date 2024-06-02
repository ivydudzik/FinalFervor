class Bullet extends Phaser.Physics.Arcade.Sprite {
    fire(x, y, vx, vy) {
        this.enableBody(true, x, y, true, true);
        this.setVelocity(vx, vy);
        this.setRotation(this.body.velocity.angle() + Phaser.Math.PI2 / 4);
    }

    onCreate() {
        this.disableBody(true, true);
        this.body.collideWorldBounds = true;
        this.body.onWorldBounds = true;
    }

    onWorldBounds() {
        this.disableBody(true, true);
    }
}

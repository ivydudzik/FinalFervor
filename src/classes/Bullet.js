class Bullet extends Phaser.Physics.Arcade.Sprite {
    fire(x, y, vx, vy) {
        this.enableBody(true, x, y, true, true);
        this.setVelocity(vx, vy);
        this.setRotation(this.body.velocity.angle() + Phaser.Math.PI2 / 4);
        // Will be set by battle scene:
        this.deathEvent = null;
    }

    onCreate() {
        this.disableBody(true, true);
        this.body.collideWorldBounds = true;
        this.body.onWorldBounds = true;
    }

    onWorldBounds() {
        this.disableBody(true, true);
        this.deathEvent.remove();
    }

    onCollision() {
        this.disableBody(true, true);
        this.deathEvent.remove();
    }

    onExpire() {
        this.disableBody(true, true);
        this.deathEvent.remove();
    }
}

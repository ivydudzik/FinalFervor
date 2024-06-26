class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, health) {
        super(scene, x, y, texture, frame);
        // Level Tracking
        this.levelUpRequirements = [
            5, 10, 20, 35,
            55, 80, 100, 100,
            100, 100, 100, 100,
            200, 200, 200, 200,
            400, 400, 400, 400,
            800, 800, 800, 800,
            800, 800, 800, 800,
            1600, 1600, 1600, 1600,
            3200, 3200, 3200, 3200,
            6400, 6400, 6400, 6400,
        ]
        this.level = 0;
        this.exp = 0;

        // Common Upgrade Stats
        this.health = health;
        this.speed = 75;
        this.fireDelay = 500;
        this.arrowSpeed = 250;
        this.arrowLifetime = 500;
        this.arrowDamage = 1;
        this.arrowSize = 0.75;
        this.dashCooldown = 1500;
        this.dashCharges = 1;

        // Legendary Upgrade Stats
        this.piercingArrows = false;
        this.explosiveArrows = false;
        this.explosionArrowCount;
        this.multishot = false
        this.arrowCount = 1;
        this.arrowSpread;

        // Static Stats
        this.dashSpeedModifier = 10;
        this.dashLength = 100;

        // State tracking to allow continuous shooting
        this.isWaitingToFire = false;
        this.lastFiredAt = 0;

        // State tracking for dash
        this.currentDashCharges = this.dashCharges;
        this.isDashing = false;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set up Phaser-provided cursor key input containing 4 hotkeys for Up, Down, Left and Right, and also Space Bar and shift.
        this.cursors = scene.input.keyboard.createCursorKeys();

        return this;
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.scene.lose();
        }
    }

    startDash() {
        this.speed *= this.dashSpeedModifier;
    }

    stopDash() {
        this.speed /= this.dashSpeedModifier;
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

        this.body.velocity.normalize();

        this.body.velocity.x *= this.speed;
        this.body.velocity.y *= this.speed;
    }

}
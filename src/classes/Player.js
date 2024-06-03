class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, health) {
        super(scene, x, y, texture, frame);

        this.health = health;
        this.speed = 75;
        this.arrowSpeed = 250;

        // Tracks current player upgrades and stores constant stats used by the player controller when certain upgrades are possesed
        this.upgrades = {
            "healthUpgrade": { "count": 2, "max_count": 3, "heartAmount": 5 },
            "moveSpeedUpgrade": { "count": 2, "max_count": 3, "multiplier": 2 },

            "piercingUpgrade": { "count": 0, "max_count": 1 },

        }

        this.moveSpeedUpgradePower = 2;

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

        this.body.velocity.x *= this.speed * (this.upgrades.moveSpeedUpgrade.multiplier ** this.upgrades.moveSpeedUpgrade.count);
        this.body.velocity.y *= this.speed * (this.upgrades.moveSpeedUpgrade.multiplier ** this.upgrades.moveSpeedUpgrade.count);
    }

}
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, player, x, y, texture, frame, health, speed, damage) {
        super(scene, x, y, texture, frame);

        this.scene = scene;
        this.player = player;

        this.playerBufferZone = 10;
        this.playerOffset = 8;

        // enemy stats
        this.health = health;
        this.speed = speed;
        this.damage = damage;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setBounce(10);

        return this;
    }

    takeDamage(damage) {
        this.health -= damage;
    }

    preUpdate() { 
        this.setVelocity(0);

        if (this.body.position.x < ((this.player.body.x + (this.playerOffset / 2)) - this.playerBufferZone))
        {
            this.setVelocityX(1);
        }
        else if (this.body.position.x > ((this.player.body.x + (this.playerOffset / 2)) + this.playerBufferZone))
        {
            this.setVelocityX(-1);
        }

        if (this.body.position.y < ((this.player.body.y + this.playerOffset)  - this.playerBufferZone))
        {
            this.setVelocityY(1);
        }
        else if (this.body.position.y > ((this.player.body.y + this.playerOffset) + this.playerBufferZone))
        {
            this.setVelocityY(-1);
        }

        this.body.velocity.normalize();

        this.body.velocity.x *= this.speed;
        this.body.velocity.y *= this.speed;
    }

}
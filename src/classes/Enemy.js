class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, player, x, y, texture, frame, health, speed, damage, expValue) {
        super(scene, x, y, texture, frame);

        this.scene = scene;
        this.player = player;

        this.playerBufferZone = 10;
        this.playerOffset = 8;

        // enemy stats
        this.health = health;
        this.speed = speed;
        this.damage = damage;
        this.attackCooldown = 0;
        this.cooldownTime = 2 * 144; // left # in seconds

        this.expValue = expValue;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        //vfx
        this.deathvfx = scene.add.sprite(this.body.position.x, this.body.position.y, "enemy_death");
        this.deathvfx.setScale(0.5);
        this.deathvfx.visible = false;

        this.deathvfx.on("animationcomplete", () => {
            this.destroy();
        });

        return this;
    }

    takeDamage(damage) {
        console.log("enemy took " + damage + " damage!")
        this.health -= damage;

        if (this.health <= 0)
        {
            this.visible = false;
            this.scene.physics.world.disable(this);
            this.deathvfx.visible = true;
            this.deathvfx.play("enemy_death");
        }
    }

    dealDamage() {
        if (this.attackCooldown <= 0) {
            this.player.takeDamage(this.damage);
            this.attackCooldown = this.cooldownTime;
        }
    }

    preUpdate() {
        this.setVelocity(0);

        if (this.body.position.x < ((this.player.body.x + (this.playerOffset / 2)) - this.playerBufferZone)) {
            this.setVelocityX(1);
        }
        else if (this.body.position.x > ((this.player.body.x + (this.playerOffset / 2)) + this.playerBufferZone)) {
            this.setVelocityX(-1);
        }

        if (this.body.position.y < ((this.player.body.y + this.playerOffset) - this.playerBufferZone)) {
            this.setVelocityY(1);
        }
        else if (this.body.position.y > ((this.player.body.y + this.playerOffset) + this.playerBufferZone)) {
            this.setVelocityY(-1);
        }

        this.body.velocity.normalize();

        this.body.velocity.x *= this.speed;
        this.body.velocity.y *= this.speed;

        this.attackCooldown--;

        this.deathvfx.x = this.body.position.x + 7;
        this.deathvfx.y = this.body.position.y + 6;
    }

}
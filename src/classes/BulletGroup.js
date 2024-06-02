class BulletGroup extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, config) {
        super(
            world,
            scene,
            { ...config, classType: Bullet, createCallback: BulletGroup.prototype.onCreate }
        );
    }

    fire(x, y, vx, vy) {
        const bullet = this.getFirstDead(false);

        if (bullet) {
            bullet.fire(x, y, vx, vy);
        }
    }

    onCreate(bullet) {
        bullet.onCreate();
    }
}
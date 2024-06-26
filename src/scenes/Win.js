class Win extends Phaser.Scene {
    constructor() {
        super("winScene");

        this.my = { sprite: {} };
    }

    preload() { }

    create() {
        this.my.sprite.start = this.add.text(game.config.width / 2,
            game.config.height / 2,
            "YOU WIN",
            { fontSize: '76px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.my.sprite.start.setOrigin(0.5, 0.5);
        this.time.delayedCall(1000, this.nextScene, [], this);
    }

    nextScene() {
        this.scene.start("menuScene")
    }

    update() { }
}
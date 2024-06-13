class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");

        this.my = { sprite: {} };
    }

    preload() { }

    create() {
        this.my.sprite.start = this.add.text(game.config.width / 2,
            game.config.height / 3,
            "FINAL FERVOR",
            { color: '#fffff2', fontSize: '156px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.my.sprite.start.setOrigin(0.5, 0.5);
        //this.time.delayedCall(1000, this.nextScene, [], this);
        const credits1 = this.add.text(game.config.width / 2, game.config.height * 14 / 16, 'By Ivy Dudzik & Gabe Ahrens', { fill: '#ffff92', fontSize: '36px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        credits1.setOrigin(0.5, 0.5);
        const credits2 = this.add.text(game.config.width / 2, game.config.height * 15 / 16, 'Asset credits in README', { fill: '#ffe991', fontSize: '24px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        credits2.setOrigin(0.5, 0.5);
        const startButton = this.add.text(game.config.width / 2, game.config.width / 3 + 64, 'START', { fill: '#6AC965', fontSize: '64px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        startButton.setOrigin(0.5, 0.5);
        startButton.setInteractive();
        startButton.on('pointerover', () => { startButton.setFill('#85E740'); });
        startButton.on('pointerout', () => { startButton.setFill('#6AC965'); });
        startButton.on('pointerdown', () => { this.nextScene(); });
    }

    nextScene() {
        this.scene.start("battleScene");
    }

    update() { }
}
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");

        this.my = { sprite: {} };
    }

    preload() { }

    create() {
        this.my.sprite.start = this.add.text(game.config.width / 2,
            game.config.height / 2,
            "Final Fervor",
            { color: '#034600', fontSize: '76px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.my.sprite.start.setOrigin(0.5, 0.5);
        //this.time.delayedCall(1000, this.nextScene, [], this);
        const credits = this.add.text(20, 840, 'A game by: Ivy Dudzik & Gabe Ahrens', { fill: '#000', fontSize: '36px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        const startButton = this.add.text(game.config.width / 2, 600, 'Start', { fill: '#6AC965', fontSize: '48px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
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
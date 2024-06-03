class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    create() {
        //  Grab a reference to the Game Scene
        this.gameScene = this.scene.get('battleScene');

        // Player Health
        this.playerHealthText = this.add.text(10, 2.5, 0, { fontSize: '36px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    }

    update() {
        this.playerHealthText.text = "HP: " + this.gameScene.player.health;
    }
}
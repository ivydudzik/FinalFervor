class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/audio/");
        this.load.audio('theme', '641926__kbrecordzz__scifi-1-1.mp3');
        // scifi (1) (1).mp3 by kbrecordzz -- https://freesound.org/s/641926/ -- License: Creative Commons 0
        this.load.audio('pingSound', 'Switch.wav');

        this.load.setPath("./assets/art");
        this.load.image("playerSprite", "Player.png");
        this.load.image("furDevilSprite", "Fur Devil.png");
        this.load.image("arrow", "Arrow.png");

        this.load.image("grass", "Grass.png");

        this.load.setPath("./assets/art/ui");
        this.load.image("upgradePanel", "Upgrade Panel.png");
        this.load.image("upgradeTitleRibbon", "Upgrade Title Ribbon.png");
    }

    create() {

        const music = this.sound.add('theme');
        music.setVolume(0.025);
        music.setLoop(true);
        music.play();

        // Start game after loading
        this.scene.start("menuScene");
    }

    update() { }
}
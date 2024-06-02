class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/audio/");
        this.load.audio('theme', '641926__kbrecordzz__scifi-1-1.mp3');
        // scifi (1) (1).mp3 by kbrecordzz -- https://freesound.org/s/641926/ -- License: Creative Commons 0
        this.load.audio('pingSound', 'Switch.wav');

        this.load.setPath("./assets/");
        this.load.image("playerSprite", "pack (drag from me)/Red Sprite V3/Red Sprite/@Extra/Side Portrait Large.png");
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
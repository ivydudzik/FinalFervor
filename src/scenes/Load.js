class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/audio/");
        this.load.audio('theme', '641926__kbrecordzz__scifi-1-1.mp3');
        // scifi (1) (1).mp3 by kbrecordzz -- https://freesound.org/s/641926/ -- License: Creative Commons 0
        this.load.audio('pingSound', 'Switch.wav');
        this.load.audio('enemyDeath1', 'pop1.mp3');
        this.load.audio('enemyDeath2', 'pop2.mp3');
        this.load.audio('enemyDeath3', 'pop3.mp3');
        this.load.audio('levelUp', 'levelUP.mp3');


        this.load.setPath("./assets/art");
        this.load.image("playerSprite", "Player.png");
        this.load.image("furDevilSprite", "Fur Devil.png");
        this.load.image("bushlingSprite", "Bushling.png");
        this.load.image("stingFlySprite", "StingFly.png");
        this.load.image("furDevilSpriteElite", "Fur Devil Elite.png");
        this.load.image("bushlingSpriteElite", "Bushling Elite.png");
        this.load.image("stingFlySpriteElite", "StingFly Elite.png");
        this.load.image("arrow", "Arrow.png");

        this.load.image("grass", "Grass.png");

        this.load.spritesheet("vfx", "vfxSpritesheet.png", { frameWidth: 64, frameHeight: 64 });

        this.load.setPath("./assets/art/ui");
        this.load.image("upgradePanel", "Upgrade Panel.png");
        this.load.image("upgradeTitleRibbon", "Upgrade Title Ribbon.png");
    }

    create() {

        const music = this.sound.add('theme');
        music.setVolume(0.025);
        music.setLoop(true);
        music.play();

        this.anims.create({
            key: "dash",
            frameRate: 48,
            frames: this.anims.generateFrameNumbers("vfx", { start: 174, end: 189 }),
            repeat: 0
        });

        this.anims.create({
            key: "level_up",
            frameRate: 24,
            frames: this.anims.generateFrameNumbers("vfx", { start: 304, end: 320 }),
            repeat: 0
        });

        this.anims.create({
            key: "level_up_2",
            frameRate: 16,
            frames: this.anims.generateFrameNumbers("vfx", { start: 95, end: 111 }),
            repeat: 0
        });

        this.anims.create({
            key: "enemy_death",
            frameRate: 48,
            frames: this.anims.generateFrameNumbers("vfx", { start: 190, end: 205 }),
            repeat: 0
        });

        // Start game after loading
        this.scene.start("menuScene");
    }

    update() { }
}
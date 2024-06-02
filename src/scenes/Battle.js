class Battle extends Phaser.Scene {
    constructor() {
        super("battleScene");
    }

    init() {
    }

    create() {
        // Set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // Create a Key to Restart, Toggle Debug Mode
        this.createRestartToggleKey('keydown-R');
        this.createDebugToggleKey('keydown-D');

        // Add Descriptive Text
        document.getElementById('description').innerHTML = '<h3>ARROW KEYS to move // MOUSE to aim // MOUSE LEFT to shoot </h3>'

        // Create the main player sprite
        my.sprite.player = new Player(this, game.config.width / 2, game.config.height / 2, "playerSprite", null, 3);

        this.input.on("pointerdown", () => {
            console.log("player takes 1 damage!");
            this.damageSound = this.sound.add('pingSound');
            this.damageSound.setVolume(0.1);
            this.damageSound.play();
            my.sprite.player.takeDamage();
        }, this);
    }

    win() {
        console.log("you win!");
        this.winSound = this.sound.add('pingSound');
        this.winSound.setVolume(0.1);
        this.winSound.play();
        this.scene.start("winScene");
    }

    lose() {
        console.log("you lose!");
        this.loseSound = this.sound.add('pingSound');
        this.loseSound.setVolume(0.1);
        this.loseSound.play();
        this.scene.start("loseScene");
    }

    update() {
        // Update Loop Here
    }

    createDebugToggleKey(key) {
        // Add Debug key listener (assigned to D key)
        this.input.keyboard.on(key, () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

        // Disable debug drawing by default
        this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
        this.physics.world.debugGraphic.clear()
    }

    createRestartToggleKey(key) {
        this.input.keyboard.on(key, () => {
            this.scene.restart();
        }, this);
    }
}
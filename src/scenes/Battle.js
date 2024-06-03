class Battle extends Phaser.Scene {
    constructor() {
        super("battleScene");
    }

    init() {

    }

    create() {
        this.init();

        // Create UI
        this.scene.run("UIScene");
        this.UIScene = this.scene.get('UIScene');

        // Set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // Add Descriptive Text
        document.getElementById('description').innerHTML = '<h3>ARROW KEYS to move // MOUSE to aim // MOUSE LEFT to shoot </h3>'

        // Set map bounds
        this.physics.world.setBounds(0, 0, game.config.width, game.config.height);

        // Create the main player sprite
        this.player = new Player(this, game.config.width / 2, game.config.height / 2, "playerSprite", null, 20);

        // Creat temp enemy
        this.enemy = new Enemy(this, game.config.width / 2, game.config.height / 2 + 50, "furDevilSprite", null, 3);

        // Creat temp forest features
        this.grass = [];
        this.grass += this.add.sprite(game.config.width / 2 + 16, game.config.height / 2 + 64, "grass");
        this.grass += this.add.sprite(game.config.width / 2 - 128, game.config.height / 2 + 32, "grass");
        this.grass += this.add.sprite(game.config.width / 2 + 144, game.config.height / 2 - 64, "grass");

        // Create Player Bullets
        this.bulletGroup = this.add.existing(
            new BulletGroup(this.physics.world, this, { name: 'bulletGroup' })
        );
        this.bulletGroup.createMultiple({
            key: 'arrow',
            quantity: 100
        });
        // Give them an event trigger for when they hit the world bounds
        this.physics.world.on('worldbounds', (body) => {
            body.gameObject.onWorldBounds();
        });

        // Enemy x Player Bullet Collision
        this.physics.add.overlap(this.enemy, this.bulletGroup, (enemy, bullet) => {
            console.log("bullet collision");
            // for visual on impact
            // const { x, y } = bullet.body.center;

            enemy.takeDamage(3);
            bullet.disableBody(true, true);

            if (enemy.health <= 0) {
                enemy.body.checkCollision.none = true;
                enemy.setActive(false);
                enemy.setVisible(false);
            }
        });

        // Create Upgrade Manager
        this.upgradeManager = new UpgradeManager(this, this.UIScene, this.player);

        // Configure Camera
        this.cameras.main.startFollow(this.player);
        //this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(SCALE);

        // // CONTROLS

        // Create a Key to Restart, Toggle Debug Mode
        this.createRestartToggleKey('keydown-R');
        this.createDebugToggleKey('keydown-D');

        // Make bullets fire on mouseclick
        this.input.on('pointerdown', () => {
            let pointerInCameraSpace = this.input.activePointer.positionToCamera(this.cameras.main);
            // CJAMGE TP S{PROTE WODTJJ}
            let playerToMouse = new Phaser.Math.Vector2(pointerInCameraSpace.x - this.player.body.position.x - 8, pointerInCameraSpace.y - this.player.body.position.y - 12).normalize();
            this.bulletGroup.fire(this.player.x, this.player.y, playerToMouse.x * this.player.arrowSpeed, playerToMouse.y * this.player.arrowSpeed);
        });

        // Make bullets fire on mouseclick
        this.input.keyboard.on('keydown-A', () => {
            this.player.setVelocity(0, 100);
        });

        // Make upgrade menu come up on input 1
        this.input.keyboard.on('keydown-ONE', () => {
            this.upgradeManager.levelUp();
        });


        // Cruelly, make player take damage on mouseclick
        this.input.on("pointerdown", () => {
            console.log("player takes 1 damage!");
            this.damageSound = this.sound.add('pingSound');
            this.damageSound.setVolume(0.1);
            this.damageSound.play();
            // this.player.takeDamage(1);
        }, this);
    }

    win() {
        console.log("you win!");
        this.winSound = this.sound.add('pingSound');
        this.winSound.setVolume(0.1);
        this.winSound.play();
        this.scene.stop("UIScene");
        this.scene.start("winScene");
    }

    lose() {
        console.log("you lose!");
        this.loseSound = this.sound.add('pingSound');
        this.loseSound.setVolume(0.1);
        this.loseSound.play();
        this.scene.stop("UIScene");
        this.scene.start("loseScene");
    }

    update() {

        this.player.update();


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
            this.scene.stop("UIScene");
        }, this);
    }
}
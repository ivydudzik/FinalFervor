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

        // Creat temp forest features
        this.grass = [];
        this.grass += this.add.sprite(game.config.width / 2 + 16, game.config.height / 2 + 64, "grass");
        this.grass += this.add.sprite(game.config.width / 2 - 128, game.config.height / 2 + 32, "grass");
        this.grass += this.add.sprite(game.config.width / 2 + 144, game.config.height / 2 - 64, "grass");

        // Create the main player sprite
        this.player = new Player(this, game.config.width / 2, game.config.height / 2, "playerSprite", null, 20);

        // Creat temp enemy
        this.testEnemy = new Enemy(this, game.config.width / 2, game.config.height / 2 + 50, "furDevilSprite", null, 3);

        // Create Enemy Manager
        this.enemyManager = new EnemyManager(this);

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
        this.addEnemyBulletCollision(this.testEnemy, this.bulletGroup);

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

        // Make bullets start fire on mouseclick
        this.input.on('pointerdown', () => {
            if (!this.player.isWaitingToFire) {
                this.player.isWaitingToFire = true;
                let waitTime = Phaser.Math.Clamp(this.player.fireDelay - (this.time.now - this.player.lastFiredAt), 0, this.player.fireDelay);
                this.attackStartCooldownEvent = this.time.addEvent({
                    delay: waitTime,
                    callback: () => {
                        this.player.isWaitingToFire = false;
                        this.playerFire();
                        this.attackRateCooldownEvent = this.time.addEvent({
                            delay: this.player.fireDelay, // in ms
                            callback: this.playerFire,
                            callbackScope: this,
                            loop: true
                        });
                    }
                });
            }
        });

        // Make bullets stop fire on mouseup
        this.input.on('pointerup', () => {
            if (this.player.isWaitingToFire) {
                this.attackStartCooldownEvent.remove();
                this.player.isWaitingToFire = false;
            }
            this.attackRateCooldownEvent.remove();
        });

        // Make bullets fire on mouseclick
        this.input.keyboard.on('keydown-A', () => {
            this.player.setVelocity(0, 100);
        });

        // Make upgrade menu come up on input 1
        this.input.keyboard.on('keydown-ONE', () => {
            this.upgradeManager.levelUp();
        });
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

    playerFire() {
        this.player.lastFiredAt = this.time.now;
        // Play attack sound
        this.attackSound = this.sound.add('pingSound');
        this.attackSound.setVolume(0.1);
        this.attackSound.play();
        // Calculate Arrow Angle
        let pointerInCameraSpace = this.input.activePointer.positionToCamera(this.cameras.main);
        let playerToMouse = new Phaser.Math.Vector2(pointerInCameraSpace.x - this.player.body.position.x - (this.player.width / 2), pointerInCameraSpace.y - this.player.body.position.y - (this.player.height / 2)).normalize();
        this.bulletGroup.fire(this.player.x, this.player.y, playerToMouse.x * this.player.arrowSpeed, playerToMouse.y * this.player.arrowSpeed);
    }

    addEnemyBulletCollision(collidingEnemy, collidingBulletGroup) {
        this.physics.add.overlap(collidingEnemy, collidingBulletGroup, (enemy, bullet) => {
            console.log("bullet collision");
            // for visual on impact
            // const { x, y } = bullet.body.center;

            enemy.takeDamage(1);
            bullet.disableBody(true, true);

            if (enemy.health <= 0) {
                // enemy.body.checkCollision.none = true;
                // enemy.setActive(false);
                // enemy.setVisible(false);
                enemy.destroy();
            }
        });
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
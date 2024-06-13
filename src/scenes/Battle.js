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
        this.player.body.collideWorldBounds = true;

        // Create Enemy Manager
        this.enemyManager = new EnemyManager(this, this.player);

        // Creat temp enemy
        //this.testEnemy = new Enemy(this, this.player, game.config.width / 2, game.config.height / 2 + 50, "furDevilSprite", null, 3, 50, 1);

        // Create Player Bullets
        this.bulletGroup = this.add.existing(
            new BulletGroup(this.physics.world, this, { name: 'bulletGroup' })
        );
        this.bulletGroup.createMultiple({
            key: 'arrow',
            quantity: 1000
        });
        // Give them an event trigger for when they hit the world bounds
        this.physics.world.on('worldbounds', (body) => {
            body.gameObject.onWorldBounds();
        });

        // Enemy x Player Bullet Collision
        // this.addEnemyBulletCollision(this.testEnemy, this.bulletGroup);

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

        this.dashVFX = this.add.sprite(this.player.x, this.player.y, "vfx");
        this.dashVFX.setScale(0.5);
        this.dashVFX.visible = false;

        this.dashVFX.on("animationcomplete", () => {
            this.dashVFX.visible = false;
        });

        this.facingRight = -1;

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
            if (this.attackRateCooldownEvent) { this.attackRateCooldownEvent.remove(); }
        });

        // Make bullets stop fire on mouse leave canvas
        this.input.on('gameout', () => {
            if (this.player.isWaitingToFire) {
                this.attackStartCooldownEvent.remove();
                this.player.isWaitingToFire = false;
            }
            if (this.attackRateCooldownEvent) { this.attackRateCooldownEvent.remove(); }
        });

        // Make player dash if they have charges and are not currently dashing
        this.input.keyboard.on('keydown-CTRL', () => {
            if (!this.player.isDashing && this.player.currentDashCharges >= 1) {
                this.player.startDash();
                this.player.currentDashCharges -= 1;
                this.player.isDashing = true;
                console.log("dashing!");

                this.dashVFX.visible = true;
                this.dashVFX.play("dash");
                // Stop dash after dash length
                this.time.delayedCall(this.player.dashLength, () => {
                    this.player.isDashing = false;
                    this.player.stopDash();
                    console.log("not dashing!");
                }, [], this);
                // Start regen of dash charge
                this.time.delayedCall(this.player.dashCooldown, () => {
                    this.player.currentDashCharges += 1;
                    console.log("dash regained!");
                }, [], this);
            }
        });

        // 5 minute timer
        this.timer = 0.0;
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

    update(_time, delta) {
        this.player.update();
        //this.enemyManager.update();

        if (this.player.cursors.left.isDown) {
            this.facingRight = 1;
            //this.player.setFlipX(true);
            this.dashVFX.setFlipX(true);
        }
        else if (this.player.cursors.right.isDown) {
            this.facingRight = -1;
            //this.player.setFlipX(false);
            this.dashVFX.setFlipX(false);
        }

        this.dashVFX.x = this.player.x + (16 * this.facingRight);
        this.dashVFX.y = this.player.y + 7;

        this.timer += delta;
        if (this.timer >= 300 * 1000) {
            this.win();
        }
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
        // Fire only one arrow unless player has multishot
        if (!this.player.multishot) {
            // Fire Arrow
            let bullet = this.bulletGroup.fire(this.player.x, this.player.y, playerToMouse.x * this.player.arrowSpeed, playerToMouse.y * this.player.arrowSpeed, this.player.arrowLifetime);
            // Destine each arrow for death
            if (bullet) {
                bullet.scale = this.player.arrowSize;
                bullet.deathEvent = this.time.addEvent({
                    delay: this.player.arrowLifetime, // in ms
                    callback: bullet.onExpire,
                    callbackScope: bullet,
                });
            }
        } else {
            for (let fireAngle = -this.player.arrowSpread / 2; fireAngle <= this.player.arrowSpread / 2; fireAngle += this.player.arrowSpread / (this.player.arrowCount - 1)) {
                // Fire Arrow
                let fireVector = Phaser.Math.Vector2.RIGHT;
                fireVector.setAngle(fireAngle + playerToMouse.angle());
                let bullet = this.bulletGroup.fire(this.player.x, this.player.y, fireVector.x * this.player.arrowSpeed, fireVector.y * this.player.arrowSpeed, this.player.arrowLifetime);
                // Destine each arrow for death
                if (bullet) {
                    bullet.scale = this.player.arrowSize;
                    bullet.deathEvent = this.time.addEvent({
                        delay: this.player.arrowLifetime, // in ms
                        callback: bullet.onExpire,
                        callbackScope: bullet,
                    });
                }
            }
        }
    }

    addEnemyBulletCollision(collidingEnemy, collidingBulletGroup) {
        this.physics.add.overlap(collidingEnemy, collidingBulletGroup, (enemy, bullet) => {
            // If player has piercing, don't destroy the bullet
            if (this.player.piercingArrows) {
                // If already pierced enemy 
                if (bullet.enemiesHit.indexOf(enemy) != -1) { console.log("already hit this enemy"); return; }
                // otherwise
                else { bullet.enemiesHit.push(enemy); }
            } else {
                bullet.onCollision();
            }

            console.log("bullet collision");
            // Collision coordinates
            const { x, y } = bullet.body.center;

            enemy.takeDamage(this.player.arrowDamage);

            if (enemy.health <= 0) {
                this.givePlayerEXP(enemy.expValue);
                //enemy.destroy();


                // If player has explosive arrows, burst into more arrows
                if (this.player.explosiveArrows) {
                    // Fire Arrows
                    for (let fireAngle = 0; fireAngle <= Phaser.Math.PI2; fireAngle += Phaser.Math.PI2 / 8) {
                        let fireVector = Phaser.Math.Vector2.UP;
                        fireVector.setAngle(fireAngle);
                        let explosionBullet = this.bulletGroup.fire(x, y, fireVector.x * this.player.arrowSpeed, fireVector.y * this.player.arrowSpeed, this.player.arrowLifetime);
                        // Destine each arrow for death
                        if (explosionBullet) {
                            explosionBullet.scale = this.player.arrowSize;
                            explosionBullet.deathEvent = this.time.addEvent({
                                delay: this.player.arrowLifetime, // in ms
                                callback: explosionBullet.onExpire,
                                callbackScope: explosionBullet,
                            });
                        }
                    }
                }
            }
            else {
                // play hit sound (instead of death sound)
                // Play attack sound
                this.hitSound = this.sound.add('hit');
                this.hitSound.setVolume(0.5);
                this.hitSound.play();
            }
        });
    }

    givePlayerEXP(expAmount) {
        this.player.exp += expAmount;
        if (this.player.exp >= this.player.levelUpRequirements[this.player.level]) {
            this.player.exp = 0;
            this.player.level += 1;

            // Make player stop firing
            if (this.player.isWaitingToFire) {
                this.attackStartCooldownEvent.remove();
                this.player.isWaitingToFire = false;
            }
            if (this.attackRateCooldownEvent) { this.attackRateCooldownEvent.remove(); }

            // Level up!
            this.upgradeManager.levelUp();
        }
    }

    addPlayerEnemyCollision(player, enemyGroup) {
        this.physics.add.overlap(player, enemyGroup, (player, enemy) => {
            console.log("enemy hit player");
            enemy.dealDamage();
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
class EnemyManager {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        this.enemyGroup = new Phaser.Physics.Arcade.Group(this.scene.physics.world, scene);

        // add enemy collision to the enemyGroup
        this.scene.physics.world.addCollider(this.enemyGroup, this.enemyGroup);

        this.totalEnemiesID = 0;
        this.enemies = [];

        this.waveID = 1;

        // create the waves
        this.waves = {
            "wave_1": { "numEnemy_1": 5, "numEnemy_2": 0, "numEnemy_3": 0 },
            "wave_2": { "numEnemy_1": 10, "numEnemy_2": 0, "numEnemy_3": 0 },
            "wave_3": { "numEnemy_1": 7, "numEnemy_2": 5, "numEnemy_3": 0 },
            "wave_4": { "numEnemy_1": 10, "numEnemy_2": 10, "numEnemy_3": 0 },
            "wave_5": { "numEnemy_1": 15, "numEnemy_2": 15, "numEnemy_3": 0 },
            "wave_6": { "numEnemy_1": 5, "numEnemy_2": 5, "numEnemy_3": 5 },
            "wave_7": { "numEnemy_1": 0, "numEnemy_2": 15, "numEnemy_3": 5 },
            "wave_8": { "numEnemy_1": 10, "numEnemy_2": 10, "numEnemy_3": 10 },
            "wave_9": { "numEnemy_1": 10, "numEnemy_2": 15, "numEnemy_3": 15 },
            "wave_10": { "numEnemy_1": 15, "numEnemy_2": 20, "numEnemy_3": 15 }
        }

        this.enemyTypes = {
            1: { health: 3, image: "furDevilSprite", speed: 50, damage: 1 },
            2: { health: 7, image: "bushlingSprite", speed: 50, damage: 2 },
            3: { health: 4, image: "stingFlySprite", speed: 50, damage: 1 }
        }

        this.waveTimer = this.scene.time.addEvent({
            delay: 3000, // in ms
            callback: this.spawnWave,
            callbackScope: this,
            loop: true
        });
    }

    spawnWave() {
        if (this.waveTimer.delay == 3000) {
            this.waveTimer.delay = 30000;
        }

        if (this.waveID <= 10) {
            console.log("spawned wave " + this.waveID);
            // find the current wave
            let current_wave = this.waves["wave_" + this.waveID];

            // go through enemy types
            for (let i = 1; i < 4; i++) {
                // spawn that many enemies
                for (let j = 0; j < current_wave["numEnemy_" + i]; j++) {
                    this.spawnEnemy(i);
                }
            }

            // iterate waveID
            this.waveID++;
        }

    }

    spawnEnemy(enemyType) {
        // console.log(this.enemyTypes);
        this.enemies[this.totalEnemiesID] = new Enemy(this.scene, this.player, game.config.width / 2 + Phaser.Math.Between(-50, 50), game.config.height / 2 + 50 + Phaser.Math.Between(-50, 50), this.enemyTypes[enemyType].image, null, this.enemyTypes[enemyType].health, this.enemyTypes[enemyType].speed, this.enemyTypes[enemyType].damage);

        this.enemyGroup.add(this.enemies[this.totalEnemiesID]);

        // Enemy x Player Bullet Collision
        this.scene.addEnemyBulletCollision(this.enemies[this.totalEnemiesID], this.scene.bulletGroup);
        
        // iterate the total num enemies
        this.totalEnemiesID++;
    }
}
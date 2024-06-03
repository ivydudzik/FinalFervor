class EnemyManager extends Object
{
    constructor(scene)
    {
        super(scene);

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
            1: { health: 3, image: "furDevilSprite" },
            2: { health: 7, image: "bushlingSprite" },
            3: { health: 4, image: "stingFlySprite" }
        }

        // setup Wave Timer
        this.time.addEvent({
            delay: 30000, // in ms
            callback: this.spawnWave(),
            callbackScope: this,
            loop: true
        });
    }

    spawnWave(playerX, playerY)
    {
        // find the current wave
        let current_wave = this.waves["wave_" + this.waveID];

        // go through enemy types
        for (let i = 0; i < 3; i++)
        {
            // spawn that many enemies
            for (let j = 0; j < current_wave["numEnemy_" + i]; j++)
            {
                // add delay between spawning each enemy
                this.time.addEvent({
                    delay: 500, // in ms
                    callback: this.spawnEnemy(i, playerX, playerY),
                    callbackScope: this,
                    loop: false
                });
            }
        }

        // iterate waveID
        this.waveID++;
    }

    spawnEnemy(enemyType, playerX, playerY)
    {
        new Enemy(scene, game.config.width / 2, game.config.height / 2 + 50, this.enemyTypes[enemyType].image, null, this.enemyTypes[enemyType].health);
    }

    update()
    {

    }
}
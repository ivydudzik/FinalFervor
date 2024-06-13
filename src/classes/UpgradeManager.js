class UpgradeManager {
    constructor(gameScene, UIScene, player) {
        this.gameScene = gameScene;
        this.UIScene = UIScene;
        this.player = player;

        this.upgradeChoices = {
            "Left": null,
            "Center": null,
            "Right": null,
        }

        this.commonUpgradeNames = [
            "healthUpgrade", "moveSpeedUpgrade",
            "attackRateUpgrade", "damageUpgrade",
            "rangeUpgrade", "arrowSizeUpgrade",
            "dashChargeUpgrade", "arrowSpeedUpgrade",
            "tankUpgrade"
        ];

        this.upgrades = {
            "healthUpgrade": {
                "upgradeName": "healthUpgrade",
                "Title": "Health",
                "Body": "You gain MAX HEALTH.\n\n+5 HP",
                "count": 0, "maxCount": 3,
                "heartAmount": 5,
            },
            "moveSpeedUpgrade": {
                "upgradeName": "moveSpeedUpgrade",
                "Title": "Move Speed",
                "Body": "You gain MOVE SPEED. Using more energy, you can DASH less often.\n\n+50% MOVE SPEED\n+25% DASH COOLDOWN",
                "count": 0, "maxCount": 3,
                "moveSpeedMultiplier": 1.5, "dashCooldownMultiplier": 1.25
            },
            "attackRateUpgrade": {
                "upgradeName": "attackRateUpgrade",
                "Title": "Attack Rate",
                "Body": "You gain ATTACK RATE.\n\n+50% ATTACK RATE",
                "count": 0, "maxCount": 3,
                "attackRateMultiplier": 1.5
            },
            "damageUpgrade": {
                "upgradeName": "damageUpgrade",
                "Title": "Damage",
                "Body": "You gain DAMAGE.\n\n+50% DAMAGE",
                "count": 0, "maxCount": 3,
                "damageMultiplier": 1.5
            },
            "rangeUpgrade": {
                "upgradeName": "rangeUpgrade",
                "Title": "Range",
                "Body": "You gain RANGE.\n\n+50% RANGE",
                "count": 0, "maxCount": 3,
                "rangeMultiplier": 1.5
            },
            "arrowSpeedUpgrade": {
                "upgradeName": "arrowSpeedUpgrade",
                "Title": "Arrow Speed",
                "Body": "You gain ARROW SPEED.\n\n+50% ARROW SPEED",
                "count": 0, "maxCount": 3,
                "arrowSpeedMultiplier": 1.5
            },
            "arrowSizeUpgrade": {
                "upgradeName": "arrowSizeUpgrade",
                "Title": "Arrow Size",
                "Body": "You gain ARROW SIZE. These larger arrows move SLOWER.\n\n+50% ARROW SIZE\n-25% ARROW SPEED",
                "count": 0, "maxCount": 3,
                "arrowSizeMultiplier": 1.5, "arrowSpeedMultiplier": 0.75
            },
            "dashChargeUpgrade": {
                "upgradeName": "dashChargeUpgrade",
                "Title": "Dash Charge",
                "Body": "You gain an additional DASH CHARGE.\n\n+1 DASH CHARGE",
                "count": 0, "maxCount": 3,
                "dashChargesGained": 1
            },
            "tankUpgrade": {
                "upgradeName": "tankUpgrade",
                "Title": "Tank",
                "Body": "You gain massive ARROW DMG & SIZE, but lose MOVE SPEED & DASH ABILITY\n\n+100% DMG\n+75% ARR SIZE\n-75% MV SPEED\n-DASH ABILITY",
                "count": 0, "maxCount": 1,
                "damageMultiplier": 2, "arrowSizeMultiplier": 1.75, "moveSpeedMultiplier": 0.25, "dashChargesLost": 4
            },
            "piercingUpgrade": {
                "upgradeName": "piercingUpgrade",
                "Title": "Piercing Shot",
                "Body": "You gain arrows that PIERCE FOES.\n\n+PIERCING ARROWS",
                "count": 0, "maxCount": 1,
                "prerequisite": "rangeUpgrade"
            },
            "multishotUpgrade": {
                "upgradeName": "multishotUpgrade",
                "Title": "Multishot Bow",
                "Body": "You gain a MULTISHOT BOW. \n\n+300% ARROWS\n-25% DAMAGE",
                "count": 0, "maxCount": 2,
                "prerequisite": "attackRateUpgrade",
                "shotSpread": Phaser.Math.PI2 / 8, "shotCountMultiplier": 3, "damageMultiplier": 0.75
            },
            "burstUpgrade": {
                "upgradeName": "burstUpgrade",
                "Title": "Explosive Shot",
                "Body": "You gain arrows that EXPLODE on contact with foes.\n\n+EXPLOSIVE ARROWS",
                "count": 0, "maxCount": 1,
                "prerequisite": "damageUpgrade",
                "burstCount": 8
            },
        }

        return this;
    }

    levelUp() {
        // Randomize upgrades based on valid possibilities, never having two of the same upgrade showing
        let upgradePool = [...this.commonUpgradeNames];

        // Add legendary upgrades for which the player has prerequisites
        for (let legendary of ["burstUpgrade", "multishotUpgrade", "piercingUpgrade"]) {
            if (this.upgrades[this.upgrades[legendary].prerequisite].count >= 1) {
                upgradePool.push(legendary)
            }
        }

        // Remove upgrades with max counts
        let culledUpgradePool = upgradePool.filter((upgrade) => { return this.upgrades[upgrade].count < this.upgrades[upgrade].maxCount; }, this)

        // Pick 3 upgrades to display
        let leftUpgrade = culledUpgradePool.splice(Math.floor(Math.random() * culledUpgradePool.length), 1);
        let centerUpgrade = culledUpgradePool.splice(Math.floor(Math.random() * culledUpgradePool.length), 1);
        let rightUpgrade = culledUpgradePool.splice(Math.floor(Math.random() * culledUpgradePool.length), 1);

        this.upgradeChoices.Left = this.upgrades[leftUpgrade];
        this.upgradeChoices.Center = this.upgrades[centerUpgrade];
        this.upgradeChoices.Right = this.upgrades[rightUpgrade];

        // Set UI text to match
        for (let panel of ["Left", "Center", "Right"]) {
            this.UIScene.setUpgradeText(panel, "Body", this.upgradeChoices[panel].Body);
            this.UIScene.setUpgradeText(panel, "Title", this.upgradeChoices[panel].Title);
        }

        this.UIScene.showUpgradeUI();
    }

    chooseUpgrade(upgradeLocation) {
        console.log("Choosing " + upgradeLocation + " upgrade");
        this.upgradeChoices[upgradeLocation].count += 1;

        for (let upgrade in this.upgrades) {
            console.log(upgrade);
            console.log(this.upgrades[upgrade].count);
        }

        switch (this.upgradeChoices[upgradeLocation].upgradeName) {
            case "healthUpgrade": {
                this.player.health += this.upgrades.healthUpgrade.heartAmount;
                break;
            }
            case "moveSpeedUpgrade": {
                this.player.speed *= this.upgrades.moveSpeedUpgrade.moveSpeedMultiplier;
                this.player.dashCooldown *= this.upgrades.moveSpeedUpgrade.dashCooldownMultiplier;
                break;
            }
            case "attackRateUpgrade": {
                this.player.fireDelay /= this.upgrades.attackRateUpgrade.attackRateMultiplier;
                break;
            }
            case "damageUpgrade": {
                this.player.arrowDamage *= this.upgrades.damageUpgrade.damageMultiplier;
                break;
            }
            case "rangeUpgrade": {
                this.player.arrowLifetime *= this.upgrades.rangeUpgrade.rangeMultiplier;
                break;
            }
            case "arrowSpeedUpgrade": {
                this.player.arrowSpeed *= this.upgrades.arrowSpeedUpgrade.arrowSpeedMultiplier;
                break;
            }
            case "arrowSizeUpgrade": {
                this.player.arrowSize *= this.upgrades.arrowSizeUpgrade.arrowSizeMultiplier;
                this.player.arrowSpeed *= this.upgrades.arrowSizeUpgrade.arrowSpeedMultiplier;
                break;
            }
            case "dashChargeUpgrade": {
                this.player.dashCharges += this.upgrades.dashChargeUpgrade.dashChargesGained;
                this.player.currentDashCharges += this.upgrades.dashChargeUpgrade.dashChargesGained;
                break;
            }
            case "tankUpgrade": {
                this.player.arrowDamage *= this.upgrades.tankUpgrade.damageMultiplier;
                this.player.arrowSize *= this.upgrades.tankUpgrade.arrowSizeMultiplier;
                this.player.speed *= this.upgrades.tankUpgrade.moveSpeedMultiplier;
                this.player.dashCharges -= this.upgrades.tankUpgrade.dashChargesLost;
                this.player.currentDashCharges -= this.upgrades.tankUpgrade.dashChargesLost;
                break;
            }
            case "piercingUpgrade": {
                this.player.piercingArrows = true;
                break;
            }
            case "multishotUpgrade": {
                this.player.multishot = true;
                this.player.arrowDamage *= this.upgrades.multishotUpgrade.damageMultiplier;
                this.player.arrowCount *= this.upgrades.multishotUpgrade.shotCountMultiplier;
                this.player.arrowSpread = this.upgrades.multishotUpgrade.shotSpread;
                break;
            } // unimplimented
            case "burstUpgrade": {
                this.player.explosiveArrows = true;
                this.player.explosionArrowCount = this.upgrades.burstUpgrade.burstCount;
                break;
            }
        }

        this.UIScene.hideUpgradeUI();
    }
}
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

        this.upgrades = {
            "healthUpgrade": {
                "upgradeName": "healthUpgrade",
                "Title": "Health",
                "Body": "You gain MAX HEALTH.\n\n+5 HP",
                "count": 0, "maxCount": 3,
                "heartAmount": 5,
            }, // unimplimented
            "moveSpeedUpgrade": {
                "upgradeName": "moveSpeedUpgrade",
                "Title": "Move Speed",
                "Body": "You gain MOVE SPEED. Using more energy, you can DASH less often.\n\n+50% MOVE SPEED\n+25% DASH COOLDOWN",
                "count": 0, "maxCount": 3,
                "moveSpeedMultiplier": 1.5, "dashCooldownMultiplier": 1.25
            }, // unimplimented
            "attackRateUpgrade": {
                "upgradeName": "attackRateUpgrade",
                "Title": "Attack Rate",
                "Body": "You gain ATTACK RATE.\n\n+50% ATTACK RATE",
                "count": 0, "maxCount": 3,
                "attackRateMultiplier": 1.5
            }, // unimplimented
            "damageUpgrade": {
                "upgradeName": "damageUpgrade",
                "Title": "Damage",
                "Body": "You gain DAMAGE.\n\n+50% DAMAGE",
                "count": 0, "maxCount": 3,
                "damageMultiplier": 1.5
            }, // unimplimented
            "rangeUpgrade": {
                "upgradeName": "rangeUpgrade",
                "Title": "Range",
                "Body": "You gain RANGE.\n\n+50% RANGE",
                "count": 0, "maxCount": 3,
                "rangeMultiplier": 1.5
            }, // unimplimented
            "arrowSizeUpgrade": {
                "upgradeName": "arrowSizeUpgrade",
                "Title": "Arrow Size",
                "Body": "You gain ARROW SIZE. These larger arrows move SLOWER.\n\n+50% ARROW SIZE\n-25% ARROW SPEED",
                "count": 0, "maxCount": 3,
                "arrowSizeMultiplier": 1.5, "arrowSpeedMultiplier": 0.75
            }, // unimplimented
            "dashChargeUpgrade": {
                "upgradeName": "dashChargeUpgrade",
                "Title": "Dash Charge",
                "Body": "You gain an additional DASH CHARGE.\n\n+1 DASH CHARGE",
                "count": 0, "maxCount": 3,
                "dashChargesGained": 1
            }, // unimplimented
            "piercingUpgrade": {
                "upgradeName": "piercingUpgrade",
                "Title": "Piercing Shot",
                "Body": "You gain arrows that PIERCE FOES.\n\n+PIERCING ARROWS",
                "count": 0, "maxCount": 1,
                "prerequisite": "rangeUpgrade"
            }, // unimplimented
            "multishotUpgrade": {
                "upgradeName": "multishotUpgrade",
                "Title": "Multishot Bow",
                "Body": "You gain a MULTISHOT BOW. \n\n+300% ARROWS\n-50% DAMAGE",
                "count": 0, "maxCount": 2,
                "prerequisite": "attackRateUpgrade",
                "shotSpread": Phaser.Math.PI2 / 4, "shotCountMultiplier": 3, "damageMultiplier": 0.5
            }, // unimplimented
            "burstUpgrade": {
                "upgradeName": "burstUpgrade",
                "Title": "Explosive Shot",
                "Body": "You gain arrows that EXPLODE on contact with foes.\n\n+EXPLOSIVE ARROWS",
                "count": 0, "maxCount": 1,
                "prerequisite": "damageUpgrade",
            }, // unimplimented
        }

        return this;
    }

    levelUp() {
        // Randomize upgrades based on valid possibilities
        // Pick 3
        // Modify UI text to match
        this.upgradeChoices.Left = this.upgrades.attackRateUpgrade;
        this.upgradeChoices.Center = this.upgrades.moveSpeedUpgrade;
        this.upgradeChoices.Right = this.upgrades.rangeUpgrade;

        for (let panel of ["Left", "Center", "Right"]) {
            this.UIScene.setUpgradeText(panel, "Body", this.upgradeChoices[panel].Body);
            this.UIScene.setUpgradeText(panel, "Title", this.upgradeChoices[panel].Title);
        }

        this.UIScene.showUpgradeUI();
    }

    chooseUpgrade(upgradeLocation) {
        console.log("Choosing " + upgradeLocation + " upgrade");



        this.UIScene.hideUpgradeUI();
    }
}
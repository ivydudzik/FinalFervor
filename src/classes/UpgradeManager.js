class UpgradeManager {
    constructor(gameScene, UIScene, player) {
        this.gameScene = gameScene;
        this.UIScene = UIScene;
        this.player = player;

        return this;
    }

    levelUp() {
        // Randomize upgrades based on valid possibilities
        // Pick 3
        // Modify UI text to match
        this.UIScene.showUpgradeUI();
    }

    chooseLeftUpgrade() {
        console.log("Choosing left upgrade");
        this.UIScene.hideUpgradeUI();
    }
    chooseCenterUpgrade() {
        console.log("Choosing center upgrade");
        this.UIScene.hideUpgradeUI();
    }
    chooseRightUpgrade() {
        console.log("Choosing right upgrade");
        this.UIScene.hideUpgradeUI();
    }

}
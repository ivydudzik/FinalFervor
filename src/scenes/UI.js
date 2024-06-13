class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    create() {
        //  Grab a reference to the Game Scene
        this.gameScene = this.scene.get('battleScene');

        // Player Health Text
        this.playerHealthText = this.add.text(5, 0, "HP: " + 0, { fontSize: '36px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#ffdbed" });
        this.playerHealthText.setOrigin(0, 0);
        // Player EXP Text
        this.expText = this.add.text(5, 33, "EXP: " + 0, { fontSize: '36px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#fffddb" });
        this.expText.setOrigin(0, 0);
        // Player Level Text
        this.levelText = this.add.text(5, 66, "LVL: " + 0, { fontSize: '36px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#d9fff2" });
        this.levelText.setOrigin(0, 0);
        // Timer Text
        this.timerText = this.add.text(game.config.width - 5, 0, 0, { fontSize: '36px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#FFFFFF" });
        this.timerText.setOrigin(1, 0);

        // 5 minute timer
        this.timer = 0.0;

        // Upgrade UI, Changing Text Names May Break this.setUpgradeText()
        this.upgradeUI = {
            "upgradePanelLeft": this.add.sprite(game.config.width / 4, game.config.height / 2, "upgradePanel").setScale(6),
            "upgradeTitleRibbonLeft": this.add.sprite(game.config.width / 4, game.config.height * 25 / 36, "upgradeTitleRibbon").setScale(6),
            "upgradeTitleLeft": this.add.text(game.config.width / 4, game.config.height * 25 / 36, "L UPGRADE",
                { fontSize: '24px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#000" }).setOrigin(0.5, 0.5),
            "upgradeBodyLeft": this.add.text(game.config.width / 4 - 100, game.config.height * 25 / 36 - 325, "L UPGRADE TEXT I SAY WHAT THE UPGRADE DOES\n\n+100 Cats\n-100% Dogs",
                { fontSize: '24px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#000", wordWrap: { width: 200 } }),

            "upgradePanelCenter": this.add.sprite(game.config.width * 2 / 4, game.config.height / 2, "upgradePanel").setScale(6),
            "upgradeTitleRibbonCenter": this.add.sprite(game.config.width * 2 / 4, game.config.height * 25 / 36, "upgradeTitleRibbon").setScale(6),
            "upgradeTitleCenter": this.add.text(game.config.width * 2 / 4, game.config.height * 25 / 36, "C UPGRADE", { fontSize: '24px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#000" }).setOrigin(0.5, 0.5),
            "upgradeBodyCenter": this.add.text(game.config.width * 2 / 4 - 100, game.config.height * 25 / 36 - 325, "C UPGRADE TEXT I SAY WHAT THE UPGRADE DOES\n\n+100 Cats\n-100% Dogs",
                { fontSize: '24px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#000", wordWrap: { width: 200 } }),

            "upgradePanelRight": this.add.sprite(game.config.width * 3 / 4, game.config.height / 2, "upgradePanel").setScale(6),
            "upgradeTitleRibbonRight": this.add.sprite(game.config.width * 3 / 4, game.config.height * 25 / 36, "upgradeTitleRibbon").setScale(6),
            "upgradeTitleRight": this.add.text(game.config.width * 3 / 4, game.config.height * 25 / 36, "R UPGRADE", { fontSize: '24px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#000" }).setOrigin(0.5, 0.5),
            "upgradeBodyRight": this.add.text(game.config.width * 3 / 4 - 100, game.config.height * 25 / 36 - 325, "R UPGRADE TEXT I SAY WHAT THE UPGRADE DOES\n\n+100 Cats\n-100% Dogs",
                { fontSize: '24px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#000", wordWrap: { width: 200 } }),
        }

        this.upgradeUI["upgradePanelLeft"].setInteractive();
        this.upgradeUI["upgradePanelCenter"].setInteractive();
        this.upgradeUI["upgradePanelRight"].setInteractive();
        this.upgradeUI["upgradePanelLeft"].on("pointerdown", () => { this.gameScene.upgradeManager.chooseUpgrade("Left"); });
        this.upgradeUI["upgradePanelCenter"].on("pointerdown", () => { this.gameScene.upgradeManager.chooseUpgrade("Center"); }, this);
        this.upgradeUI["upgradePanelRight"].on("pointerdown", () => { this.gameScene.upgradeManager.chooseUpgrade("Right"); }, this);

        for (let UIObject in this.upgradeUI) {
            this.upgradeUI[UIObject].setVisible(false);
            this.upgradeUI[UIObject].setActive(false);
        }
        // this.setUpgradeText("Center", "Body", "This was changed recently! OH GOD!\n\n+100 Pogs\n+1 Pogchamps")
        // this.showUpgradeUI();
    }

    update(_time, delta) {
        this.playerHealthText.text = "HP: " + this.gameScene.player.health;
        this.expText.text = "XP: " + this.gameScene.player.exp + "/" + this.gameScene.player.levelUpRequirements[this.gameScene.player.level];
        this.levelText.text = "LVL: " + this.gameScene.player.level;

        // Timer Logic
        this.timer += delta;
        if (this.timer >= 300 * 1000) {
            this.gameScene.win();
        }
        let t = Phaser.Math.RoundTo(this.timer / 1000);
        this.timerText.text = "00" + ":" + "0" + Phaser.Math.FloorTo(t / 60) + ":" + (t < 10 ? "0" : "") + t % 60;
    }

    // Set text for upgrade like this: this.setUpgradeText("Center", "Body", "This was changed recently! OH GOD!\n\n+100 Pogs\n+1 Pogchamps")
    setUpgradeText(textFieldLocation, textFieldType, text) {
        this.upgradeUI["upgrade" + textFieldType + textFieldLocation].text = text;
    }

    hideUpgradeUI() {
        this.scene.run("battleScene");
        for (let UIObject in this.upgradeUI) {
            this.upgradeUI[UIObject].setVisible(false);
            this.upgradeUI[UIObject].setActive(false);
        }
    }

    showUpgradeUI() {
        this.scene.pause("battleScene");
        for (let UIObject in this.upgradeUI) {
            this.upgradeUI[UIObject].setVisible(true);
            this.upgradeUI[UIObject].setActive(false);
        }
    }
}
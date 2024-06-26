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
        // Menu Button Text
        this.menuText = this.add.text(game.config.width / 2, 20, 'MENU', { fill: '#6AC965', fontSize: '36px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.menuText.setOrigin(0.50, 0.50);
        this.menuText.setInteractive();
        this.menuText.on('pointerover', () => { this.menuText.setFill('#85E740'); });
        this.menuText.on('pointerout', () => { this.menuText.setFill('#6AC965'); });
        this.menuText.on('pointerdown', () => { this.menuScene(); });

        // Upgrade UI, Changing Text Names May Break this.setUpgradeText()
        this.upgradeUI = {
            "upgradePanelLeft": this.add.sprite(game.config.width / 4, game.config.height / 2, "upgradePanel").setScale(6),
            "upgradeTitleRibbonLeft": this.add.sprite(game.config.width / 4, game.config.height * 25 / 36, "upgradeTitleRibbon").setScale(6),
            "upgradeTitleLeft": this.add.text(game.config.width / 4, game.config.height * 25 / 36, "L UPGRADE",
                { fontSize: '24px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#000" }).setOrigin(0.5, 0.5),
            "upgradeBodyLeft": this.add.text(game.config.width / 4 - 100, game.config.height * 25 / 36 - 325, "L UPGRADE TEXT I SAY WHAT THE UPGRADE DOES\n\n+100 Cats\n-100% Dogs",
                { fontSize: '24px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#000", wordWrap: { width: 200 } }),
            "upgradeAnimationLeft": this.add.sprite(game.config.width / 4, game.config.height * 25 / 36 - 175, "level_up"),
            "upgradeAnimationLeft2": this.add.sprite(game.config.width / 4, game.config.height * 25 / 36, "level_up_2"),


            "upgradePanelCenter": this.add.sprite(game.config.width * 2 / 4, game.config.height / 2, "upgradePanel").setScale(6),
            "upgradeTitleRibbonCenter": this.add.sprite(game.config.width * 2 / 4, game.config.height * 25 / 36, "upgradeTitleRibbon").setScale(6),
            "upgradeTitleCenter": this.add.text(game.config.width * 2 / 4, game.config.height * 25 / 36, "C UPGRADE", { fontSize: '24px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#000" }).setOrigin(0.5, 0.5),
            "upgradeBodyCenter": this.add.text(game.config.width * 2 / 4 - 100, game.config.height * 25 / 36 - 325, "C UPGRADE TEXT I SAY WHAT THE UPGRADE DOES\n\n+100 Cats\n-100% Dogs",
                { fontSize: '24px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#000", wordWrap: { width: 200 } }),
            "upgradeAnimationCenter": this.add.sprite(game.config.width * 2 / 4, game.config.height * 25 / 36 - 175, "level_up"),
            "upgradeAnimationCenter2": this.add.sprite(game.config.width * 2 / 4, game.config.height * 25 / 36, "level_up_2"),

            "upgradePanelRight": this.add.sprite(game.config.width * 3 / 4, game.config.height / 2, "upgradePanel").setScale(6),
            "upgradeTitleRibbonRight": this.add.sprite(game.config.width * 3 / 4, game.config.height * 25 / 36, "upgradeTitleRibbon").setScale(6),
            "upgradeTitleRight": this.add.text(game.config.width * 3 / 4, game.config.height * 25 / 36, "R UPGRADE", { fontSize: '24px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#000" }).setOrigin(0.5, 0.5),
            "upgradeBodyRight": this.add.text(game.config.width * 3 / 4 - 100, game.config.height * 25 / 36 - 325, "R UPGRADE TEXT I SAY WHAT THE UPGRADE DOES\n\n+100 Cats\n-100% Dogs",
                { fontSize: '24px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: "#000", wordWrap: { width: 200 } }),
            "upgradeAnimationRight": this.add.sprite(game.config.width * 3 / 4, game.config.height * 25 / 36 - 175, "level_up"),
            "upgradeAnimationRight2": this.add.sprite(game.config.width * 3 / 4, game.config.height * 25 / 36, "level_up_2"),
        }

        this.upgradeUI["upgradePanelLeft"].setInteractive();
        this.upgradeUI["upgradePanelCenter"].setInteractive();
        this.upgradeUI["upgradePanelRight"].setInteractive();
        this.upgradeUI["upgradePanelLeft"].on("pointerdown", () => { this.gameScene.upgradeManager.chooseUpgrade("Left"); });
        this.upgradeUI["upgradePanelCenter"].on("pointerdown", () => { this.gameScene.upgradeManager.chooseUpgrade("Center"); }, this);
        this.upgradeUI["upgradePanelRight"].on("pointerdown", () => { this.gameScene.upgradeManager.chooseUpgrade("Right"); }, this);

        this.upgradeUI["upgradeAnimationLeft"].setScale(8);
        this.upgradeUI["upgradeAnimationCenter"].setScale(8);
        this.upgradeUI["upgradeAnimationRight"].setScale(8);
        this.upgradeUI["upgradeAnimationLeft2"].setScale(4);
        this.upgradeUI["upgradeAnimationCenter2"].setScale(4);
        this.upgradeUI["upgradeAnimationRight2"].setScale(4);

        // TEST CODE:
        this.gameScene.player.exp = 4;
        //

        for (let UIObject in this.upgradeUI) {
            this.upgradeUI[UIObject].setVisible(false);
            this.upgradeUI[UIObject].setActive(false);
        }
        // this.setUpgradeText("Center", "Body", "This was changed recently! OH GOD!\n\n+100 Pogs\n+1 Pogchamps")
        // this.showUpgradeUI();
    }

    menuScene() {
        this.scene.stop("battleScene");
        this.scene.start("menuScene");
    }

    update(_time, delta) {
        this.playerHealthText.text = "HP: " + this.gameScene.player.health;
        this.expText.text = "XP: " + this.gameScene.player.exp + "/" + this.gameScene.player.levelUpRequirements[this.gameScene.player.level];
        this.levelText.text = "LVL: " + this.gameScene.player.level;

        // Timer Logic
        let t = Phaser.Math.RoundTo(this.gameScene.timer / 1000);
        let gt = (300 - t);
        this.timerText.text = "00" + ":" + "0" + Phaser.Math.FloorTo(gt / 60) + ":" + ((gt % 60) < 10 ? "0" : "") + gt % 60;
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
            this.upgradeUI[UIObject].setActive(true);
        }
        this.upgradeUI["upgradeAnimationLeft"].play("level_up");
        this.upgradeUI["upgradeAnimationCenter"].play("level_up");
        this.upgradeUI["upgradeAnimationRight"].play("level_up");
        this.upgradeUI["upgradeAnimationLeft2"].play("level_up_2");
        this.upgradeUI["upgradeAnimationCenter2"].play("level_up_2");
        this.upgradeUI["upgradeAnimationRight2"].play("level_up_2");

        // Play level up sound
        this.levelUpSFX = this.sound.add('levelUp');
        this.levelUpSFX.setVolume(0.1);
        this.levelUpSFX.play();
    }
}
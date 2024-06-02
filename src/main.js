// Ivy Dudzik & Gabe Ahrens
// Created 6/1/2024
// Phaser: 3.70.0

// Strict Debugging
"use strict"

// Game Config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    width: 1440,
    height: 900,
    fps: { forceSetTimeOut: true, target: 144 },
    scene: [Load, Menu, Battle, Win, Lose]
}

// BORROWED FROM EXAMPLE CODE
// We may want to use a different system for sprites/text/vfx? I don't know why those things need to be global.
var cursors;
const SCALE = 2.0;
var my = { sprite: {}, text: {}, vfx: {} };

const game = new Phaser.Game(config);
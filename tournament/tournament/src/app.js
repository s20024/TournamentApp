import Tournament from "./tournament.js"

const tournament = new Tournament(document)

const config = {
  type: Phaser.AUTO,
    parent: 'tournament',
    width: 700,
    height: 500,
    pixelArt: true,
    physics: {
        default: 'arcade',
    },
    scene: [
      tournament,
    ]
}

const game = new Phaser.Game(config)

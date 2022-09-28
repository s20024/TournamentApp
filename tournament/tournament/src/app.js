import Tournament from ./tournament.js

const tournament = new Tournament(document)

const config = {
  type: Phaser.AUTO,
    parent: 'tournament',
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
    },
    scene: [
      tournament,
    ]
}

const game = new Phaser.Game(config)

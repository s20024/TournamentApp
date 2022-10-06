import Tournament from "./tournament.js"
import Loading from "./loading.js"

const tournament = new Tournament(document)
const loading = new Loading(document)
document.loading = loading
document.tournament = tournament

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
    loading,
    tournament,
  ]
}

console.log("starting phaser")
const game = new Phaser.Game(config)

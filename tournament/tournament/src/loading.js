class Loading extends Phaser.Scene {
  constructor(document) {
    super({ key: "loading" })
  }

  init(data) {
  }

  preload() {
    console.log("preload")
    this.camera = this.cameras.main
    this.camera.setBackgroundColor("ffffff")
    this.load.spritesheet("loading", "../../images/loading.png", {frameWidth: 128, frameHeight: 6})
    this.load.image("loading_string", "../../images/loading_string.png")
  }

  start() {
    this.scene.start('tournament', {})
  }

  create() {
    const icon = this.add.image(350, 250, "loading_string").setInteractive()
    this.anims.create({
      key: "loading",
      frames: this.anims.generateFrameNumbers("loading", {start: 0, end: 27}),
      frameRate: 20,
      repeat: -1
    })

    const loading = this.add.sprite(350, 300, "loading")
    loading.anims.play("loading")
  }


  update() {
    const test = this.add.image(350, 250, "test").setInteractive()
  }
}

export default Loading

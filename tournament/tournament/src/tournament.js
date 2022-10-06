class Tournament extends Phaser.Scene {
  constructor(document) {
    super({ key: "tournament" })
    console.log("constructor")
  }

  init(data) {
    console.log("init")
  }

  preload() {
    console.log("preload")
    this.camera = this.cameras.main
    this.camera.setBackgroundColor("ffffff")
    this.data = document.data
    this.loadGroupImages(this.data.group)

  }

  create() {
    console.log("create")
    this.add.image(100, 100, "test").setDisplaySize(200, 200)
    this.createGroupImages(this.data.group)
  }

  loadGroupImages(groups) {
    groups.forEach(group => {
      this.textures.addImage(`icon_${group.id}`, document.getElementById(`image_${group.id}`))
    })
  }

  createGroupImages(groups) {
    groups.forEach((group, index) => {
      const y = parseInt(index / 7)
      const x = index - (y * 7)
      const icon = this.add.image((x + 1) * 100, (y + 2) * 100, `icon_${group.id}`)
      icon.on('pointerdown', (pointer) => {
        console.log(group.name)
      }, this)
    })
  }

  update() {
  }
}

export default Tournament

/*
preload: function () {
    game.load.baseURL = 'http://somthing.com/';
    game.load.crossOrigin = 'anonymous';
},
create: function () {
    var data = new Image();
    data.src = sessionStorage.getItem("game_icon0");
    game.load.image('newIcon','game_icon0',data);
    game.add.sprite(0, 0, 'newIcon');
},

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

preload: function () {
    game.load.baseURL = 'http://somthing.com/';
    game.load.crossOrigin = 'anonymous';
    game.load.image('newIcon',sessionStorage.getItem("game_icon0"));
},

create: function () {
    game.add.sprite(0, 0, 'newIcon');
},
*/

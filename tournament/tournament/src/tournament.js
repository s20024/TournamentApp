class Tournament extends Phaser.Scene {
  constructor(document) {
    super({ key: "tournament" })
    console.log("constructor")
  }

  init(data) {
    console.log("init")
    this.group_list = [
      {name: "yara", image: "1mLGb7-yARtBok9O9-cUOofvGBb-Dysvo"},
      {name: "unnko", image: "1dIj1LeSYUAX_G-UIbjO7RiToduZQIVoH"},
      {name: "kome", image: "1CVLfUgeAXJSraFcQ4tJQN0xXgpxrf9Yx"},
      {name: "hello", image: "19TUXDvQso_WQLrbdaIGWXQreALcPqtl1"},
      {name: "world", image: "1ApoW3p-hr5fXLmF_-oCa9huwvfzOXPHE"}
    ]
  }

  preload() {
    console.log("preload")
    this.camera = this.cameras.main
    this.camera.setBackgroundColor("ffffff")
    this.load.image('test', document.getElementById("header_icon").src)
    // this.iconLoad(this.group_list)
  }

  create() {
    console.log("create")
    this.add.image(100, 100, "test").setDisplaySize(200, 200)
    // this.testCreate(this.group_list)
  }

  iconLoad(group_list) {
    console.log("iconLoad")
    group_list.forEach(group => {
      this.load.image(`${group.name}_icon`, `https://drive.google.com/uc?export=view&id=${group.image}`)
    })
  }

  testCreate(group_list) {
    console.log("testCreate")
    group_list.forEach((group, index) => {
      const y = parseInt(index / 7)
      const x = index - (y * 7)
      const icon = this.add.image((x + 1) * 100, (y + 2) * 100, `${group.name}_icon`)
      icon.on('pointerdown', (pointer) => {
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

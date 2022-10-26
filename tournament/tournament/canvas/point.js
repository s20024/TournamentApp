console.log("load canvas/point.js")

class Point {
  constructor() {
  }

  start() {
    const tourtal_group_count = document.group_count
    this.tourtal_group_count = tourtal_group_count
    this.data = document.data
    const group = document.group
    this.group = group

    const canvas = document.getElementById("tournament")
    this.canvas = canvas
    const ctx = canvas.getContext("2d")
    this.ctx = ctx

    const content = document.content
    this.content = content
    
    const canvasWidth = window.innerWidth * 0.45
    const canvasHeight = window.innerHeight * 0.4
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight

    this.cameraOffset = {
      x: 50,
      y: -100
      // x: canvasWidth / 2,
      // y: canvasHeight / 2
    }

    let cameraZoom = 0.5
    if (window.innerWidth <= 960) {
      cameraZoom = 0.3
    }
    this.cameraZoom = cameraZoom
    this.MAX_ZOOM = 5
    this.MIN_ZOOM = 0.1
    this.SCROLL_SENSITIVITY = 0.0005

    this.isDragging = false
    this.dragStart = {x: 0, y: 0}
    this.initialPinchdistance = null
    this.lastZoom = cameraZoom

    const colors = this.shuffle([
      "#23ff17", "#6e1bff", "#ffb530",
      "#ff1f91", "#ff24b6", "#4422ff",
      "#f215ff", "#aa1bff", "#761aff"
    ])

    const trophy_image = new Image()
    trophy_image.src = "../../images/trophy_gold.png"
    this.trophy_image = trophy_image

    let maxPoint = 0
    content.forEach(content_data => {
      if (maxPoint < content_data[1]) {
        maxPoint = content_data[1]
      }
    })

    this.maxPoint = maxPoint

    this.lineList = 
      [1, 2, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000, 3000]
      .filter(count => (maxPoint / 20 <= count && count <= maxPoint * 1.5))


    this.canvas_groups = group.map((group_data, index) => {
      const color = colors[index % colors.length]
      return new PointCell(350, 100, tourtal_group_count, index, group_data.name, group_data.id, ctx, maxPoint, color)
    })

    document.canvas_groups = this.canvas_groups

    canvas.addEventListener("mousedown",this.onPointerDown.bind(this))
    canvas.addEventListener("touchstart",(e) => this.handleTouch(e, this.onPointerDown.bind(this)))
    canvas.addEventListener("mouseup", this.onPointerUp.bind(this))
    canvas.addEventListener("touchend", (e) => this.handleTouch(e, this.onPointerUp.bind(this)))
    canvas.addEventListener("mousemove", this.onPointerMove.bind(this))
    canvas.addEventListener("touchmove", (e) => this.handleTouch(e, this.onPointerMove.bind(this)))
    canvas.addEventListener("wheel", (e) => this.adjustZoom(e.deltaY * this.SCROLL_SENSITIVITY))
    canvas.addEventListener("wheel", (e) => {e.preventDefault()})
    addEventListener("resize", this.resize.bind(this))

    this.resize()
    this.draw()
    this.groupsSetPoint(content)
  }

  groupsSetPoint(content) {
    this.canvas_groups.forEach(group => {
      for (let j = 0; j < content.length; j++) {
        const con = content[j]
        if (con[0] === group.getGroupId() && con[1] !== "") {
          group.setPoint(con[1])
          break
        }
      }
    })
  }

  resize() {
    console.log("resize")
    let canvasWidth = window.innerWidth * 0.45
    let canvasHeight = window.innerHeight * 0.4
    if (window.innerWidth <= 960) {
      canvasWidth = window.innerWidth * 0.65
      canvasHeight = window.innerHeight * 0.3
    }

    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
  }

  draw() {
    const group = this.group
    const canvas = this.canvas
    const ctx = this.ctx
    const canvasWidth = this.canvasWidth
    const canvasHeight = this.canvasHeight
    const cameraZoom = this.cameraZoom
    const cameraOffset = this.cameraOffset
    const group_count = group.length
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    ctx.translate(canvasWidth / 2, canvasHeight / 2)
    ctx.scale(cameraZoom, cameraZoom)
    ctx.translate(-canvasWidth / 2 + cameraOffset.x, -canvasHeight / 2 + cameraOffset.y)
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // ここから表示の関数
    this.drawLine(this.lineList, this.maxPoint)
    this.canvas_groups.forEach(cell => {
      if ( cell !== "") {
        cell.create()
      }
    })
    // ctx.drawImage(this.trophy_image, -50, -50, 100, 100)
    // ここから表示の関数
    requestAnimationFrame( this.draw.bind(this))
  }

  drawLine(lineList, maxPoint) {
    const ctx = this.ctx
    ctx.fillStyle = "#888888"
    lineList.forEach(line => {
      const x =  line / maxPoint * 500
      this.drawRect(x - 1, 0, 3, 110 * this.group.length)
      this.drawText(line.toString(), x - 10, -10, 25, '"ikamodoki", "paint", "rock"')
    })
    ctx.fillStyle = "#ff0000"
    this.drawRect(500 - 1, 0, 3, 110 * this.group.length)
    this.drawText("max", 500 - 10, -10, 25, '"ikamodoki", "paint", "rock"')
    ctx.fillStyle = "#000000"
  }

  getEventLocation(e) {
    if (e.touches && e.touches.length == 1) {
      return {x: e.touches[0].clientX, y: e.touches[0].clientY}
    } else if (e.clientX && e.clientY) {
      return {x: e.clientX, y: e.clientY}
    }
  }

  drawRect(x, y, width, height) {
    this.ctx.fillRect(x, y, width, height)
  }
  drawText(text, x, y, size, font) {
    const ctx = this.ctx
    ctx.font = `${size}px ${font}`
    ctx.fillText(text, x, y)
  }

  onPointerDown(e) {
    const cameraZoom = this.cameraZoom
    const cameraOffset = this.cameraOffset
    this.isDragging = true
    this.dragStart.x = this.getEventLocation(e).x / cameraZoom - cameraOffset.x
    this.dragStart.y = this.getEventLocation(e).y / cameraZoom - cameraOffset.y
  }

  onPointerUp(e) {
    const cameraZoom = this.cameraZoom
    this.isDragging = false
    this.initialPinchDistance = null
    this.lastZoom = cameraZoom
  }

  onPointerMove(e) {
    const isDragging = this.isDragging
    const cameraZoom = this.cameraZoom
    const dragStart = this.dragStart
    if (isDragging) {
      this.cameraOffset.x = this.getEventLocation(e).x / cameraZoom - dragStart.x
      this.cameraOffset.y = this.getEventLocation(e).y / cameraZoom - dragStart.y
    }
  }

  handleTouch(e, singleTouchHandler) {
    if (e.touches.length === 1) {
      singleTouchHandler(e)
    } else if (e.type === "touchmove" && e.touches.length === 2) {
      this.isDragging = false
      this.handlePinch(e)
    }
  }

  handlePinch(e) {
    e.preventDefault()
    const touch1 = {x: e.touches[0].clientX, y: e.touches[0].clientY}
    const touch2 = {x: e.touches[1].clientX, y: e.touches[1].clientY}

    const currentDistance = (touch1.x - touch2.x) ** 2 + (touch1.y - touch2.y) ** 2

    const initialPinchDistance = this.initialPinchDistance
    if (initialPinchDistance === null) {
      this.initialPinchDistance = currentDistance
    } else {
      this.adjustZoom(null, currentDistance / initialPinchDistance)
    }
  }

  adjustZoom(zoomAmount, zoomFactor) {
    const isDragging = this.isDragging
    if (!isDragging) {
      if (zoomAmount) {
        this.cameraZoom += zoomAmount
      } else if (zoomFactor) {
        const lastZoom = this.lastZoom
        this.cameraZoom = zoomFactor * lastZoom
      }

      const MAX_ZOOM = this.MAX_ZOOM
      const MIN_ZOOM = this.MIN_ZOOM
      const cameraZoom = this.cameraZoom
      this.cameraZoom = Math.min(cameraZoom, MAX_ZOOM)
      this.cameraZoom = Math.max(cameraZoom, MIN_ZOOM)
    }
  }

  shuffle ([...array]) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

}

// document.can = new Point() // tourtal_group_count, data, grou

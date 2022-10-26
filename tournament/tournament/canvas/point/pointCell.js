class PointCell {
  constructor(height, size, tourtal_group_count, group_number, group_name, group_id, ctx, maxPoint, color) {
    this.height = height
    this.size = size
    this.tourtal_group_count = tourtal_group_count
    this.group_number = group_number
    this.group_id = group_id
    this.group_tagid = `image_${group_id}`
    this.group_name = group_name
    this.ctx = ctx
    this.image = document.getElementById(this.group_tagid)
    this.point = 0
    this.maxPoint = maxPoint
    this.color = color
  }

  create() {
    const ctx = this.ctx
    const group_number = this.group_number
    const size = this.size

    const x = this.calcX()
    const y = this.calcY(this.group_count, this.group_number)
    const fontX = this.calcFontX(this.group_name)
    const rectWidth = this.calcRectWidth(this.maxPoint, this.point)

    ctx.drawImage(this.image, x, y, size, size)

    ctx.fillStyle = "black"
    ctx.textAlign = "right"
    this.drawText(this.group_name, -100, y + 100, 100, "ikamodoki")
    ctx.textAlign = "left"

    ctx.fillStyle = this.color
    this.drawRect(0, y + 20, rectWidth, 60)

    ctx.fillStyle = "white"
    this.drawText((this.point !== 0) ? this.point.toString() : "", 5, y + 80, 60, "ikamodoki")
  }

  calcX() {
    return -100
  }
  
  calcY(group_count, group_number) {
    return 110 * group_number
  }

  calcFontX(group_name) {
    return -70 * (group_name.length + 1)
  }

  calcRectWidth(maxPoint, point) {
    return point / maxPoint * 500
  }

  drawRect(x, y, width, height) {
    this.ctx.fillRect(x, y, width, height)
  }
  drawText(text, x, y, size, font) {
    const ctx = this.ctx
    ctx.font = `${size}px ${font}`
    ctx.fillText(text, x, y)
  }

  setPoint(point) {
    this.point = point
  }

  getPoint() {
    return this.point
  }

  getGroupId() {
    return this.group_id
  }
}


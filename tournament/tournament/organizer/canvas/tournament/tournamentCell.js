class TournamentCell {
  constructor(height, size, tourtal_group_count, group_number, group_name, group_id, ctx, howEx, winCount) {
    this.height = height
    this.size = size
    this.tourtal_group_count = tourtal_group_count
    this.group_number = group_number
    this.group_id = group_id
    this.group_tagid = `image_${group_id}`
    this.group_name = group_name
    this.ctx = ctx
    this.image = document.getElementById(this.group_tagid)
    this.howEx = howEx
    this.winCount = winCount
  }

  create() {
    const ctx = this.ctx
    const group_number = this.group_number
    const size = this.size
    const half = size / 2

    const x = this.calcX(this.howEx, group_number, this.winCount)
    const y = this.calcY(this.howEx, this.winCount)

    this.drawWinLines(this.winCount)
    ctx.drawImage(this.image, x - half, y - half, size, size)
  }

  calcX(howEx, group_number, winCount) {
    const by = group_number.toString(2).padStart(howEx, "0")
    let c = 0
    for (let i = 0; i < (howEx - winCount); i++) {
      if (by[i] === "1") {
        c = c + 2 ** (howEx - (i + 1))
      } else {
        c = c - 2 ** (howEx - (i + 1))
      }
    }
    return c * 80
  }

  calcY(howEx, winCount) {
    return (howEx + 1 - winCount) * 125
  }

  drawWinLines(count) {
    if (count !== 0) {
      const ctx = this.ctx
      const x = this.calcX(this.howEx, this.group_number, count - 1)
      const width = this.calcX(this.howEx, this.group_number, count) - x
      const y = this.calcY(this.howEx, count)
      ctx.fillStyle = "#990000"
      ctx.fillRect(x - 3, y, 6, 125)
      ctx.fillRect(x - 3, y, width + 6, 6)
      ctx.fillStyle = "#000000"
      if (count - 1 !== 0) {
        this.drawWinLines(count - 1)
      }
    }
  }

  setWinCount(winCount) {
    this.winCount = winCount
  }
  getWincount(winCount) {
    return this.winCount
  }
  setUpWinCount() {
    this.winCount = this.winCount + 1
  }

  getGroupId() {
    return this.group_id
  }
}


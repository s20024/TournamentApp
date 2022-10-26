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
    this.now = howEx
    this.winCount = winCount
  }

  create() {
    const ctx = this.ctx
    const group_number = this.group_number
    const size = this.size
    const half = size / 2

    const x = this.calcX(this.howEx, this.now, group_number)
    const y = this.calcY(this.howEx)

    ctx.drawImage(this.image, x - half, y - half, size, size)
  }

  calcX(howEx, now, group_number) {
    const by = group_number.toString(2).padStart(howEx, "0")
    let c = 0
    for (let i = 0; i < (howEx - this.winCount); i++) {
      if (by[i] === "1") {
        c = c + 2 ** (howEx - (i + 1))
      } else {
        c = c - 2 ** (howEx - (i + 1))
      }
    }
    return c * 80
  }

  calcY(howEx) {
    return (howEx + 1 - this.winCount) * 125
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


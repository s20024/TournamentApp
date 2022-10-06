class TournamentCell {
  constructor(height, size, tourtal_group_count, group_number, group_name, group_id, ctx) {
    this.height = height
    this.size = size
    this.tourtal_group_count = tourtal_group_count
    this.group_number = group_number
    this.group_id = group_id
    this.group_tagid = `image_${group_id}`
    this.group_name = group_name
    this.ctx = ctx
    this.image = document.getElementById(this.group_tagid)
  }

  create() {
    const ctx = this.ctx
    ctx.drawImage(this.image, 60 + 160 * this.group_number, this.height, this.size, this.size)
  }
}

export default TournamentCell

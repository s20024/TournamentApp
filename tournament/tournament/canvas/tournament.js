console.log("load canvas/tournament.js")
import TournamentCell from "./tournament/tournamentCell.js"

class Can {
  constructor() {
    this.tourtal_group_count = document.group_count
    this.data = document.data
    this.group = document.group
    const canvas = document.getElementById("tournament")
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
  }

  start() {
    this.tourtal_group_count = document.group_count
    this.data = document.data
    this.group = document.group
    const canvas = this.canvas
    const ctx = this.ctx
    const group = this.group
  
    const group_count = document.getElementById("group_cover_contents").children.length

    group.forEach((group_data, index) => {
      if (index % 2 === 0) {
        ctx.fillRect(60 + (160 * index) + (100 / 2) - 3, 350 - 100, 83, 6)
        if (Math.floor(index / 2) % 2 === 0) {
          ctx.fillRect(60 + (160 * index) + (100 / 2) - 3 + 80, 350 - 100 - 100, 6, 100)
          ctx.fillRect(60 + (160 * index) + (100 / 2) - 3 + 80, 350 - 100 - 100, 160, 6)
        } else {
          ctx.fillRect(60 + (160 * index) + (100 / 2) - 3 + 80, 350 - 100 - 100, 6, 100)
          ctx.fillRect(60 + (160 * index) + (100 / 2) - 3 - 80, 350 - 100 - 100, 160, 6)
        }
      } else {
        ctx.fillRect(60 + (160 * index) + (100 / 2) - 80, 350 - 100, 83, 6)
      }
      ctx.fillRect(60 + (160 * index) + (100 / 2) - 3, 350 - 100, 6,(100 / 2) + 100 )
      const testCell = new TournamentCell(350, 100, this.tourtal_gourp_count, index, group_data.name, group_data.id, ctx)
      testCell.create()
    })
  }
}

document.can = new Can() // tourtal_group_count, data, grou

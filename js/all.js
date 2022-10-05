const from_id = "fade_out_div"
const to_id = "contents_unnko"

let fade_contents = true
let load_contents = false

console.log("load all.js")

fetch(`${this.gasurl}?course=all`)
  .then(res => res.json())
  .then(res => {
    const fade_out_div = document.getElementById("fade_out_div")
    const result = res.data.map(tournament_data => {
      const id = tournament_data[0]
      const name = tournament_data[1]
      const date = new Date(tournament_data[3]).toISOString().split("T")[0].replaceAll("-", "/")
      const img = `https://drive.google.com/uc?export=view&id=${tournament_data[2]}`
      return ` \
        <div class="tournament_div fade_in">
            <div class="tournament_icon_div">
              <img class="tournament_icon" src="${img}">
            </div>
            <div class="tournament_contents_div">
              <div class="tournament_contents_title">
                ${name}
              </div>
              <div class="tournament_contents_date">
                ${date}
              </div>
            </div>
        </div>
      `
    }).join("")
    console.log(result)
    fade_out_div.innerHTML = result
  })


const allHeight = Math.max(
  document.body.scrollHeight - 1, document.documentElement.scrollHeight - 1,
  document.body.offsetHeight - 1, document.documentElement.offsetHeight - 1,
  document.body.clientHeight - 1, document.documentElement.clientHeight - 1
)
const mostBottom = allHeight - window.innerHeight
window.addEventListener('scroll', ()=> {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  if (scrollTop >= mostBottom && fade_contents) {
    console.log("scroll down")
    fade_contents = false
    createContents(from_id, to_id)
  }
})

async function createContents(from_id, to_id) {
  const contents = document.getElementById(to_id)
  const fade_out_div = document.getElementById(from_id)
  const children = fade_out_div.children
  const len = children.length
  for (let i = 0; i < len; i++) {
    const child = children[0]
    await new Promise(s => setTimeout(s, 500))
    contents.appendChild(child)
  }
}

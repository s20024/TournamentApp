const from_id = "fade_out_div"
const to_id = "contents_unnko"

let scrolled = false
let load_contents = false

console.log("load participation.js")

fetch(`${this.gasurl}?course=participation`)
  .then(res => res.json())
  .then(res => {
    const fade_out_div = document.getElementById("fade_out_div")
    const result = res.data.map(tournament_data => {
      const id = tournament_data[0]
      const name = tournament_data[1]
      const name_url = encodeURL(name)
      const name_html = (name.length <= 25) ? encodeHTML(name) : encodeHTML(name.slice(0, 22) + "...")
      const date = new Date(tournament_data[3]).toISOString().split("T")[0].replaceAll("-", "/")
      const img = `https://drive.google.com/uc?export=view&id=${tournament_data[2]}`
      return ` \
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSeNhcjBKCI2EGSsYrpatpGCsnBbQjPTimUTB9iL7D3rqfyz8A/viewform?usp=pp_url&entry.2020560760=${id}&entry.80481633=${name_url}" target="_blank">
          <div class="tournament_div fade_in">
              <div class="tournament_icon_div">
                <img class="tournament_icon" src="${img}">
              </div>
              <div class="tournament_contents_div">
                <div class="tournament_contents_title">
                  ${name_html}
                </div>
                <div class="tournament_contents_date">
                  ${date}
                </div>
              </div>
          </div>
        </a>
      `
    }).join("")
    console.log(result)
    fade_out_div.innerHTML = result
    load_contents = true
    if (scrolled && load_contents) {
      createContents(from_id, to_id)
    }
  })


const allHeight = Math.max(
  document.body.scrollHeight - 1, document.documentElement.scrollHeight - 1,
  document.body.offsetHeight - 1, document.documentElement.offsetHeight - 1,
  document.body.clientHeight - 1, document.documentElement.clientHeight - 1
)
const mostBottom = allHeight - window.innerHeight
window.addEventListener('scroll', ()=> {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  if (scrollTop + 10 >= mostBottom) {
    console.log("scroll down")
    scrolled = true
  }
  if (scrolled && load_contents) {
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

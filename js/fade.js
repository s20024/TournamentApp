console.log("load fade.js")

let fade_contents = true

const allHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
)
const mostBottom = allHeight - window.innerHeight
window.addEventListener('scroll', ()=> {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (scrollTop >= mostBottom && fade_contents) {
      console.log("scroll down")
      fade_contents = false
      createContents("fade_out_div", "contents_contents")
    }
})

async function createContents(from, to) {
  const contents = document.getElementById(to)
  const fade_out_div = document.getElementById(from)
  const children = fade_out_div.children
  const len = children.length
  for (let i = 0; i < len; i++) {
    const child = children[0]
    await new Promise(s => setTimeout(s, 500))
    contents.appendChild(child)
  }
}

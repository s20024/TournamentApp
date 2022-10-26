console.log("load fade.js")

let fade_contents = true

const allHeight = Math.max(
  document.body.scrollHeight - 1, document.documentElement.scrollHeight - 1,
  document.body.offsetHeight - 1, document.documentElement.offsetHeight - 1,
  document.body.clientHeight - 1, document.documentElement.clientHeight - 1
)
const mostBottom = allHeight - window.innerHeight
window.addEventListener('scroll', ()=> {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  if (scrollTop + 10 >= mostBottom && fade_contents) {
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

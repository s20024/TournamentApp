console.log("load fade.js")

const allHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
)
const mostBottom = allHeight - window.innerHeight
window.addEventListener('scroll', ()=> {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (scrollTop >= mostBottom) {
      console.log("scroll down")
    }
})

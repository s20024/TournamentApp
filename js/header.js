console.log("load header.js")

const ham = document.getElementById("btn_hamburger")
ham.addEventListener('click', () => {
  const nav = document.getElementById("nav")
  ham.classList.toggle("active")
  nav.classList.toggle("active")
})

function encodeHTML(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function encodeURL(str) {
  return encodeURI(str)
}

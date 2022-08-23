console.log("load header.js")

const ham = document.getElementById("btn_hamburger")
ham.addEventListener('click', () => {
  const nav = document.getElementById("nav")
  ham.classList.toggle("active")
  nav.classList.toggle("active")
})

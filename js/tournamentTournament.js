console.log("load tournamentTournament.js")

const from_id = ""
const to_id = ""

const urlParams = new URLSearchParams(window.location.search)
if (urlParams.has("id")) {
  fetch(`${this.gasurl}?course=tournamentTournament&id=${urlParams.get("id")}`)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      if (res.result) {
        const date = new Date(res.data.day).toISOString().split("T")[0].replaceAll("-", "/")

        document.getElementById("tournament_image").src = `https://drive.google.com/uc?export=view&id=${res.data.image}`
        document.getElementById("tournament_title").innerHTML = res.data.tournament_name
        document.getElementById("contents_title_organizer").innerHTML = `主催者: ${res.data.name}`
        document.getElementById("contents_title_time").innerHTML = `日付: ${date}`
        document.getElementById("log_div").innerHTML = createLogHtml(res.data.log)
        document.getElementById("iframe").src = `https://www.youtube.com/embed/${res.data.youtube}`
      } else {
        alert(res.message)
      }
    })
} else {
  alert("URLが間違っています。")
}

function createLogHtml(logs) {
  return logs.map(log => {
    return `\
      <div class="log_cell">
        <div class="log_cell_title">
          <div class="log_name">
            from: ${log.name}
          </div>
          <div class="log_time">
            time: ${log.time}
          </div>
        </div>
        <div class="log_text">
          <p>
            ${log.message}
          </p>
        </div>
      </div>
    `
  }).join("")
}

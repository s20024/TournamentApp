console.log("load tournamentTournamentCanvas.js")

const from_id = ""
const to_id = ""
document.group_count = 0
document.group_counter = 0

const urlParams = new URLSearchParams(window.location.search)
if (urlParams.has("id")) {
  fetch(`${this.gasurl}?course=tournamentTournament&id=${urlParams.get("id")}`)
    .then(res => res.json())
    .then(res => {
      if (res.result) {
        const date = new Date(res.data.day).toISOString().split("T")[0].replaceAll("-", "/")

        document.getElementById("tournament_image").src = `https://drive.google.com/uc?export=view&id=${res.data.image}`
        document.getElementById("tournament_title").innerHTML = res.data.tournament_name
        document.getElementById("contents_title_organizer").innerHTML = `主催者: ${res.data.name}`
        document.getElementById("contents_title_time").innerHTML = `日付: ${date}`
        document.getElementById("log_div").innerHTML = createLogHtml(res.data.log)
        document.getElementById("iframe").src = `https://www.youtube.com/embed/${res.data.youtube}`
        document.getElementById("group_flag").outerHTML = createGroupHtml(res.data.group)
        document.data = res.data
        document.group_count = res.data.group.length
        document.group = res.data.group
        // document.loading.start()
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

function createGroupHtml(groups) {
  return groups.map(group => {
    return ` \
      <div class="group_cell">
        <div class="group_title">
          <div class="group_image">
            <img
              src="https://drive.google.com/uc?export=view&id=${group.image}"
              class="group_image"
              id="image_${group.id}"
              onload="loadImageCounter()"
            >
          </div>
          <div class="group_name">
            ${group.name}
          </div>
        </div>
        <div class="group_contents">
          ${createMenberHtml(group.menber)}
        </div>
      </div>
    `
  }).join("")
}

function createMenberHtml(menbers) {
  return menbers.map(menber => {
    return `\
      <div class="menber">
        ${menber}
      </div>
    `
  }).join("")
}

function loadImageCounter() {
  document.group_counter++
  console.log(`${document.group_count} : ${document.group_counter}`)
  if (document.group_count === document.group_counter) {
    document.can.start()
  }
}

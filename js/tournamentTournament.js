console.log("load tournamentTournament.js")

const from_id = ""
const to_id = ""

const urlParams = new URLSearchParams(window.location.search)
if (urlParams.has("id")) {
  fetch(`${this.gasurl}?course=tournamentTournament&id=${urlParams.get("id")}`)
    .then(res => res.json())
    .then(res => {
      if (res.result) {
        const date = new Date(res.data.day).toISOString().split("T")[0].replaceAll("-", "/")

        document.getElementById("tournament_image").src = `https://drive.google.com/uc?export=view&id=${res.data.image}`
        document.getElementById("tournament_title").innerHTML = encodeHTML(res.data.tournament_name)
        document.getElementById("contents_title_organizer").innerHTML = `主催者: ${encodeHTML(res.data.name)}`
        document.getElementById("contents_title_time").innerHTML = `日付: ${date}`
        document.getElementById("log_div").innerHTML = createLogHtml(res.data.log)
        document.getElementById("iframe").src = `https://www.youtube.com/embed/${res.data.youtube}`
        document.getElementById("group_flag").outerHTML = createGroupHtml(res.data.group)
        document.data = res.data
        // document.loading.start()
      } else {
        alert(res.message)
      }
    })
} else {
  alert("URLが間違っています。")
}

function createLogHtml(logs) {
  const log_name_html = encodeHTML(log.name)
  const log_message_html = encodeHTML(log.message)
  return logs.map(log => {
    return `\
      <div class="log_cell">
        <div class="log_cell_title">
          <div class="log_name">
            from: ${log_name_html}
          </div>
          <div class="log_time">
            time: ${new Date(log.time).toISOString().split("T")[0].replaceAll("-", "/")}
          </div>
        </div>
        <div class="log_text">
          <p>
            ${log_message_html}
          </p>
        </div>
      </div>
    `
  }).join("")
}

function createGroupHtml(groups) {
  const group_name_html = encodeHTML(group.name)
  return groups.map(group => {
    return ` \
      <div class="group_cell">
        <div class="group_title">
          <div class="group_image">
            <img src="https://drive.google.com/uc?export=view&id=${group.image}" class="group_image" id="image_${group.id}">
          </div>
          <div class="group_name">
            ${group_name_html}
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
    const menber_html = encodeHTML(menber)
    return `\
      <div class="menber">
        ${menber_html}
      </div>
    `
  }).join("")
}

console.log("load tournamentTournamentOrganizer.js")

const urlParams = new URLSearchParams(window.location.search)

const log_form = document.getElementById('log_input_form')
log_form.action = `${this.gasurl}?course=tournamentTournamentOrganizer&id=${urlParams.get("id")}&key=${urlParams.get("key")}&where=log`

const from_id = ""
const to_id = ""
document.group_count = 0
document.group_counter = 0

if (urlParams.has("id")) {
  fetch(`${this.gasurl}?course=tournamentTournament&id=${urlParams.get("id")}`) // 後でcourseにOrganizerを入れてほしい。 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    .then(res => res.json())
    .then(res => {
      if (res.result) {
        console.log(res)
        const date = new Date(res.data.day).toISOString().split("T")[0].replaceAll("-", "/")

        const group = res.data.group.filter(g => (g["id"] !== ""))
        document.getElementById("tournament_image").src = `https://drive.google.com/uc?export=view&id=${res.data.image}`
        document.getElementById("tournament_title").innerHTML = encodeHTML(res.data.tournament_name)
        document.getElementById("contents_title_organizer").innerHTML = `主催者: ${encodeHTML(res.data.name)}`
        document.getElementById("contents_title_time").innerHTML = `日付: ${date}`
        document.getElementById("log_div").innerHTML = createLogHtml(res.data.log)
        document.getElementById("iframe").src = `https://www.youtube.com/embed/${res.data.youtube}`
        document.getElementById("group_flag").outerHTML = createGroupHtml(group, res.data.group_people)
        document.data = res.data
        document.group_count = group.length
        document.group = group
        document.current_tournament = res.data.current_tournament
        document.finish_tournament = res.data.finish_tournament
        document.content = res.data.content
        // document.loading.start()
        if (res.data.tournament_type === "トーナメント制") {
          document.can = new Tournament()
        } else if (res.data.tournament_type === "ポイント制") {
          document.can = new Point()
        } else if (res.data.tournament_type === "総当たり制") {
        }

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
            time: ${new Date(log.time).toISOString().split("T")[0].replaceAll("-", "/")}
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

function createGroupHtml(groups, group_people) {
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
          ${createMenberHtml(group.menber, group_people)}
        </div>
      </div>
    `
  }).join("")
}

function createMenberHtml(menbers, group_people) {
  const men = menbers
  for (let i = 0; i < group_people; i++) {
    men.push("")
  }
  return menbers.slice(0, group_people).map(menber => {
    return `\
      <div class="menber">
        <div>
          ${menber}
        </div>
      </div>
    `
  }).join("")
}

function loadImageCounter() {
  document.group_counter++
  console.log(`${document.group_count} : ${document.group_counter} : ${document.current_tournament}`)
  if (document.group_count === document.group_counter && (document.current_tournament || document.finish_tournament)) {
    document.can.start()
  }
}

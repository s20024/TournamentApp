console.log("load tournamentTournamentOrganizer.js")

const urlParams = new URLSearchParams(window.location.search)

document.getElementById('log').addEventListener('click', () => {
  const log_input = document.getElementById('log_input')
  const log_div = document.getElementById("log_div")
  const input = log_input.value
  const url = `${this.gasurl}?course=tournamentTournamentOrganizer&id=${urlParams.get("id")}&key=${urlParams.get("key")}&where=log&log=${JSON.stringify(input)}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      log_input.value = ''
      log_div.innerHTML = log_div.innerHTML + createLogHtml([res.data[res.data.length - 1]])
      console.log(log_div.innerHTML)
    })
})

const from_id = ""
const to_id = ""
document.group_count = 0
document.group_counter = 0

document.getElementById("reload").addEventListener('click', () => {
  reload()
})

document.getElementById("change").addEventListener('click', () => {
  const url = `${this.gasurl}?course=tournamentTournamentOrganizer&id=${urlParams.get("id")}&key=${urlParams.get("key")}&where=data&data=${JSON.stringify(document.content)}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      alert('データを変更しました。')
    })
})

function reload() {
  fetch(`${this.gasurl}?course=tournamentData&id=${urlParams.get("id")}`)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      document.can.groupsSetWinCount(res.data)
    })
}

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
        const edit_div = document.getElementById('edit_tournament')
        if (res.data.tournament_type === "トーナメント制") {
          document.can = new Tournament()
          document.tournament_type = "tourenment"
          edit_div.innerHTML = this.createTournamentEditForm(res.data.content)
          setTournamentJudgeEvent()
        } else if (res.data.tournament_type === "ポイント制") {
          document.can = new Point()
          document.tournament_type = "point"
          edit_div.innerHTML = this.createPointEditForm(res.data.content)
          setPointChangeEvent()
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

function createTournamentEditForm(content) {
  const match_html = content.slice(0, content.length - 1).map((match, index) => {
    return `\
      <div class="match_div">
        <div class="match_div_title">
          ${index + 1}:
        </div>
        <div class="match_div_content">
          <div class="match_div_content_group">
            <img class="match_div_content_img" src="${getImage(match[0])}">
            <div class="match_div_content_name">
              ${getName(match[0])}
            </div>
          </div>
          <div id="match_judge_${index + 1}" class="match_judge">
            <div class="match_judge_left ${(match[2] === 0)? "win": "lose"}">
              ${(match[2] === 0)? "勝ち": "負け"}
            </div>
            <div class="match_judge_vs">
              vs
            </div>
            <div class="match_judge_right ${(match[2] === 1)? "win": "lose"}">
              ${(match[2] === 1)? "勝ち": "負け"}
            </div>
          </div>
          <div class="match_div_content_group">
            <img class="match_div_content_img" src="${getImage(match[1])}">
            <div class="match_div_content_name">
              ${getName(match[1])}
            </div>
          </div>
        </div>
      </div>
    `
  }).join("")
  return match_html
}

function setTournamentJudgeEvent() {
  for (let i = 0; i < document.data.content.length - 1; i++) {
    const match_judge = document.getElementById(`match_judge_${i + 1}`)
    const left = match_judge.children[0]
    const right = match_judge.children[2]
    let flg = true
    match_judge.addEventListener('click', () => {
      if (document.content[i][2] === 0 && document.content[i][0] !== "none" && document.content[i][1] !== "none") {
        document.content[i][2] = 1
        left.classList.remove('win')
        left.classList.add('lose')
        left.innerHTML = "負け"
        right.classList.add('win')
        right.classList.remove('lose')
        right.innerHTML = "勝ち"
        flg = false
      } else if (document.content[i][0] !== "none" && document.content[i][1] !== "none") {
        document.content[i][2] = 0
        left.classList.add('win')
        left.classList.remove('lose')
        left.innerHTML = "勝ち"
        right.classList.remove('win')
        right.classList.add('lose')
        right.innerHTML = "負け"
        flg = true
      }
      changeTournamentData(i, document.content, flg)
    })
  }
}

function changeTournamentData(index, content, flg) {
  const diff = content.length - index - 1
  const move_count = (diff % 2 === 1) ? (parseInt(diff / 2) + 1) : parseInt(diff / 2)
  const lr = ( index % 2 === 0)? 0: 1
  console.log(index + move_count)
  if (flg) {
    document.content[index + move_count][lr] = document.content[index][0]
  } else {
    document.content[index + move_count][lr] = document.content[index][1]
  }
  const edit_tournament = document.getElementById('edit_tournament')
  edit_tournament.innerHTML = this.createTournamentEditForm(document.content)
  setTournamentJudgeEvent()
  console.log(document.content)
  document.can.groupsSetWinCount(document.content)
}

function createPointEditForm(content) {
  const match_html = content.map((match, index) => {
    return `\
      <div class="match_div">
        <div class="match_div_title">
          ${index + 1}:
        </div>
        <div class="match_div_content">
          <img class="match_div_content_img" src="${getImage(match[0])}">
          <div class="match_div_content_name">
              ${getName(match[0])}
          </div>
        </div>
        <div class="match_judge">
          <div> : </div>
        </div>
        <div class="match_div_content">
          <div class="point_content">
            <input id="point_input_${index + 1}" class="point_input" type="number" value="${match[1]}">
          </div>
        </div>
      </div>
    `
  }).join("")
  return match_html
}

function setPointChangeEvent() {
  for (let i = 0; i < document.data.content.length; i++) {
    const point_input = document.getElementById(`point_input_${i + 1}`)
    console.log(point_input)
    point_input.addEventListener('change', () => {
      changePointData(i, point_input)
    })
  }
}

function changePointData(i, input) {
  document.content[i][1] = input.value
  document.can.groupsSetWinCount(document.content)
}

function getImage(id) {
  if (id) {
    const groups = document.data.group
    for (let group of groups) {
      if (group.id === id) {
        return `https://drive.google.com/uc?export=view&id=${group.image}`
      }
    }
    return "../../../images/no_image.jpeg"
  }
  return "../../../images/no_image.jpeg"
}

function getName(id) {
  const groups = document.data.group
  for (let group of groups) {
    if (group.id === id) {
      if (8 <= group.name.length) {
        return group.name.slice(0, 8) + "..."
      }
      return group.name
    }
  }
  return "no group"
}

function loadImageCounter() {
  document.group_counter++
  console.log(`${document.group_count} : ${document.group_counter} : ${document.current_tournament}`)
  if (document.group_count === document.group_counter && (document.current_tournament || document.finish_tournament)) {
    document.can.start()
  }
}

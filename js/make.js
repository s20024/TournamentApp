console.log("make.js")

const from_id = "fade_out"
const to_id = "form"

const if_point_html = ' \
<div class="make_contents_label" class="fade_in"> \
  <label>試合の数:</label> \
</div> \
<div class="make_contents_input"> \
  <input type="number" name="match_count"> \
</div> \
'

const battle_type_html = ' \
<div id="make_organizer" class="fade_in"> \
  <div id="make_organizer_title"> \
    <h1>試合詳細</h1> \
  </div> \
  <div id="make_organizer_contents"> \
    <div class="make_contents_cell"> \
      <div class="make_contents_label"> \
        <label>試合の種類:</label> \
      </div> \
      <div class="make_contents_input"> \
        <label>一発制</label> \
        <input type="radio" name="battle_type" value="one" onclick="selectOne()" /><br> \
        <label>先取制</label> \
        <input type="radio" name="battle_type" value="first" onclick="selectFirst()" /><br> \
        <label>多数制</label> \
        <input type="radio" name="battle_type" value="match" onclick="selectMatch()" /><br> \
      </div> \
    </div> \
    <div class="make_contents_cell" id="battle_count_div"> \
    </div> \
  </div> \
</div> \
'
const first_battle_count_html = ' \
<div class="make_contents_label" class="fade_in"> \
  <label>何本先取:</label> \
</div> \
<div class="make_contents_input"> \
  <input type="number" name="battle_count" /> \
</div> \
'
const match_battle_count_html = ' \
<div class="make_contents_label" class="fade_in"> \
  <label>試合数:</label> \
</div> \
<div class="make_contents_input"> \
  <input type="number" name="battle_count" /> \
</div> \
'

const if_point = document.getElementById("if_point")
const battle_type_div = document.getElementById("make_battle_contents")
const input_image = document.getElementById("input_image")

input_image.addEventListener("change", () => {
  const file = input_image.files[0]
  const fr = new FileReader()
  fr.fileName = file.name
  fr.onload = (e) => {
    const preview = document.getElementById("preview")
    preview.src = e.target.result
    const html = `<input type="hidden" name="data" value="${e.target.result.replace(/^.*,/, '')}">` +
      `<input type="hidden" name="mimetype" value="${e.target.result.match(/^.*(?=;)/)[0]}">` +
      `<input type="hidden" name="filename" value="${input_image.files[0].name}">`
    document.getElementById("data").innerHTML = html
  }
  fr.readAsDataURL(file)
})


function createMatchCount() {
  if_point.innerHTML = if_point_html
}

function deleteMatchCount() {
  if_point.innerHTML = ""
}

function createBattleTypeDiv() {
  battle_type_div.innerHTML = battle_type_html
}

function deleteBattleTypeDiv() {
  battle_type_div.innerHTML = ""
}

function selectOne() {
  const battle_count_div = document.getElementById("battle_count_div")
  battle_count_div.innerHTML = ""
}

function selectFirst() {
  const battle_count_div = document.getElementById("battle_count_div")
  battle_count_div.innerHTML = first_battle_count_html
}

function selectMatch() {
  const battle_count_div = document.getElementById("battle_count_div")
  battle_count_div.innerHTML = match_battle_count_html
}

const tournament_types = document.getElementsByName("tournament_type")

for (let i = 0; i < tournament_types.length; i++) {
  const child = tournament_types[i]
  child.addEventListener("click", () => {
    if (child.value === "point"){
      createMatchCount()
      deleteBattleTypeDiv()
    } else {
      deleteMatchCount()
      createBattleTypeDiv()
    }
  })
}

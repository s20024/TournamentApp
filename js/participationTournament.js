console.log("load participationTournament.js")

const from_id = "fade_out_div"
const to_id = "form_contents"

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

const urlParams = new URLSearchParams(window.location.search)
document.getElementById("form").action = `${this.gasurl}?course=participationTournament&id=${urlParams.get("id")}`
if (urlParams.has("id")) {
  fetch(`${this.gasurl}?course=participationTournament&id=${urlParams.get("id")}`)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      if (res.result) {
      const date = new Date(res.data.date).toISOString().split("T")[0].replaceAll("-", "/")
        document.getElementById("tournament_image").src = `https://drive.google.com/uc?export=view&id=${res.data.image}`
        document.getElementById("tournament_title").innerHTML = res.data.tournament_name
        document.getElementById("contents_title_organizer").innerHTML = `主催者: ${res.data.name}`
        document.getElementById("contents_title_time").innerHTML = `日付: ${date}`
        let menber_html = ''
        for (let i = 1; i < res.data.group_people; i++) {
          menber_html = menber_html + ` \
            <div class="form_contents_cell fade_in"> \
              <div class="form_contents_label"> \
                チームメイト${i} : \
              </div> \
              <div class="form_contents_input"> \
                <input type="text" id="input_team_mate${i}" class="input_text" name="menber_${i}"> \
              </div> \
            </div> \
          `
        }
        document.getElementById("menber_div").outerHTML = menber_html
      } else {
        alert(res.message)
      }
    })
} else {
  alert("URLが間違っています。")
}


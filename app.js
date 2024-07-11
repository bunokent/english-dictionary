const search_input = document.querySelector(".search-input");
const search_delete = document.querySelector(".search-delete");
const search = document.querySelector(".search");

const word = document.querySelector(".word");
const part_of_speech = document.querySelector(".part-of-speech");
const meaning = document.querySelector(".meaning");
const phonetic = document.querySelector(".phonetic");
const sound = document.querySelector(".sound");
const example = document.querySelector(".example");

search_input.addEventListener("keydown", function (e) {
  if (search_input.value.length === 0) search_delete.setAttribute("id", "hide");
  else search_delete.removeAttribute("id");
  if (e.key === "Backspace" && search_input.value.length < 2)
    search_delete.setAttribute("id", "hide");
  if (e.key === "Enter") fetchData();
  if (e.ctrlKey && e.key == "Backspace")
    search_delete.setAttribute("id", "hide");
  search_input.style.border = "2px solid #ffd18e";
});

search_delete.addEventListener("click", function () {
  search_input.value = "";
  search_input.style.border = "2px solid #ffd18e";
  search_delete.setAttribute("id", "hide");
});

search.addEventListener("click", function () {
  fetchData();
});

async function fetchData() {
  try {
    let api_link = `https://api.dictionaryapi.dev/api/v2/entries/en/${search_input.value}`;
    const response = await fetch(api_link);
    if (!response.ok) {
      search_input.style.border = "2px solid #BB2205";
      throw new Error("Word not found!");
    }
    document.querySelector(".info-container").removeAttribute("id");
    document.querySelector(".init-container").setAttribute("id", "hide");
    const data = await response.json();
    word.textContent = data[0].word;
    part_of_speech.textContent = data[0].meanings[0].partOfSpeech;
    meaning.textContent = data[0].meanings[0].definitions[0].definition;
    phonetic.textContent = data[0].phonetic;
    example.textContent = data[0].meanings[0].definitions[0].example;
    if (example.textContent === "") {
      example.style.color = "maroon";
      example.textContent = "No example to show!";
    } else {
      example.style.color = "black";
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

sound.addEventListener("click", async function () {
  const data = await fetchData();
  let audio = new Audio(data[0].phonetics[0].audio);
  audio.play();
});

const URL = "https://swapi.dev/api/people/";

// async function getCharacters() {
//   const response = await fetch(URL);
//   const result = response.json();
//   console.log(result);
// }
// getCharacters();

const spinner = document.getElementById("spinner");
const btn = document.getElementById("btn");
const li = document.createElement("li");
const h1 = document.getElementById("h1");
const box = document.getElementById("box");
// const ul = document.getElementById("ul");

function showSpinner() {
  spinner.style.display = "block";
}

function hideSpinner() {
  spinner.style.display = "none";
}

function getCharacters() {
  try {
    btn.addEventListener("click", async () => {
      showSpinner();
      const response = await fetch(URL);
      const result = await response.json();
      renderCharacters(result);
      // console.log(result);
      // h1.style.display = "none";
      hideSpinner();
    });
  } catch (error) {
    console.error(error);
  } finally {
    hideSpinner();
  }
}
getCharacters();

function renderCharacters(characters) {
  characters.results.forEach((character, index) => {
    const card = document.createElement("div");
    const cardBody = document.createElement("div");
    const h2 = document.createElement("h2");
    const btn = document.createElement("button");
    btn.innerText = "Learn more";
    btn.className = "btn btn-solid-primary";
    // const p = document.createElement("p");
    card.classList.add("card");
    cardBody.classList.add("card-body");
    h2.classList.add("card-header");
    // p.classList.add("text-content2");
    h2.innerHTML = `${index + 1} ${character.name}`;
    // p.innerHTML = /*html*/ `Gender: ${character.gender} <br>
    // Hair color: ${character.hair_color} <br>
    // Height: ${character.height}`;
    cardBody.appendChild(btn);
    box.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(h2);
    // h2.appendChild(p);
    card.addEventListener("mousemove", () => {
      btn.style.display = "inline-block";
    });
    card.addEventListener("mouseleave", () => {
      btn.style.display = "none";
    });
  });
}

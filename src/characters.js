const URL = "https://swapi.dev/api/people/";

const spinner = document.getElementById("spinner");
const btn = document.getElementById("btn");
const li = document.createElement("li");
const h1 = document.getElementById("h1");
const box = document.getElementById("box");
const pagination = document.getElementById("pagination");

function showSpinner() {
  spinner.style.display = "block";
}

function hideSpinner() {
  spinner.style.display = "none";
}
function showPagination() {
  pagination.style.display = "inline-block";
}
function hidePagination() {
  pagination.style.display = "none";
}

hidePagination();

function getCharacters() {
  try {
    btn.addEventListener("click", async () => {
      showSpinner();
      const response = await fetch(URL);
      const result = await response.json();
      renderCharacters(result);
      h1.style.display = "none";
      btn.style.display = "none";
      hideSpinner();
    });
  } catch (error) {
    console.error(error);
  } finally {
    hideSpinner();
    pagination.style.display = "inline-block";
  }
}
getCharacters();

function renderCharacters(characters) {
  characters.results.forEach((character, index) => {
    const card = document.createElement("div");
    const cardBody = document.createElement("div");
    const h2 = document.createElement("h2");
    const btn = document.createElement("button");
    const accordion = document.createElement("div");
    btn.innerText = "Show more";
    btn.className = "button";
    accordion.className = "accordion";
    card.classList.add("card");
    cardBody.classList.add("card-body");
    h2.classList.add("card-header");
    h2.innerHTML = `${index + 1} ${character.name}`;
    h2.appendChild(btn);
    box.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(h2);
    card.addEventListener("mousemove", () => {
      btn.style.display = "inline-block";
    });
    card.addEventListener("mouseleave", () => {
      btn.style.display = "none";
    });
    let isOpen = false;
    let accordionHeight = 0;

    btn.addEventListener("click", () => {
      if (!isOpen) {
        isOpen = true;
        btn.remove();
        const button = document.createElement("button");
        button.className = "button1";
        button.innerText = "Show less";
        h2.appendChild(button);
        accordion.innerHTML = /*html*/ `Gender: ${character.gender} <br>
        Hair color: ${character.hair_color} <br>
        Height: ${character.height}cm`;
        cardBody.appendChild(accordion);
        accordionHeight = accordion.scrollHeight;
        accordion.style.height = "0";
        setTimeout(() => {
          accordion.style.height = accordionHeight + "px";
        }, 0);

        button.addEventListener("click", () => {
          isOpen = false;
          accordionHeight = accordion.scrollHeight;
          accordion.style.height = "0";
          button.remove();
          h2.appendChild(btn);
        });
      } else {
        isOpen = false;
        accordionHeight = accordion.scrollHeight;
        accordion.style.height = "0";
        accordion.innerHTML = "";
        h2.appendChild(btn);
      }
    });
  });
}

// Favorite Show Section
const favoriteShowSectionElement = document.getElementById(
  "favorite-show-section"
);
const favoriteShowInputElement = document.getElementById("favorite-show-input");
const favoriteShowBtn = document.getElementById("favorite-show-btn");
const h2FavoriteShowElement = document.getElementById("h2-favorite-show");

// Discover New Show
const newShowSectionElement = document.getElementById("new-show-section");
const newShowBtn = document.getElementById("new-show-btn");
const h2NewShowElement = document.getElementById("h2-new-show");

// title element
const titleElement = document.getElementById("title");

//reset button
const resetBtn = document.getElementById("reset-btn");

// url source
const URL_SEARCH_SHOW_TEXT = "https://api.tvmaze.com/search/shows?q=";

// Set up values
const DEFAULT_VALUE = 0;
const IMAGE_NEW_SHOW_LENGTH = 9;
const IMG_ERROR = "./img/404.png";
let newShowInputElement = "";
let isFavorite = false;
// let isActiveInfoWind = false;
//const DEFAULT_CURRENT_ID = 100;
//let currentId = DEFAULT_CURRENT_ID;

function reset(containerAllResults) {
  containerAllResults.remove();

  favoriteShowInputElement.value = "";
  newShowInputElement = "";

  h2NewShowElement.innerHTML =
    "I am bored, please give me new Shows to waste my time :) ";
  h2FavoriteShowElement.innerHTML = "Get information about your favorite Show.";

  favoriteShowBtn.classList.add("show");
  favoriteShowInputElement.classList.add("show");
  newShowBtn.classList.add("show");
  favoriteShowSectionElement.classList.add("show");
  newShowSectionElement.classList.add("show");
  resetBtn.classList.remove("show");
  resetBtn.classList.add("hide");
}

function generateRandomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";

  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function resultFavoriteDisplay() {
  favoriteShowBtn.classList.remove("show");
  favoriteShowInputElement.classList.remove("show");
  newShowSectionElement.classList.remove("show");

  favoriteShowBtn.classList.add("hide");
  favoriteShowInputElement.classList.add("hide");
  newShowSectionElement.classList.add("hide");
}

function resultNewDisplay() {
  newShowBtn.classList.remove("show");
  favoriteShowSectionElement.classList.remove("show");

  newShowBtn.classList.add("hide");
  favoriteShowSectionElement.classList.add("hide");
}

function generateElement(
  elementType,
  elementParent,
  textClassName,
  textIdName
) {
  const elemName = document.createElement(elementType);
  elemName.id = textIdName;
  elemName.className = textClassName;
  elementParent.appendChild(elemName);

  return elemName;
}

function addBoxInfo(response, containerResult, isFavorite) {
  const infoContainer = generateElement(
    "div",
    containerResult,
    "box-info",
    "info-container"
  );

  if (isFavorite === false) {
    infoContainer.innerHTML = `Average: ${
      response.show.rating.average
    }.<br> Genres: ${response.show.genres.join(", ")}.<br> Status: ${
      response.show.status
    }`;
  } else {
    infoContainer.innerHTML = `Summary: ${response.show.summary}`;
    infoContainer.classList.add("is-favorite");
    infoContainer.classList.remove("box-info");
  }
  return infoContainer;
}

function createParagElement(text, containerResult, string) {
  const Element = generateElement(
    "p",
    containerResult,
    "show-info-element",
    ""
  );
  Element.innerHTML = `${string} ${text}`;
}

function createResultContainer(response, containerResult, isFavorite, id) {
  const overlayContainerElement = generateElement(
    "div",
    containerResult,
    "",
    "img-overlay"
  );

  const imageElement = generateElement(
    "img",
    containerResult,
    "show-img-element",
    id
  );
  // update "condition === DEFAULT_VALUE" to "response[0].show.image.medium === null"
  if (response.show.image.medium === undefined) {
    imageElement.src = IMG_ERROR;
    imageElement.alt = `${response.show.name} Poster not found`;
    console.log("Not found");
  } else {
    imageElement.src = `${response.show.image.medium}`;
    imageElement.alt = `${response.show.name} Poster`;
  }

  addBoxInfo(response, overlayContainerElement, isFavorite);
}

function createFavoriteInfoElements(response) {
  resultFavoriteDisplay();

  h2FavoriteShowElement.innerHTML = "";

  const containerResult = generateElement(
    "div",
    h2FavoriteShowElement,
    "",
    "container-result-fav"
  );

  createParagElement(response[0].show.name, containerResult, "");

  createParagElement(
    response[0].show.rating.average,
    containerResult,
    "Rating average: "
  );

  createParagElement(
    response[0].show.genres.join(", "),
    containerResult,
    "Genre: "
  );

  createParagElement(response[0].show.status, containerResult, "Status: ");

  const officialSiteElement = generateElement(
    "a",
    containerResult,
    "show-info-element",
    ""
  );
  officialSiteElement.innerText = `Official Site: ${response[0].show.officialSite}`;
  officialSiteElement.href = `${response[0].show.officialSite}`;

  if (response[0].show.image === null) {
    response[0].show.image = DEFAULT_VALUE;
  }

  createResultContainer(
    response[0],
    containerResult,
    isFavorite,
    response[0].show.summary,
    0
  );

  resetBtn.classList.add("show");
  resetBtn.addEventListener(
    "click",
    () => {
      reset(containerResult);
    },
    false
  );

  titleElement.addEventListener(
    "click",
    () => {
      reset(containerResult);
    },
    false
  );
}

function createArrayNewShow(response, i, containerAllResults) {
  if (response[i].show.image === null) {
    response[i].show.image = DEFAULT_VALUE;
  }

  const containerResult = generateElement(
    "div",
    containerAllResults,
    "container-result-new",
    ""
  );

  const containerResultImgInfo = generateElement(
    "div",
    containerResult,
    "",
    "container-overlay"
  );

  createResultContainer(response[i], containerResultImgInfo, isFavorite, "", i);

  createParagElement(response[i].show.name, containerResult, "Show: ");
}

function createNewShowElements(response) {
  resultNewDisplay();

  h2NewShowElement.innerHTML = `Hope you like our suggestions! Hover over the image to display more info`;

  const containerAllResults = generateElement(
    "div",
    newShowSectionElement,
    "",
    "container-results"
  );

  let i = DEFAULT_VALUE;

  if (response.length < IMAGE_NEW_SHOW_LENGTH) {
    for (i = 0; i < response.length; i++) {
      createArrayNewShow(response, i, containerAllResults);
    }
  } else {
    for (i = 0; i < IMAGE_NEW_SHOW_LENGTH; i++) {
      createArrayNewShow(response, i, containerAllResults);
    }
  }

  resetBtn.classList.add("show");
  resetBtn.addEventListener(
    "click",
    () => {
      reset(containerAllResults);
    },
    false
  );

  titleElement.addEventListener(
    "click",
    () => {
      reset(containerAllResults);
    },
    false
  );
}

const getInfoSource = async () => {
  if (newShowInputElement === "") {
    const favoriteShowText = favoriteShowInputElement.value;
    const urlSearchShow = await fetch(
      `${URL_SEARCH_SHOW_TEXT}${favoriteShowText}`
    );
    const response = await urlSearchShow.json();

    createFavoriteInfoElements(response);
  } else if (favoriteShowInputElement.value === "") {
    const newShowText = newShowInputElement;
    const urlSearchShow = await fetch(`${URL_SEARCH_SHOW_TEXT}${newShowText}`);
    const response = await urlSearchShow.json();

    createNewShowElements(response);
  }
};

function checkInputFavoriteShow() {
  isFavorite = true;
  if (favoriteShowInputElement.value === "") {
    h2FavoriteShowElement.innerHTML =
      "Please, fill info about your favorite Show";
  } else {
    getInfoSource();

    favoriteShowInputElement.value = "";
    newShowInputElement = "";
  }
}

function checkInputNewShow() {
  isFavorite = false;
  newShowInputElement = generateRandomLetter();

  getInfoSource();

  favoriteShowInputElement.value = "";
  newShowInputElement = "";
}

favoriteShowInputElement.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    checkInputFavoriteShow();
  }
});
favoriteShowBtn.addEventListener("click", checkInputFavoriteShow);
newShowBtn.addEventListener("click", checkInputNewShow);

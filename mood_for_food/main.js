// Get elements

const btnDish = document.getElementById("btn-dish");
const btnReset = document.getElementById("btn-reset");
const defaultDiv = document.getElementById("default-div");

// Default values
const URL_API = "https://foodish-api.herokuapp.com/api/";
const REMOVE_IMAGE_SRC_START = 41;
let isWinner = false;

function reset(containerElement, winnerElement, isWinner) {
  containerElement.remove();
  if (isWinner) {
    btnDish.classList.remove("disabled");
    btnDish.classList.add("enabled");
    winnerElement.remove();
    btnDish.disabled = false;
    isWinner = false;
  }
}

function getDishName(response) {
  const string = response.image.substring(REMOVE_IMAGE_SRC_START);
  return string.substring(0, string.indexOf("/"));
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

function displayDish(response, containerElement) {
  const containerResElement = generateElement(
    "div",
    containerElement,
    "result",
    "result"
  );

  const dishImgElement = generateElement(
    "img",
    containerResElement,
    "dish-img",
    "dish-img"
  );
  dishImgElement.src = response.image;

  const textDishElement = generateElement(
    "p",
    containerResElement,
    "",
    "dish-name"
  );
  textDishElement.innerText = getDishName(response);

  return textDishElement.innerText;
}

function getChoosenDish(dishName1, dishName2, containerElement) {
  if (dishName1 === dishName2) {
    isWinner = true;

    const winnerElement = document.createElement("p");
    winnerElement.innerText = `We have a Winner! ${dishName1}!!!`;
    winnerElement.className = "winner-dish";
    winnerElement.id = "winner-dish";
    const containerResElement = document.getElementById("result");
    containerElement.insertBefore(winnerElement, containerResElement);

    btnDish.disabled = true;
    btnDish.classList.remove("enabled");
    btnDish.classList.add("disabled");

    return winnerElement;
  } else {
    const winnerElement = document.createElement("p");
    return winnerElement;
  }
}

async function getDish() {
  const dataRes1 = await fetch(URL_API);
  const responseRes1 = await dataRes1.json();

  const dataRes2 = await fetch(URL_API);
  const responseRes2 = await dataRes2.json();

  if (document.getElementById("results")) {
    const containerElement = document.getElementById("results");
    containerElement.remove();
  }

  const containerElement = generateElement(
    "div",
    defaultDiv,
    "results",
    "results"
  );

  const dishName1 = displayDish(responseRes1, containerElement);
  const dishName2 = displayDish(responseRes2, containerElement);

  const winnerElement = getChoosenDish(dishName1, dishName2, containerElement);

  btnReset.addEventListener("click", function () {
    reset(containerElement, winnerElement, isWinner);
  });
}

btnDish.addEventListener("click", getDish);

import { animals } from "./js/animalData.js";

const RANDOM_DOG_URL = "https://random.dog/woof.json";
const DEFAULT_VALUE = 0;
let minRealValueArray = [];
let maxRealValueArray = [];
let realValueMatch = [];
let error = "";
let realValue;
let sizeContainerElementStyle = {
  height: "0px",
  overflow: "hidden",
};

const containerAll = document.getElementById("container-all");
const unitTimeInputElement = document.getElementById("unit-time-input");
const containerElement = document.getElementById("container");
const inputNumberElement = document.getElementById("input-number");
const animalContainerElement = document.getElementById("animal-container");
const convertBtn = document.getElementById("convert-btn");
const resultElement = document.getElementById("result");
const randomDogBtn = document.getElementById("btn-random-dog");
const containerRandomDogImg = document.getElementById(
  "container-random-dog-img"
);
const randomDogImg = document.getElementById("random-dog-img");
const closeRandomDogImgBtn = document.getElementById(
  "btn-close-random-dog-img"
);
const headerElement = document.getElementById("header");

let inputNumber = Number(inputNumberElement.value);

function createElem(type, parent, idElement, classElement) {
  const element = document.createElement(type);
  element.id = idElement;
  element.className = classElement;
  parent.appendChild(element);

  return element;
}

function createOptionElement(
  type,
  parent,
  idElement,
  classElement,
  selectOptionValue,
  selectOptionText
) {
  const element = createElem(type, parent, idElement, classElement);
  element.value = selectOptionValue;
  element.text = selectOptionText;
}

function createInputRadioElement(
  type,
  inputType,
  inputName,
  parent,
  idElement,
  classElement,
  selectOptionValue
) {
  const element = createElem(type, parent, idElement, classElement);
  element.value = selectOptionValue;
  element.setAttribute("type", `${inputType}`);
  element.setAttribute("name", `${inputName}`);
}

function setDisableBtn() {
  convertBtn.disabled = true;
  convertBtn.style.cursor = "not-allowed";
  convertBtn.style.background = "grey";
}

function isDog() {
  selectAnimalElement.value === "dog"
    ? (sizeContainerElement.style.visibility = "visible")
    : (sizeContainerElement.style.visibility = "hidden");
}

function reset() {
  unitTimeInputElement.value = "";
  inputNumberElement.value = "";
  selectAnimalElement.value = "";
  resultElement.innerHTML = "00";
  containerElement.style.backgroundImage = "";
  isDog();
  document.querySelector('input[name="size"]:checked').checked = false;
  setDisableBtn();
}

const selectAnimalElement = createElem(
  "select",
  animalContainerElement,
  "",
  ""
);

createOptionElement(
  "option",
  selectAnimalElement,
  "select-animal-list",
  "animal-options",
  "",
  `Select animal`
);

const animalsList = Object.keys(animals);
const dogSizeList = Object.keys(animals.dog.values);

animalsList.forEach((animal) => {
  const option = animal;
  const animalOption = createOptionElement(
    "option",
    selectAnimalElement,
    `${option}`,
    "animal-option",
    option,
    `${option}`
  );
});

const sizeContainerElement = createElem(
  "div",
  animalContainerElement,
  "size-container",
  ""
);
sizeContainerElement.style.visibility = "hidden";

const sizeDescElement = createElem("p", sizeContainerElement, "size-desc", "");
sizeDescElement.innerHTML =
  "Dog size: Small < 15 kg | Medium 15 < 45 kg | Big > 45 kg";

const containerSizeOptions = createElem(
  "div",
  sizeContainerElement,
  `container-size-options`,
  ""
);

dogSizeList.forEach((size) => {
  const option = size;

  const containerUniqueSize = createElem(
    "div",
    containerSizeOptions,
    `container-${option}`,
    ""
  );

  const sizeLabel = createElem("label", containerUniqueSize, "", "size-label");
  sizeLabel.setAttribute("for", `${option}`);
  sizeLabel.innerHTML = `${option}`;

  const sizeOption = createInputRadioElement(
    "input",
    "radio",
    "size",
    containerUniqueSize,
    `${option}`,
    "size-option",
    `${option}`
  );
});

selectAnimalElement.addEventListener(`change`, (e) => {
  isDog();
});

function clearResults() {
  minRealValueArray = [];
  maxRealValueArray = [];
  realValueMatch = [];
  error = "";
}

function matchInputData(
  inputNumber,
  animalValuesData,
  unitTimeInput,
  animalUnitData
) {
  const lastAnimalValuesData =
    Object.keys(animalValuesData)[Object.keys(animalValuesData).length - 1];

  const firstAnimalValuesData = Object.keys(animalValuesData)[0];

  const lastAnimalValuesDataFormatted = Number(lastAnimalValuesData);
  const firstAnimalValuesDataFormatted = Number(firstAnimalValuesData);

  if (lastAnimalValuesDataFormatted < inputNumber) {
    clearResults();
    error = "Sadly this animal does not live that long...";
  } else if (
    unitTimeInput === "month" &&
    animalUnitData === "months" &&
    inputNumber < 1
  ) {
    error = "this value is too small. Please, add a larger number";
  } else if (
    (unitTimeInput === "month" &&
      inputNumber >= 1 &&
      inputNumber < firstAnimalValuesDataFormatted) ||
    (unitTimeInput === "month" &&
      animalUnitData === "years" &&
      inputNumber < firstAnimalValuesDataFormatted)
  ) {
    const firstValueUnit =
      animalValuesData[firstAnimalValuesDataFormatted] /
      firstAnimalValuesDataFormatted;
    const humanYearsCal = firstValueUnit * inputNumber;

    realValueMatch.push(inputNumber);
    realValueMatch.push(humanYearsCal);
  } else {
    for (const realValue in animalValuesData) {
      const realValueFormatted = Number(realValue);

      if (inputNumber === realValueFormatted) {
        realValueMatch.push(realValueFormatted);
        realValueMatch.push(animalValuesData[realValueFormatted]);
      } else if (inputNumber > realValueFormatted) {
        minRealValueArray.push(realValueFormatted);
        minRealValueArray.push(animalValuesData[realValueFormatted]);
      } else if (
        inputNumber < realValueFormatted &&
        maxRealValueArray.length < 1
      ) {
        maxRealValueArray.push(realValueFormatted);
        maxRealValueArray.push(animalValuesData[realValueFormatted]);
      } // close if
    } // close for
  } // close main if
}

function calculateHumanYears(
  realValueMatch,
  maxRealValueArray,
  minRealValue,
  minHumanValue,
  inputNumber,
  humanValue
) {
  if (realValueMatch.length > 1) {
    realValue = realValueMatch[0];
    humanValue = realValueMatch[1];
  } else {
    const diffRealValue = maxRealValueArray[0] - minRealValue;
    const diffHumanValue = maxRealValueArray[1] - minHumanValue;
    const diffInputRealmin = inputNumber - minRealValue;
    humanValue =
      minHumanValue + (diffHumanValue * diffInputRealmin) / diffRealValue;
  }
  return humanValue;
}

if (inputNumber === 0 && selectAnimalElement.value === "") {
  setDisableBtn();
}

inputNumberElement.addEventListener("change", updateValue);
selectAnimalElement.addEventListener("change", updateValue);

function updateValue(e) {
  inputNumber = Number(inputNumberElement.value);

  if (inputNumber !== 0 && selectAnimalElement.value !== "") {
    convertBtn.disabled = false;
    convertBtn.style.cursor = "pointer";
    convertBtn.style.background = "rgba(111, 73, 55, 0.75)";
  }
}

convertBtn.addEventListener("click", clickBtn);

function clickBtn() {
  const selectAnimal = selectAnimalElement.value;
  const unitTimeInput = unitTimeInputElement.value;

  const animalUnitData = animals[selectAnimal].units;

  realValue = DEFAULT_VALUE;
  let humanValue = DEFAULT_VALUE;

  let animalValuesData = "";
  let sizeDog = "";

  inputNumber = Number(inputNumberElement.value);

  if (selectAnimal === "dog") {
    sizeDog = document.querySelector('input[name="size"]:checked').value;
    animalValuesData = animals[selectAnimal].values[sizeDog];
  } else {
    animalValuesData = animals[selectAnimal].values;
  }

  if (unitTimeInput === "year" && animalUnitData === "months") {
    inputNumber *= 12;
  }

  if (unitTimeInput === "month" && animalUnitData === "years") {
    inputNumber /= 12;
  }

  matchInputData(inputNumber, animalValuesData, unitTimeInput, animalUnitData);

  const minRealValue = minRealValueArray[minRealValueArray.length - 2];
  const minHumanValue = minRealValueArray[minRealValueArray.length - 1];

  humanValue = calculateHumanYears(
    realValueMatch,
    maxRealValueArray,
    minRealValue,
    minHumanValue,
    inputNumber,
    humanValue
  );

  error !== ""
    ? (resultElement.innerHTML = error)
    : (resultElement.innerHTML = `${humanValue.toFixed(2)} Human years`);

  containerElement.style.backgroundImage = `url(${animals[selectAnimal].url})`;

  clearResults();
} // close click btn

randomDogBtn.addEventListener("click", getRandoDogPic);
closeRandomDogImgBtn.addEventListener("click", closeRandomImg);

function getRandoDogPic(urlRandomDog) {
  containerRandomDogImg.classList.remove("hidden");
  containerRandomDogImg.classList.add("show");

  async function getInfo(url) {
    const data = await fetch(url);
    const response = await data.json();

    return response;
  }

  const randomDogData = getInfo(RANDOM_DOG_URL);

  randomDogData
    .then((resp) => {
      const url = resp.url;
      const urlEnd = url.substr(url.length - 4);

      containerAll.style.background = "rgb(169,169,169, .4)";

      if (urlEnd === ".mp4" || urlEnd === "webm") {
        randomDogImg.src =
          "https://www.northguru.com/media/images/image-not-found.jpg";
        closeRandomDogImgBtn.style.backgroundColor = "rgb(0, 0, 0, .6)";
      } else {
        randomDogImg.src = `${resp.url}`;
        closeRandomDogImgBtn.style.backgroundColor = "rgb(255, 255, 255, .6)";
      }
    })
    .catch((err) => {
      closeRandomDogImgBtn.style.backgroundColor = "rgb(255, 255, 255, .6)";
      randomDogImg.src =
        "https://www.northguru.com/media/images/image-not-found.jpg";
      console.error(err);
    });
}

function closeRandomImg() {
  containerRandomDogImg.classList.remove("show");
  containerRandomDogImg.classList.add("hidden");
  containerAll.style.background = "rgb(0, 0, 0, 0)";
  closeRandomDogImgBtn.style.backgroundColor = "rgb(255, 255, 255, .6)";
}

headerElement.addEventListener("click", reset);

//Elements
const frameElement = document.getElementById("frame");
const URL_IMG =
  "https://cdn.custom-cursor.com/packs/3772/the-simpsons-valentine-day-postcard-cursor-pack.png";

const TIMEOUT_VALUE = 250;
const TIME_ROTATE_VALUE = TIMEOUT_VALUE / 2;

const boxImgElement = document.createElement("img");
boxImgElement.id = "box-img";
boxImgElement.src = URL_IMG;
frameElement.appendChild(boxImgElement);

const cardImgElement = document.createElement("img");
cardImgElement.id = "card-img";
cardImgElement.className = "card-img-hidden";
cardImgElement.src = URL_IMG;
frameElement.appendChild(cardImgElement);

cardImgElement.style.transition = `all ${TIMEOUT_VALUE}ms linear`;

async function step(descriptor) {
  await wait(descriptor.timeout);
  cardImgElement.classList.add(descriptor.className);
}

function wait(time) {
  const timeout = new Promise((resolve) => {
    setTimeout(resolve, time);
  });
  return timeout;
}

const animationDescriptors = [
  { className: "card-img-out", timeout: 0 },
  { className: "card-img-middle-out-beg", timeout: TIMEOUT_VALUE },
  { className: "card-img-middle-out-mid", timeout: TIMEOUT_VALUE },
  { className: "card-img-middle-out-end", timeout: TIMEOUT_VALUE },
  { className: "card-img-middle-out", timeout: TIMEOUT_VALUE },
  { className: "rotate1", timeout: TIME_ROTATE_VALUE },
  { className: "rotate2", timeout: TIME_ROTATE_VALUE },
  { className: "rotate3", timeout: TIME_ROTATE_VALUE },
  { className: "rotate4", timeout: TIME_ROTATE_VALUE },
  { className: "rotate5", timeout: TIME_ROTATE_VALUE },
  { className: "rotate6", timeout: TIME_ROTATE_VALUE },
  { className: "rotate7", timeout: TIME_ROTATE_VALUE },
  { className: "rotate8", timeout: TIME_ROTATE_VALUE },
  { className: "rotate9", timeout: TIME_ROTATE_VALUE },
  { className: "rotate10", timeout: TIME_ROTATE_VALUE },
  { className: "rotate11", timeout: TIME_ROTATE_VALUE },
  { className: "card-img-show", timeout: TIME_ROTATE_VALUE },
];

async function openBox() {
  for (let i = 0; i < animationDescriptors.length; i++) {
    await step(animationDescriptors[i]);
  }

  cardImgElement.addEventListener("click", (e) => openCard());
}

function createText(parentElement, id, text) {
  const textCardEnElement = document.createElement("p");
  textCardEnElement.id = `${id}`;
  textCardEnElement.innerText = `${text}`;
  parentElement.appendChild(textCardEnElement);
}

function openCard() {
  cardImgElement.style.transform = "scale(1.3) rotate(348deg)";
  cardImgElement.classList.add("card-img-open");

  const cardImgOpenInvertElement = cardImgElement.cloneNode(true);
  cardImgOpenInvertElement.style.transform =
    "rotateY(200deg) scale(1.3) rotate(348deg)";
  cardImgOpenInvertElement.id = "card-img-open-invert";
  cardImgOpenInvertElement.classList.add("card-img-open-invert");
  frameElement.appendChild(cardImgOpenInvertElement);

  createText(frameElement, "text-card-es", "Eres muy chu chu chuli!!!");

  createText(frameElement, "text-card-en", "You choo choo choose me!!!");

  createText(
    frameElement,
    "text-card-fr",
    "Je suis ton p'tit bout de chou, chou, chou!!!"
  );

  createText(
    frameElement,
    "text-card-it",
    "Io ciuf ciuf ti acciuffo, tu ciuf ciuf acciuffi me!!!"
  );

  createText(frameElement, "text-card-de", "Ich wä wä wähle dich.!!!");
}

frameElement.addEventListener("click", (e) => openBox());

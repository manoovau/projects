//Elements
const frameElement = document.getElementById("frame");
const urlImg = "https://cdn.custom-cursor.com/packs/3772/the-simpsons-valentine-day-postcard-cursor-pack.png";

const boxImgElement = document.createElement("img");
boxImgElement.id = "box-img";
boxImgElement.src = urlImg;
frameElement.appendChild(boxImgElement);

const cardImgElement = document.createElement("img");
cardImgElement.id = "card-img";
cardImgElement.className = "card-img-hidden";
cardImgElement.src = urlImg;
frameElement.appendChild(cardImgElement);

const timeoutValue = 250;
const timeRotateValue = timeoutValue/2;
cardImgElement.style.transition = `all ${timeoutValue}ms linear`

async function step(descriptor){
    await wait(descriptor.timeout);
    cardImgElement.classList.add(descriptor.className);
}

function wait(time){
    const timeout = new Promise(resolve => {
        setTimeout(resolve, time)
    })
    return timeout
}

const animationDescriptors = [
    { className: "card-img-out", timeout: 0 },
    { className: "card-img-middle-out-beg", timeout: timeoutValue },
    { className: "card-img-middle-out-mid", timeout: timeoutValue },
    { className: "card-img-middle-out-end", timeout: timeoutValue },
    { className: "card-img-middle-out", timeout: timeoutValue },
    { className: "rotate1", timeout: timeRotateValue },
    { className: "rotate2", timeout: timeRotateValue },
    { className: "rotate3", timeout: timeRotateValue },
    { className: "rotate4", timeout: timeRotateValue },
    { className: "rotate5", timeout: timeRotateValue },
    { className: "rotate6", timeout: timeRotateValue },
    { className: "rotate7", timeout: timeRotateValue },
    { className: "rotate8", timeout: timeRotateValue },
    { className: "rotate9", timeout: timeRotateValue },
    { className: "rotate10", timeout: timeRotateValue },
    { className: "rotate11", timeout: timeRotateValue },
    { className: "card-img-show", timeout: timeRotateValue }
]

async function openBox(){
    for(let i = 0; i < animationDescriptors.length; i++){
        await step(animationDescriptors[i]);
    }
    
     cardImgElement.addEventListener("click", (e) => openCard());
}

function createText(parentElement, id, text){
    const textCardEnElement = document.createElement("p");
    textCardEnElement.id = `${id}`;
    textCardEnElement.innerText = `${text}`
    parentElement.appendChild(textCardEnElement);
}

function openCard(){
    cardImgElement.style.transform = "scale(1.3) rotate(348deg)";
    cardImgElement.classList.add("card-img-open");
    

    const cardImgOpenInvertElement = cardImgElement.cloneNode(true);
    cardImgOpenInvertElement.style.transform = "rotateY(200deg) scale(1.3) rotate(348deg)";
    cardImgOpenInvertElement.id = "card-img-open-invert";
    cardImgOpenInvertElement.classList.add("card-img-open-invert");
    frameElement.appendChild(cardImgOpenInvertElement);

    createText(frameElement, "text-card-es", "Eres muy chu chu chuli!!!")
    
    createText(frameElement, "text-card-en", "You choo choo choose me!!!")
    
    createText(frameElement, "text-card-fr", "Je suis ton p'tit bout de chou, chou, chou!!!")
    
    createText(frameElement, "text-card-it", "Io ciuf ciuf ti acciuffo, tu ciuf ciuf acciuffi me!!!")
    
    createText(frameElement, "text-card-de", "Ich wä wä wähle dich.!!!")
}


frameElement.addEventListener("click", (e) => openBox());
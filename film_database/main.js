// Favorite Show Section
const favoriteShowSectionElement = document.getElementById("favorite-show-section")
const favoriteShowInputElement = document.getElementById("favorite-show");
const favoriteShowBtn = document.getElementById("favorite-show-btn");
const h2FavoriteShowElement = document.getElementById("h2-favorite-show");

// Discover New Show
const newShowSectionElement = document.getElementById("new-show-section")
const newShowBtn = document.getElementById("new-show-btn");
const h2NewShowElement = document.getElementById("h2-new-show");

//reset button
const resetBtn = document.getElementById("reset-btn");

// url source
const urlSearchShowText = "https://api.tvmaze.com/search/shows?q=";

// Set up values
const DEFAULT_VALUE = 0;
const IMAGE_NEW_SHOW_LENGTH = 9;
let newShowInputElement = "";

function reset(containerResults){
    containerResults.remove();
    
    favoriteShowInputElement.value = "";
    newShowInputElement = "";
    
    h2NewShowElement.innerHTML = "I want to discover more shows."
    h2FavoriteShowElement.innerHTML = "Get information about your favorite Show";
    
    favoriteShowBtn.classList.add("show");
    favoriteShowInputElement.classList.add("show");
    newShowBtn.classList.add("show");
    favoriteShowSectionElement.classList.add("show");
    newShowSectionElement.classList.add("show");
    resetBtn.classList.remove("show");
    resetBtn.classList.add("hide");
}

function generateRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789"
    
    return alphabet[Math.floor(Math.random() * alphabet.length)]
}

function resultFavoriteDisplay(){
    favoriteShowBtn.classList.remove("show");
    favoriteShowInputElement.classList.remove("show");
    newShowSectionElement.classList.remove("show");  
    
    favoriteShowBtn.classList.add("hide");
    favoriteShowInputElement.classList.add("hide");
    newShowSectionElement.classList.add("hide");  
}

function resultNewDisplay(){
    newShowBtn.classList.remove("show");
    favoriteShowSectionElement.classList.remove("show");
    
    newShowBtn.classList.add("hide");
    favoriteShowSectionElement.classList.add("hide");
}

function generateElement(elementType, elementParent, textClassName, textIdName){
    const elemName = document.createElement(elementType);
    elemName.id = textIdName;
    elemName.className = textClassName;
    elementParent.appendChild(elemName);

    return elemName;
}

function imgClick(index, response, responseName, average, genres, status, containerResult){

    if(document.getElementById("img-click")){
        const containerElement = document.getElementById("img-click");
        containerElement.remove();
    }

    const imgSelectedInfo = generateElement("div", containerResult, "img-click", "img-click");
    imgSelectedInfo.innerHTML = `Average: ${average}.<br> Genres: ${genres}.<br> Status: ${status}`;

    return imgSelectedInfo;
}

function createResultElement(response, containerResult, string){

    const Element = generateElement("p", containerResult, "show-info-element", "")
    Element.innerHTML = `${string} ${response}`;
}

function createImageElement(response, containerResult, responseName, condition, index, average, genres, status){

    const imageElement = generateElement("img", containerResult, "show-img-element", "")
    
    if(condition === DEFAULT_VALUE){
        imageElement.src = "https://gamepedia.cursecdn.com/smite_gamepedia/thumb/c/ca/NNF.png/250px-NNF.png?version=55e23d00061d6779e3c798b1b9c05122";
        imageElement.alt = `${responseName} Poster not found`;
    } else {
        imageElement.src = response;
        imageElement.alt = `${responseName} Poster`;
    }
    
    imageElement.addEventListener("click", e => {imgClick(index, response, responseName, average, genres, status, containerResult)})
    
}

function createFavoriteInfoElements(response){
    resultFavoriteDisplay();
    
    h2FavoriteShowElement.innerHTML = "";
    
    const containerResult = generateElement("div", h2FavoriteShowElement, "", "container-result-fav")
    
    createResultElement(response[0].show.name, containerResult, "Show: ");
    
    createResultElement(response[0].show.rating.average, containerResult, "Rating average: ");
    
    createResultElement(response[0].show.genres.join(", "), containerResult, "Genre: ");
    
    createResultElement(response[0].show.status, containerResult, "Status: ");

    const officialSiteElement = generateElement("a", containerResult, "show-info-element", "")
    officialSiteElement.innerText = `Official Site: ${response[0].show.officialSite}`;
    officialSiteElement.href = `${response[0].show.officialSite}`;
    
    if(response[0].show.image === null){response[0].show.image = DEFAULT_VALUE;}

    createImageElement(response[0].show.image.medium, containerResult, response[0].show.name, "0", response[0].show.rating.average, response[0].show.genres.join(", "), response[0].show.status)
    
    resetBtn.classList.add("show");
    resetBtn.addEventListener("click", () => { reset(containerResult); }, false);
}

function createArrayNewShow(response, i, containerResults){        
    if(response[i].show.image === null){response[i].show.image = DEFAULT_VALUE;}
    
    const containerResult = generateElement("div", containerResults, "container-result-new", "");

    createResultElement(response[i].show.name, containerResult, "Show: ");
    
    createImageElement(response[i].show.image.medium, containerResult, response[i].show.name, response[i].show.image, i, response[i].show.rating.average, response[i].show.genres.join(", "), response[i].show.status);

}

function createNewShowElements(response){
    resultNewDisplay();

    h2NewShowElement.innerHTML = `Enjoy!!! Click on the Image to display info`;
            
    const containerResults = generateElement("div", h2NewShowElement, "", "container-results");

    let i = DEFAULT_VALUE;

    if(response.length < IMAGE_NEW_SHOW_LENGTH){
        for(i = 0; i < response.length; i++){
            createArrayNewShow(response, i, containerResults);
        }

    } else {
        for(i = 0; i < IMAGE_NEW_SHOW_LENGTH; i++){
            createArrayNewShow(response, i, containerResults);
        }
    }

    resetBtn.classList.add("show");
    resetBtn.addEventListener("click", () => { reset(containerResults); }, false);
}

const getInfoSource = async () => {

    if (newShowInputElement === "") {
        const favoriteShowText = favoriteShowInputElement.value;
        const urlSearchShow = await fetch(`${urlSearchShowText}${favoriteShowText}`);
        const response = await urlSearchShow.json();

        createFavoriteInfoElements(response);
    } else if (favoriteShowInputElement.value === ""){
        const newShowText = newShowInputElement;
        const urlSearchShow = await fetch(`${urlSearchShowText}${newShowText}`);
        const response = await urlSearchShow.json();
        
        createNewShowElements(response);
    }     
}

function checkInputFavoriteShow(){
    if(favoriteShowInputElement.value === ""){
        h2FavoriteShowElement.innerHTML = "Please, fill info about your favorite Show";
    } else {
        getInfoSource();

        favoriteShowInputElement.value = "";
        newShowInputElement = "";
    }
}

function checkInputNewShow(){
    newShowInputElement = generateRandomLetter();
    
    getInfoSource();
                    
    favoriteShowInputElement.value = "";
    newShowInputElement = "";

}

favoriteShowInputElement.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) { 
      checkInputFavoriteShow();
    }
}); 
favoriteShowBtn.addEventListener("click", checkInputFavoriteShow);
newShowBtn.addEventListener("click", checkInputNewShow);
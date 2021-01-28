/* Instructions:

1. Wire up the budgeting tool so it tells the user whether or 
not they can afford an item based on their available funds. 💸
2. Style it as you wish 💅 

*/

const fundTextElemnt = document.getElementById("fund-text")
const fundElement = document.getElementById("fund");
const itemCostElement = document.getElementById("item-cost");
const itemElement = document.getElementById("item");
const calculationBtn = document.getElementById("btn-calculation");
const extraFundAmountElement = document.getElementById("extra-fund-amount");
const extraFundTextElement = document.getElementById("extra-fund-text");
const extraFundBtn = document.getElementById("btn-extra-fund");
const extraFundElements = document.getElementById("extra-fund");
const resultElement = document.getElementById("result");
const currentdataElement = document.getElementById("current-data");

const totalCostElement = document.getElementById("total-cost");
const remainingMoneyElement = document.getElementById("remaining-money")

const DEFAULT_VALUE = 0;
let fund = DEFAULT_VALUE;
let remainingMoney = DEFAULT_VALUE;
let itemCost = DEFAULT_VALUE;
let TotalCost = DEFAULT_VALUE;

calculationBtn.addEventListener("click", checkFundInput);
extraFundBtn.addEventListener("click", checkExtraFund);



function addList(itemElementValue, itemCost){
    const p = document.createElement("p");
    p.innerHTML = `${itemElementValue}: ${itemCost}`;
    p.classList.add("item-list");
    extraFundElements.appendChild(p);
}

function valueFormatted(value){
    return parseFloat(value).toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

function ExtraFundShow(fund, TotalCost, remainingMoney){  
    const fundFormatted = valueFormatted(fund);
    const TotalCostFormatted = valueFormatted(TotalCost);
    const remainingMoneyFormatted = valueFormatted(remainingMoney);
    
    fundTextElemnt.innerHTML = `Your Fund is ${fundFormatted}`;
    totalCostElement.innerHTML = `Purchase Cost:  ${TotalCostFormatted}`;
    remainingMoneyElement.innerHTML = `Remaining money: ${remainingMoneyFormatted}`
    
    fundElement.classList.add("hide");
    extraFundElements.classList.remove("hide");
    extraFundElements.classList.add("show");
    currentdataElement.classList.remove("hide");
    currentdataElement.classList.add("show");
    fundTextElemnt.classList.add("result-calculation"); 
    
    
}

function checkAfford(remainingMoney){
    if(remainingMoney > 0){
        resultElement.innerText = `You can afford to purchase the items listed below `
    } else {
        resultElement.innerText = `You cannot afford to purchase the items listed below `
    } 
}

function checkExtraFund(){
    if(extraFundAmountElement.value === ""){
        extraFundTextElement.innerHTML = `Please, fill Extra fund field.`;
    } else {
        extraFundCalculation();
        extraFundTextElement.innerHTML = `Wait! I saved more money.`;
    }
}

function extraFundCalculation(){
    const extraFund = parseFloat(extraFundAmountElement.value);
    fund = parseFloat(fundElement.value);
    fund += extraFund;
    remainingMoney = fund - TotalCost;    
    
    ExtraFundShow(fund, itemCost, remainingMoney);
    
    checkAfford(remainingMoney);
}

function checkFundInput(){
    if(fundElement.value==="" || itemCostElement.value === ""){
        fundTextElemnt.innerHTML = `Please, fill fund and item cost fields.`;
    } else {
        calculation();
    }
}

function calculation(){
    fund = parseFloat(fundElement.value);
    itemCost = parseFloat(itemCostElement.value);
    TotalCost+= itemCost;

    remainingMoney = fund - TotalCost;
    remainingMoneyElement.innerHTML = remainingMoney;
    
    checkAfford(remainingMoney);

    ExtraFundShow(fund, TotalCost, remainingMoney);
    
    addList(itemElement.value, itemCost);
}
const fundTextElemnt = document.getElementById("fund-text");
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
const remainingMoneyElement = document.getElementById("remaining-money");

const DEFAULT_VALUE = 0;
let fund = parseFloat(fundElement.value);
let remainingMoney = DEFAULT_VALUE;
let itemCost = DEFAULT_VALUE;
let totalCost = DEFAULT_VALUE;

calculationBtn.addEventListener("click", checkFundInput);
extraFundBtn.addEventListener("click", checkExtraFund);

function addList(itemElementValue, itemCost) {
  const p = document.createElement("p");
  p.innerHTML = `${itemElementValue}: ${itemCost}`;
  p.classList.add("item-list");
  extraFundElements.appendChild(p);
}

function valueFormatted(value) {
  return parseFloat(value).toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function extraFundShow(fund, totalCost, remainingMoney) {
  const fundFormatted = valueFormatted(fund);
  const totalCostFormatted = valueFormatted(totalCost);
  const remainingMoneyFormatted = valueFormatted(remainingMoney);

  fundTextElemnt.innerHTML = `Your savings: $${fundFormatted}`;
  totalCostElement.innerHTML = `Purchase Cost: $${totalCostFormatted}`;
  remainingMoneyElement.innerHTML = `Remaining money: $${remainingMoneyFormatted}`;

  fundElement.classList.add("hide");
  extraFundElements.classList.remove("hide");
  extraFundElements.classList.add("show");
  currentdataElement.classList.remove("hide");
  currentdataElement.classList.add("show");
  fundTextElemnt.classList.add("result-calculation");
}

function checkAfford(remainingMoney) {
  remainingMoney > 0
    ? (resultElement.innerText = `You can afford to purchase the items listed below:`)
    : (resultElement.innerText = `You cannot afford to purchase the items listed below:`);
}

function checkExtraFund() {
  if (extraFundAmountElement.value === "") {
    extraFundTextElement.innerHTML = `Please, fill Extra fund field.`;
  } else {
    extraFundTextElement.innerHTML = "Add more money to my savings:";
    extraFundCalculation();
  }
}

function extraFundCalculation() {
  const extraFund = parseFloat(extraFundAmountElement.value);
  fund += extraFund;
  remainingMoney = fund - totalCost;

  extraFundShow(fund, totalCost, remainingMoney);

  checkAfford(remainingMoney);
}

function checkFundInput() {
  fundElement.value === "" || itemCostElement.value === ""
    ? (fundTextElemnt.innerHTML = `Please, fill savings and item cost fields.`)
    : calculation();
}

function calculation() {
  itemCost = parseFloat(itemCostElement.value);
  totalCost = parseFloat(totalCost);
  totalCost += itemCost;

  remainingMoney = fund - totalCost;
  remainingMoneyElement.innerHTML = remainingMoney;

  checkAfford(remainingMoney);

  extraFundShow(fund, totalCost, remainingMoney);

  addList(itemElement.value, `$${itemCost}`);
}

const amountElement = document.getElementById("original-currency-amount");
const exchangeButton = document.getElementById("exchange");
const exchangeRateDisplayElement = document.getElementById("exchange-rate");
const originalCurrencyElement = document.getElementById(
  "original-currency-unit"
);
const newCurrencyElement = document.getElementById("new-currency-unit");
const outputTextElement = document.getElementById("output-text");
const dateElement = document.getElementById("date");

const CURRENCYS = [
  "USD",
  "CAD",
  "HKD",
  "ISK",
  "PHP",
  "DKK",
  "HUF",
  "CZK",
  "GBP",
  "RON",
  "SEK",
  "IDR",
  "INR",
  "BRL",
  "RUB",
  "HRK",
  "JPY",
  "THB",
  "CHF",
  "EUR",
  "MYR",
  "BGN",
  "TRY",
  "CNY",
  "NOK",
  "NZD",
  "ZAR",
  "USD",
  "MXN",
  "SGD",
  "AUD",
  "ILS",
  "KRW",
  "PLN",
];

function formatAsCurrency(amount, currency) {
  return amount.toLocaleString("en", { style: "currency", currency });
}

function addCurrencyOptions(selectElement) {
  for (let i = 0; i < CURRENCYS.length; i++) {
    const currency = CURRENCYS[i];
    const option = document.createElement("option");
    option.textContent = currency;
    option.value = currency;
    selectElement.appendChild(option);
  }
}

addCurrencyOptions(originalCurrencyElement);
addCurrencyOptions(newCurrencyElement);

const DEFAULT_AMOUNT_VALUE = 1;
const EXCHANGE_RATES_API = "https://api.frankfurter.app/latest";

function getAmount() {
  const amount = parseInt(amountElement.value, 10);
  if (Number.isNaN(amount)) {
    return DEFAULT_AMOUNT_VALUE;
  } else {
    return amount;
  }
}

exchangeButton.addEventListener("click", () => {
  const amount = getAmount();

  const originalCurrency = originalCurrencyElement.value;
  const newCurrency = newCurrencyElement.value;

  // Display the current date of exchange to the user
  const dateTodayFormatted = new Date().toISOString().slice(0, 10);
  dateElement.innerText = `Exchange Rate at ${dateTodayFormatted}.`;
  if (originalCurrency === newCurrency) {
    outputTextElement.innerText = `Please, select different currencies.`;
  } else {
    fetch(`${EXCHANGE_RATES_API}?base=${originalCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        const exchangeRate = data.rates[newCurrency];
        const exchangeAmount = exchangeRate * amount;

        const exchangeRateFormatted = exchangeRate.toFixed(2);
        const amountFormatted = formatAsCurrency(amount, originalCurrency);
        const exchangeAmountFormatted = formatAsCurrency(
          exchangeAmount,
          newCurrency
        );

        // Update the result in the UI
        exchangeRateDisplayElement.innerText = exchangeRateFormatted;
        outputTextElement.innerText = `The equivalent for ${amountFormatted} are ${exchangeAmountFormatted}.`;
      })
      .catch((err) => {
        outputTextElement.innerText = `Sorry, we have technical difficulties.`;
      });
  }
});

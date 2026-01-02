const dropdownElement = document.querySelectorAll(".dropdown");
const fromslect = document.querySelector("select[name = 'from']");
const toslect = document.querySelector("select[name = 'to']");
const btnElement = document.querySelector(".my-button");
const amount = document.querySelector("#in-cur");
let fromCurrency;
let toCurrency;
for (let option of dropdownElement) {
  for (let country in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = country;
    newOption.value = country;
    if (option.name === "from" && country === "USD") {
      newOption.selected = "selected";
    }

    if (option.name === "to" && country === "PKR") {
      newOption.selected = "selected";
    }
    option.appendChild(newOption);
  }
  option.addEventListener("change", (evt) => {
    handleSelectChange(evt.target);
  });
}

function handleSelectChange(element) {
  let currencyCode = element.value;
  let cuntryCode = countryList[currencyCode];
  let img = element.previousElementSibling;
  img.src = `https://flagsapi.com/${cuntryCode}/flat/64.png`;
}

btnElement.addEventListener("click", () => {
  checkRate();
});

async function checkRate() {
  const fromslect = document.querySelector("select[name = 'from']");
  const toslect = document.querySelector("select[name = 'to']");
  const paragraph = document.querySelector(".myPara");
  // fromCurrency = dropdownElement[0].value;
  fromCurrency = fromslect.value.toLowerCase();
  toCurrency = toslect.value.toLowerCase();
  // console.log(fromCurrency + "" + toCurrency);
  const baseUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`;
  if (amount.value <= 0) {
    amount.value = 1;
  } else {
    try {
      const response = await fetch(baseUrl);
      const data = await response.json();
      const rate = data[fromCurrency][toCurrency];
      const totalConversion = rate * amount.value;
      const fullAmount = totalConversion.toFixed(4);
      paragraph.innerHTML = `${
        amount.value
      }${fromCurrency.toUpperCase()} = ${fullAmount}${toCurrency.toUpperCase()}`;
    } catch {}
  }
}


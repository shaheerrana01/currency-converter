const fromSelect = document.getElementById("from-currency");
const toSelect = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultBox = document.getElementById("result");
const convertBtn = document.getElementById("convert");
const swapBtn = document.getElementById("swap");
const themeToggle = document.getElementById("themeToggle");

const API = "https://open.er-api.com/v6/latest/USD";

/* Load currencies */
async function loadCurrencies() {
  const res = await fetch(API);
  const data = await res.json();

  const currencies = Object.keys(data.rates);

  currencies.forEach(code => {
    fromSelect.add(new Option(code, code));
    toSelect.add(new Option(code, code));
  });

  fromSelect.value = "USD";
  toSelect.value = "PKR";
}

/* Convert */
convertBtn.addEventListener("click", async () => {
  const amount = amountInput.value;
  if (!amount || amount <= 0) return;

  const res = await fetch(API);
  const data = await res.json();

  const rate = data.rates[toSelect.value] / data.rates[fromSelect.value];
  const converted = (amount * rate).toFixed(2);

  resultBox.innerHTML = `
    <strong>${amount} ${fromSelect.value}</strong><br>
    =<br>
    <span style="color:#22d3ee;font-size:22px">
      ${converted} ${toSelect.value}
    </span>
  `;
});

/* Swap */
swapBtn.addEventListener("click", () => {
  [fromSelect.value, toSelect.value] =
  [toSelect.value, fromSelect.value];
});

/* 🌙☀️ Dark / Light Mode */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");

  themeToggle.innerHTML =
    document.body.classList.contains("dark")
      ? '<i class="fa-solid fa-moon"></i>'
      : '<i class="fa-solid fa-sun"></i>';
});

loadCurrencies();



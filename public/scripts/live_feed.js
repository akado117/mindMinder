const marketCapDom = document.querySelector("#market_cap");
const priceDom = document.querySelector("#price");
const holdersDom = document.querySelector("#total_holders");
const totalSupplyDom = document.querySelector("#total_supply");
const totalBurnedDom = document.querySelector("#total_burned");
const swapBtnDom = document.querySelectorAll(".swap-btn");
const platform = document.querySelectorAll(".goToPlatform");
const preRegBtn = document.querySelectorAll(".creatorprereg");
const closeFormBtn = document.querySelector("#closenowform");
const formPopup = document.querySelector("#formpopup");

// swapBtnDom.forEach((item) => {
//   item.addEventListener("click", (e) => {
//     //
//     e.preventDefault();
//     const url = `https://cuminu.herokuapp.com/swap`;

//     window.open(
//       `${url}`,
//       "window",
//       "height=200,width=400,status=yes,toolbar=no"
//     );
//   });
// });

const getLiveData = async () => {
  try {
    fetchData();

    setInterval(() => {
      console.log("fetching data");
      fetchData();
    }, 1800000);
  } catch (error) {
    console.log(error);
  }
};
const addressChecksummed = "0x7b412f141996411401f57e2ba1bc2235af807d4d";

getLiveData();

async function fetchData() {
  fetch("https://prices-cuminu.herokuapp.com/api/coinData")
    .then((res) => res.json())
    .then((data) => {
      let { max_supply: totalSupply } = data;
      let { USD } = data.quote;
      let {
        fully_diluted_market_cap: marketCap,
        percent_change_24h: dailyChange,
        price,
        volume_24h: dailyVolume,
        percent_change_1h: hourlyChange,
      } = USD;
      marketCap = formatPrice(marketCap);

      dailyVolume = formatPrice(dailyVolume);
      totalSupply = formatPrice(totalSupply);
      holders = "4,036";
      marketCapDom.textContent = `$${marketCap}`;
      totalSupplyDom.textContent = totalSupply;
      priceDom.textContent = `$${price.toFixed(6)}`;
      holdersDom.textContent = holders;
      console.log(
        marketCap,
        price,
        totalSupply,
        dailyChange,
        dailyVolume,
        hourlyChange
      );
    })
}

function formatPrice(price) {
  let priceString = Math.round(price).toString();
  console.log(priceString);
  const mappingSkip = {
    4: 1,
    5: 2,
    6: 3,
    7: 1,
    8: 2,
    9: 3,
    10: 1,
    11: 2,
  };

  const mappingDenomination = {
    4: "K",
    5: "K",
    6: "K",
    7: "M",
    8: "M",
    9: "M",
    10: "B",
    11: "B",
  };

  const skip = mappingSkip[priceString.length];
  console.log(skip);
  const Denomination = mappingDenomination[priceString.length];

  priceString = `${priceString.split("").slice(0, skip).join("")}.${priceString
    .split("")
    .slice(skip, skip + 1)
    .join("")}${Denomination}`;
  return priceString;
}

// Adding Listener for toast notificaton
platform.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    Toastify({
      text: "Under Construction",
      duration: 3000,

      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      backgroundColor: "grey",
      color: "black",
      stopOnFocus: true, // Prevents dismissing of toast on hover
      onClick: function () {}, // Callback after click
    }).showToast();
  });
});

//

let formShown = false;

preRegBtn.forEach((item) => {
  item.addEventListener("click", (e) => {
    // e.preventDefault();

    if (!formShown) {
      formPopup.style.display = "block";
      formShown = true;
    } else {
      formPopup.style.display = "none";
      formShown = false;
    }
  });
});

closeFormBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (formShown) {
    formPopup.style.display = "none";
    formShown = false;
  }
});

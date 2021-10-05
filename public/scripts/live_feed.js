const elements = {
  marketCapDom: null,
  priceDom: null,
  holdersDom: null,
  totalSupplyDom: null,
  totalBurnedDom: null,
  swapBtnDom: null,
  platform: null,
  preRegBtn: null,
  closeFormBtn: null,
  formPopup: null,
}

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

// setFeedElements()
// setupFeedElements()
// getLiveData()

window.setFeedElements = () => {
  elements.marketCapDom = document.querySelector("#market_cap");
  elements.priceDom = document.querySelector("#price");
  elements.holdersDom = document.querySelector("#total_holders");
  elements.totalSupplyDom = document.querySelector("#total_supply");
  elements.totalBurnedDom = document.querySelector("#total_burned");
  elements.swapBtnDom = document.querySelectorAll(".swap-btn");
  elements.preRegBtn = document.querySelectorAll(".creatorprereg");
  elements.platform = document.querySelectorAll(".goToPlatform");
  elements.closeFormBtn = document.querySelector("#closenowform");
  elements.formPopup = document.querySelector("#formpopup");
}

window.getLiveData = async () => {
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
      elements.marketCapDom.textContent = `$${marketCap}`;
      elements.totalSupplyDom.textContent = totalSupply;
      elements.marketCapDom.textContent = `$${price.toFixed(6)}`;
      elements.holdersDom.textContent = holders;
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

window.setupFeedElements = () => {
  // Adding Listener for toast notificaton
  elements.platform.forEach((item) => {
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

  elements.preRegBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
      // e.preventDefault();

      if (!formShown) {
        elements.formPopup.style.display = "block";
        formShown = true;
      } else {
        elements.formPopup.style.display = "none";
        formShown = false;
      }
    });
  });

  elements.closeFormBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (formShown) {
      elements.formPopup.style.display = "none";
      formShown = false;
    }
  });
}
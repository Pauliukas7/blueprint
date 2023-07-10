window.productLevelVars = {};
window.orderLevelVars = {};
const stepValue = {
  ProductPage: 1,
  BasketPage: 2,
  PurchaseCompleted: 3
};

const scriptsUIContainer = document.getElementById("scripts");

const Prism = { highlightAll: () => console.log("Prism") };
const customScriptsSelectElementValue =
  document.getElementById("customscripts").value;
generateCodesButton.onclick = () => {
  if (window.dcoTemplateSelected) {
    window.selectedTrackingPoints = [
      "Product Page",
      "Basket Page",
      "Purchase Completed"
    ];
  }
  if (window.selectedTypeID != "custom") {
    generateTrackingScripts();
  } else {
    // if (customScriptsSelectElementValue == "aftertime") {
    const seconds = parseInt(
      document.getElementById("aftertime-seconds").value
    );
    const tpName = document.getElementById("aftertime-tpname").value;

    window.selectedTrackingPoints = [tpName];
    // }

    generateTrackingScriptsAfterTime(seconds);
    // }
  }
};

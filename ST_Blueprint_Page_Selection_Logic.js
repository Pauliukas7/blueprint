const stepValue = {
  ProductPage: 1,
  BasketPage: 2,
  PurchaseCompleted: 3
};

window.dcoTemplateSelected = false;
window.selectedPageNames = [];
window.productLevelVars = {};
window.orderLevelVars = {};
window.generatedDomain = null;

let IDarray = [];
window.numOfPagesChecked = 0;
window.trackingIdNotEmpty = false;

const generateCodesButton = document.querySelector(".button-primary");

const casinoTypeSelectionElement = document.getElementById("casino");
const ecommerceTypeSelectionElement = document.getElementById("ecommerce");
const pagenamesContainer = document.querySelectorAll("#pagenames");

const allWebsiteTypes = document.querySelectorAll(".website-type");

const optionsContainer = document.getElementById("options-container");
const pageNamesContainer = document.getElementById("pagenames");
const scriptsContainer = document.getElementById("scripts");

const casinoPageNamesList = document.querySelector(".casino-pagenames");
const ecommercePageNamesList = document.querySelector(".ecommerce-pagenames");

const trackingIdBlock = document.querySelector(".tracking-id-and-domain-block");

function showPagenamesCheckboxList(id) {
  const selectedTypeElement = document.getElementById(id);
  selectedTypeElement.classList.add("selected");

  for (const websiteType of Array.from(allWebsiteTypes)) {
    if (!websiteType.id != id) websiteType.classList.remove("selected");
  }

  const correctPagenames = document.querySelector("." + id + "-pagenames");

  if (window.currentPage != id) {
    window.currentPage = id;
    for (const pagenames of Array.from(pagenamesContainer)) {
      if (!pagenames.className.includes(id)) pagenames.hidden = true;
    }

    correctPagenames.hidden = false;
    trackingIdBlock.hidden = false;
  } else {
    correctPagenames.hidden = !correctPagenames.hidden;
    trackingIdBlock.hidden = !trackingIdBlock.hidden;
  }
}

const pageCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const trackingSetupIdField = document.querySelector('input[type="number"]');

for (const pageCheckbox of pageCheckboxes) {
  pageCheckbox.onchange = () => {
    pageCheckbox.checked
      ? window.numOfPagesChecked++
      : window.numOfPagesChecked--;
    if (
      (window.trackingIdNotEmpty && window.numOfPagesChecked > 0) ||
      (window.trackingIdNotEmpty && window.dcoTemplateSelected)
    ) {
      generateCodesButton.disabled = false;
    } else {
      generateCodesButton.disabled = true;
    }
  };
}

const dcoTemplateCheckbox = document.getElementById("dcoselection");
dcoTemplateCheckbox.onchange = () => {
  window.dcoTemplateSelected = dcoTemplateCheckbox.checked ? true : false;
  const pageNameDivs = pageNamesContainer.querySelectorAll(".page-option");

  if (dcoTemplateCheckbox.checked) {
    pageNameDivs.forEach((option) => {
      option.childNodes[0].disabled = true;
    });
  } else {
    pageNameDivs.forEach((option) => (option.childNodes[0].disabled = false));
  }

  if (
    (trackingIdNotEmpty && numOfPagesChecked > 0) ||
    (trackingIdNotEmpty && window.dcoTemplateSelected)
  ) {
    generateCodesButton.disabled = false;
  } else {
    generateCodesButton.disabled = true;
  }
};

trackingSetupIdField.oninput = () => {
  trackingIdFieldNotEmpty = trackingSetupIdField.value.length > 3;
  trackingIdFieldNotEmpty
    ? (window.trackingIdNotEmpty = true)
    : (window.trackingIdNotEmpty = false);

  if (
    (trackingIdNotEmpty && numOfPagesChecked > 0) ||
    (trackingIdNotEmpty && window.dcoTemplateSelected)
  ) {
    generateCodesButton.disabled = false;
  } else {
    generateCodesButton.disabled = true;
  }
};

casinoTypeSelectionElement.onclick = (e) =>
  showPagenamesCheckboxList(e.target.id);
ecommerceTypeSelectionElement.onclick = (e) =>
  showPagenamesCheckboxList(e.target.id);

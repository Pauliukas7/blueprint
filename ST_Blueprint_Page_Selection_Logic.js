window.dcoTemplateSelected = false;
window.selectedTrackingPoints = [];
window.generatedDomain = null;

let IDarray = [];

window.trackingDomain = "";
window.trackingID = 0;

const pagenames = document.getElementById("options-container");

const generateCodesButton = document.querySelector(".button-primary");

const casinoTypeSelectionElement = document.getElementById("casino");
const ecommerceTypeSelectionElement = document.getElementById("ecommerce");
const trackingPointsContainer = document.querySelectorAll(".trackingpoints");

const pageCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const allWebsiteTypes = document.querySelectorAll(".website-type");
const websiteTypesContainer = document.getElementById("types");

const optionsContainer = document.getElementById("options-container");
const scriptsContainer = document.getElementById("scripts");

const casinoPageNamesList = document.querySelector(".casino-pagenames");
const ecommercePageNamesList = document.querySelector(".ecommerce-pagenames");
pageCheckboxes.forEach((checkbox) => {
  if (checkbox.checked) window.selectedTrackingPoints.push(checkbox.value);
});
const dcoTemplateCheckbox = document.getElementById("dcoselection");
function showPagenamesCheckboxList(id) {
  if (id != "custom") {
    if (id == "casino") {
      if (dcoTemplateCheckbox.checked) {
        dcoTemplateCheckbox.checked = false;
        dcoTemplateCheckbox.dispatchEvent(new Event("change"));
      }
    }
    const currentPageOptions = document.getElementById(id + "pagenames");
    const currentPageSelectedTrackingPoints =
      currentPageOptions.querySelectorAll('input[type="checkbox"]');
    let selectedTrackingPoints = [];

    currentPageSelectedTrackingPoints.forEach((trackingPoint) => {
      if (trackingPoint.checked && trackingPoint.id != "dcoselection")
        selectedTrackingPoints.push(trackingPoint.value);
    });
    window.selectedTrackingPoints = selectedTrackingPoints;

    if (
      window.selectedTrackingPoints.length > 0 ||
      window.dcoTemplateSelected
    ) {
      generateCodesButton.disabled = false;
    } else {
      generateCodesButton.disabled = true;
    }
  } else {
    window.selectedTrackingPoints = [];
  }

  const selectedTypeElement = document.getElementById(id);

  selectedTypeElement.classList.add("selected");

  for (const websiteType of allWebsiteTypes) {
    if (websiteType.id != id) websiteType.classList.remove("selected");
  }

  const correctPagenames = document.querySelector("." + id + "-pagenames");

  if (window.selectedTypeID != id) {
    generateCodesButton.hidden = false;
    window.selectedTypeID = id;
    for (const trackingPoints of trackingPointsContainer) {
      if (!trackingPoints.className.includes(id)) trackingPoints.hidden = true;
    }
    correctPagenames.hidden = false;
  } else {
    generateCodesButton.hidden = !generateCodesButton.hidden;
    correctPagenames.hidden = !correctPagenames.hidden;
  }
}

for (const pageCheckbox of pageCheckboxes) {
  if (pageCheckbox.value != "dcoselection") {
    pageCheckbox.onchange = () => {
      if (pageCheckbox.checked) {
        window.selectedTrackingPoints.push(pageCheckbox.value);
      } else {
        const index = window.selectedTrackingPoints.indexOf(pageCheckbox.value);
        window.selectedTrackingPoints.splice(index, 1);
        if (!window.selectedTrackingPoints.length > 0) {
          generateCodesButton.disabled = true;
        }
      }
      if (
        window.selectedTrackingPoints.length > 0 ||
        window.dcoTemplateSelected
      ) {
        console.log("enable button");
        generateCodesButton.disabled = false;
      } else {
        console.log("disable button");
        generateCodesButton.disabled = true;
      }
    };
  }
}

dcoTemplateCheckbox.onchange = () => {
  window.dcoTemplateSelected = dcoTemplateCheckbox.checked;
  const ecommercePageNamesContainer =
    document.getElementById("ecommercepagenames");
  const ecommerceTrackingPoints =
    ecommercePageNamesContainer.querySelectorAll(".page-option");
  if (dcoTemplateCheckbox.checked) {
    ecommerceTrackingPoints.forEach((option) => {
      option.childNodes[1].disabled = true;
    });
  } else {
    ecommerceTrackingPoints.forEach(
      (option) => (option.childNodes[1].disabled = false)
    );
  }

  if (window.selectedTrackingPoints.length > 0 || window.dcoTemplateSelected) {
    generateCodesButton.disabled = false;
  } else {
    generateCodesButton.disabled = true;
  }
};

allWebsiteTypes.forEach((type) => {
  type.onclick = (e) => {
    showPagenamesCheckboxList(e.target.id);
  };
});
// casinoTypeSelectionElement.onclick = (e) =>
//   showPagenamesCheckboxList(e.target.id);
// ecommerceTypeSelectionElement.onclick = (e) =>
//   showPagenamesCheckboxList(e.target.id);

const textarea = document.getElementById("pastescript");
const messageElement = document.getElementById("textarea-message");
textarea.oninput = (e) => {
  let pastedValue = e.target.value;
  setTimeout(() => {
    if (pastedValue.match(/pm:\s*([0-9]+)/i)) {
      const trackingID = pastedValue.match(/pm:\s*([0-9]+)/i)[1];
      const trackingDomain = pastedValue
        .split("HttpHost:")[1]
        .split(",")[0]
        .replaceAll("'", "");
      console.log(trackingDomain);
      window.trackingID = trackingID;
      window.trackingDomain = trackingDomain.trim();
      messageElement.innerHTML = `Tracking Setup Id <span class="tracking-values">${trackingID}</span> and Tracking Domain <span class="tracking-values">'${trackingDomain}'</span> successfully captured`;
      messageElement.classList.remove("error-message");
      messageElement.classList.add("success-message");
      textarea.parentNode.replaceChild(messageElement, textarea);
      websiteTypesContainer.hidden = false;
    } else {
      messageElement.innerText = `Did not capture values. Make sure to copy a big portion of the code in the platform.`;
      var textareaContainer = document.getElementById("pastescript").parentNode;
      textareaContainer.appendChild(messageElement);
      e.target.value = "";
    }
  }, 500);
};
let customScriptsSelectedScript = "";
const customScriptSelection = document.getElementById("customscripts");

const customScriptsDetailsContainer = document.querySelector(
  ".custom-scripts-details-container"
);

customScriptSelection.onchange = (e) => {
  customScriptsSelectedScript = e.target.value;
  if (customScriptsSelectedScript !== "") {
    customScriptsDetailsContainer
      .querySelectorAll(".custom-script-details")
      .forEach((template) => {
        if (
          Array.from(template.classList).includes(customScriptsSelectedScript)
        )
          template.hidden = false;
        else template.hidden = true;
      });
  }
};
const scriptsUIContainer = document.getElementById("scripts");

const customTpNameInputs = document.querySelectorAll(".custom-name");
customTpNameInputs.forEach((input) => {
  input.onchange = () =>
    (document.querySelector("." + input.id).value = input.value);
});

const downloadButtons = "";
downloadButtons.onclick = () => {
  if (window.selectedTypeID == "custom") {
    if (customScriptsSelectedScript != "") {
      if (customScriptsSelectedScript == "aftertime") {
        const seconds = document.getElementById("aftertime-seconds").value;
        const pagename = document.getElementById("aftertime-tpname").value;

        const trackingscript = `<!-- Adform Tracking Code BEGIN -->
<script type="text/javascript">
  setTimeout(()=> {
window._adftrack = Array.isArray(window._adftrack) ? window._adftrack : (window._adftrack ? [window._adftrack] : []);
    window._adftrack.push({
        HttpHost: '${window.trackingDomain}',
        pm: ${window.trackingID},
        divider: encodeURIComponent('|'),
        pagename: encodeURIComponent('${pagename}')
    });
    (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://s2.adform.net/banners/scripts/st/trackpoint-async.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();
  }, ${seconds} * 1000)
</script>
 <!-- Adform Tracking Code END -->`;
        const link = document.createElement("a");

        link.href = "data:text/plain;charset=utf-8," + trackingscript;

        link.download = pagename + ".txt";
        link.click();
      }
    }
  }

  // Loop through the array and generate and initiate download for each element
  window.selectedTrackingPoints.forEach((pagename) => {
    // Create a new <a> element
    const link = document.createElement("a");

    // Set the href attribute with the text content
    link.href =
      "data:text/plain;charset=utf-8," +
      `<!-- Adform Tracking Code BEGIN -->
<script type="text/javascript">
    window._adftrack = Array.isArray(window._adftrack) ? window._adftrack : (window._adftrack ? [window._adftrack] : []);
    window._adftrack.push({
        HttpHost: '${window.trackingDomain}',
        pm: ${window.trackingID},
        divider: encodeURIComponent('|'),
        pagename: encodeURIComponent('${pagename}')
    });
    (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://s2.adform.net/banners/scripts/st/trackpoint-async.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();

</script>
<noscript>
    <p style="margin:0;padding:0;border:0;">
        <img src="https://${trackingDomain}/Serving/TrackPoint/?pm=${trackingID}&ADFPageName=${encodeURIComponent(
        pagename
      )}&ADFdivider=|" width="1" height="1" alt="" />
    </p>
</noscript>
<!-- Adform Tracking Code END -->`;

    // Set the download attribute with the filename
    link.download = pagename + ".txt";

    // Programmatically click the link to initiate the download
    link.click();
  });
};

function generateTrackingScripts() {
  scriptsUIContainer.innerHTML = "";
  const scriptsNodeList = [];
  window.selectedTrackingPoints.forEach((trackingPointName) => {
    const divParent = document.createElement("div");
    const trackingPointText = document.createElement("div");
    trackingPointText.innerHTML = `<p>Tracking Point <span class="bold">${trackingPointName}</span>:`;
    const trackingScriptContainer = document.createElement("div");
    trackingScriptContainer.className = "scripts-and-vars";
    const pre = document.createElement("pre");
    pre.className = "language-js hljs javascript code-snippet";
    const code = document.createElement("code");
    const tpClassName = trackingPointName.replaceAll(" ", "");
    window.orderLevelVars[tpClassName] = [];
    window.productLevelVars[tpClassName] = [];
    let orderVars = window.orderLevelVars[tpClassName];
    let productVars = window.productLevelVars[tpClassName];
    code.className = `${tpClassName} language-js`;
    code.innerHTML = `&#x3C;!-- Adform Tracking Code BEGIN --&#x3E;
&#x3C;script type=&#x22;text/javascript&#x22;&#x3E;
    window._adftrack = Array.isArray(window._adftrack) ? window._adftrack : (window._adftrack ? [window._adftrack] : [])
    window._adftrack.push({
        HttpHost: '${window.trackingDomain}',
        pm: ${window.trackingID},
        divider: encodeURIComponent('|'),
        pagename: encodeURIComponent('${trackingPointName}')
        });
    (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://s2.adform.net/banners/scripts/st/trackpoint-async.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();
&#x3C;/script&#x3E;
&#x3C;noscript&#x3E;
    &#x3C;p style="margin:0;padding:0;border:0;">
        &#x3C;img src="https://${
          window.trackingDomain
        }/Serving/TrackPoint/?pm=${
      window.trackingID
    }&ADFPageName=${encodeURIComponent(
      trackingPointName
    )}&ADFdivider=|" width="1" height="1" alt="" />
    &#x3C;/p&#x3E;
&#x3C;/noscript&#x3E;
&#x3C;!-- Adform Tracking Code END --&#x3E;`;

    pre.appendChild(code);
    trackingScriptContainer.appendChild(pre);

    const variablesContainer = document.createElement("div");
    variablesContainer.className = "variables- " + tpClassName;
    variablesContainer.innerHTML = `Variables
        <br />
        <br />
        <input type="checkbox" value="sales" id="sales" data-level="order" />
        <label for="sales">Sales (number)</label>
        <br />
        <input
          type="checkbox"
          value="orderid"
          id="orderid"
          data-level="order"
        />
        <label for="orderid">Order ID</label>
        <br />
        <br />
        <div>Product variables:</div>
        <br />
        <input
          type="checkbox"
          value="categoryname"
          id="categoryname"
          data-level="product"
        />
        <label for="categoryname">Category Name (text)</label>
        <br />
        <input
          type="checkbox"
          value="categoryid"
          id="categoryid"
          data-level="product"
        />
        <label for="categoryid">Category ID (text)</label>
        <br />
        <input
          type="checkbox"
          value="productname"
          id="productname"
          data-level="product"
        />
        <label for="productname">Product Name (text)</label>
        <br />
        <input
          type="checkbox"
          value="productid"
          id="productid"
          data-level="product"
        />
        <label for="salproductides">Product ID(text)</label>
        <br />
        <input
          type="checkbox"
          value="weight"
          id="weight"
          data-level="product"
        />
        <label for="weight">Weight (number)</label>
        <br />
        <input type="checkbox" value="step" id="step" data-level="product" />
        <label for="step">Step (number)</label>
        <br />
        <input
          type="checkbox"
          value="productcount"
          id="productcount"
          data-level="product"
        />
        <label for="productcount">Product Count (number)</label>
        <br />
        <input
          type="checkbox"
          value="productsales"
          id="productsales"
          data-level="product"
        />
        <label for="productsales">Product Sales (number)</label>
        <br />
        <input
          type="checkbox"
          value="productcount"
          id="productcount"
          data-level="product"
        />
        <label for="productcount">Product Count (number)</label>
        <br />
        <br />
      <div>Custom variables:</div>
		<br />
      <input
          type="checkbox"
          value="basketsize"
          id="basketsize"
          data-level="order"
        />
        <label for="basketsize">Basket Size (number)</label>
          <br />
      <input
          type="checkbox"
          value="country"
          id="country"
          data-level="order"
        />
        <label for="country">Country (text)</label>
          <br />
      <input
          type="checkbox"
          value="currency"
          id="currency"
          data-level="order"
        />
        <label for="currency">Currency (text)</label>
          <br />
      <br />`;
    trackingScriptContainer.appendChild(variablesContainer);
    const downloadScriptContainer = document.createElement("div");
    downloadScriptContainer.className = "download-script-container";
    const downloadScriptButton = document.createElement("a");
    downloadScriptButton.className = "button button-primary";
    downloadScriptButton.innerText = "Download Script";

    downloadScriptButton.onclick = () => {
      downloadScriptButton.href =
        "data:text/plain;charset=utf-8," +
        document.querySelector("." + tpClassName).innerText;
      downloadScriptButton.download = trackingPointName + ".txt";
    };
    // const emailScriptButton = document.createElement("a");
    // emailScriptButton.className = "button button-primary";
    // emailScriptButton.innerText = "Email Script";
    // emailScriptButton.onclick = () => {
    //   window.open(
    //     `mailto:@example.com?subject=Adform Tracking script - ${trackingPointName}&body=` +
    //       document.querySelector("." + tpClassName).innerText
    //   );
    // };
    downloadScriptContainer.appendChild(downloadScriptButton);
    // downloadScriptContainer.appendChild(emailScriptButton);
    divParent.appendChild(trackingPointText);
    divParent.appendChild(trackingScriptContainer);
    divParent.appendChild(downloadScriptContainer);

    scriptsNodeList.push(divParent);
    window.orderLevelVars[tpClassName] = [];
    window.productLevelVars[tpClassName] = [];
    let variablesContainerElements;
    setTimeout(() => {
      variablesContainerElements = variablesContainer.childNodes;

      levelVarsSelectElements = variablesContainer.querySelectorAll("select");

      levelVarsSelectElements.forEach((selection) => {
        const variableElementId = selection.id.split("data-level-")[1];
        const variableCheckbox = document.getElementById(variableElementId);
        selection.onchange = () => {
          const dataSetAfterChange = selection.value.toLowerCase();

          variableCheckbox.dataset.level = dataSetAfterChange;

          if (variableCheckbox.checked) {
            if (dataSetAfterChange === "product") {
              const elementIndex = orderVars.indexOf(variableCheckbox.value);
              orderVars.splice(elementIndex, 1);
              productVars.push(variableCheckbox.value);
            } else {
              const elementIndex = productVars.indexOf(variableCheckbox.value);
              productVars.splice(elementIndex, 1);
              orderVars.push(variableCheckbox.value);
            }
          }
          renderDOM();
        };
      });

      variablesContainerElements.forEach((element) => {
        if (element.nodeName === "INPUT") {
          if (window.dcoTemplateSelected) {
            if (element.value === "productid" || element.value === "step") {
              productVars.push(element.value);
              element.checked = true;
            }
          }
          renderDOM();
          element.onchange = () => {
            if (element.checked) {
              if (element.dataset.level === "order") {
                orderVars.push(element.value);
              } else {
                productVars.push(element.value);
              }
            } else {
              if (element.dataset.level === "order") {
                const elementIndex = orderVars.indexOf(element.value);
                orderVars.splice(elementIndex, 1);
              } else {
                const elementIndex = productVars.indexOf(element.value);
                productVars.splice(elementIndex, 1);
              }
            }

            renderDOM();
          };
        }
      });
    }, 0);
    function renderDOM() {
      if (orderVars.length > 0 || productVars.length > 0) {
        //If only order level vars are selected
        if (orderVars.length > 0 && productVars.length === 0) {
          let variablesString = "";
          for (var key of orderVars) {
            const index = orderVars.indexOf(key);
            if (index < orderVars.length - 1) {
              variablesString =
                variablesString +
                `${key}: '&#x3C;insert ${key} value here&#x3E;',` +
                "\n" +
                "          ";
            } else {
              variablesString =
                variablesString +
                `${key}: '&#x3C;insert ${key} value here&#x3E;'`;
            }
          }
          document.querySelector(
            `.${tpClassName}`
          ).innerHTML = `&#x3C;!-- Adform Tracking Code BEGIN --&#x3E;
&#x3C;script type=&#x22;text/javascript&#x22;&#x3E;
    window._adftrack = Array.isArray(window._adftrack) ? window._adftrack : (window._adftrack ? [window._adftrack] : [])
    window._adftrack.push({
        HttpHost: '${window.trackingDomain}',
        pm: ${window.trackingID},
        divider: encodeURIComponent('|'),
        pagename: encodeURIComponent('${trackingPointName}'),
        order: {
          ${variablesString}
        }
        });
    (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://s2.adform.net/banners/scripts/st/trackpoint-async.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();
&#x3C;/script&#x3E;
&#x3C;noscript&#x3E;
    &#x3C;p style="margin:0;padding:0;border:0;">
        &#x3C;img src="https://${
          window.trackingDomain
        }/Serving/TrackPoint/?pm=${
            window.trackingID
          }&ADFPageName=${encodeURIComponent(
            trackingPointName
          )}&ADFdivider=|" width="1" height="1" alt="" />
    &#x3C;/p&#x3E;
&#x3C;/noscript&#x3E;
&#x3C;!-- Adform Tracking Code END --&#x3E;`;
        }
        Prism.highlightAll();
      }
      ////If only product level vars are selected
      if (orderVars.length === 0 && productVars.length > 0) {
        let variablesString = "";
        productVars.sort();
        for (var key of productVars) {
          const index = productVars.indexOf(key);
          if (index < productVars.length - 1) {
            variablesString =
              variablesString +
              `${key}:  ${
                key === "step"
                  ? window.dcoTemplateSelected
                    ? `${stepValue[tpClassName]},`
                    : `'&#x3C;insert ${key} value here&#x3E;',`
                  : `'&#x3C;insert ${key} value here&#x3E;',`
              } ` +
              "\n" +
              "              ";
          } else {
            variablesString =
              variablesString +
              `${key}:  ${
                key === "step"
                  ? window.dcoTemplateSelected
                    ? stepValue[tpClassName]
                    : `'&#x3C;insert ${key} value here&#x3E;'`
                  : `'&#x3C;insert ${key} value here&#x3E;'`
              } `;
          }
        }
        document.querySelector(
          `.${tpClassName}`
        ).innerHTML = `&#x3C;!-- Adform Tracking Code BEGIN --&#x3E;
&#x3C;script type=&#x22;text/javascript&#x22;&#x3E;
    window._adftrack = Array.isArray(window._adftrack) ? window._adftrack : (window._adftrack ? [window._adftrack] : [])
    window._adftrack.push({
        HttpHost: '${window.trackingDomain}',
        pm: ${window.trackingID},
        divider: encodeURIComponent('|'),
        pagename: encodeURIComponent('${trackingPointName}'),
        order: {
          itms: [
            {
              ${variablesString}
            }
          ]     
        }
        });
    (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://s2.adform.net/banners/scripts/st/trackpoint-async.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();
&#x3C;/script&#x3E;
&#x3C;noscript&#x3E;
    &#x3C;p style="margin:0;padding:0;border:0;">
        &#x3C;img src="https://${
          window.trackingDomain
        }/Serving/TrackPoint/?pm=${
          window.trackingID
        }&ADFPageName=${encodeURIComponent(
          trackingPointName
        )}&ADFdivider=|" width="1" height="1" alt="" />
    &#x3C;/p&#x3E;
&#x3C;/noscript&#x3E;
&#x3C;!-- Adform Tracking Code END --&#x3E;`;
        Prism.highlightAll();
      }
      //If order & product level vars are selected
      if (orderVars.length > 0 && productVars.length > 0) {
        let orderVariablesString = "";
        orderVars.sort();
        for (var key of orderVars) {
          const index = orderVars.indexOf(key);
          if (index < orderVars.length - 1) {
            orderVariablesString =
              orderVariablesString +
              `${key}: '&#x3C;insert ${key} value here&#x3E;',` +
              "\n" +
              "          ";
          } else {
            orderVariablesString =
              orderVariablesString +
              `${key}: '&#x3C;insert ${key} value here&#x3E;',`;
          }
        }

        let productVariablesString = "";
        productVars.sort();
        for (var key of productVars) {
          const index = productVars.indexOf(key);
          if (index < productVars.length - 1) {
            productVariablesString =
              productVariablesString +
              `${key}:  ${
                key === "step"
                  ? window.dcoTemplateSelected
                    ? `${stepValue[tpClassName]},`
                    : `'&#x3C;insert ${key} value here&#x3E;',`
                  : `'&#x3C;insert ${key} value here&#x3E;',`
              } ` +
              "\n" +
              "              ";
          } else {
            productVariablesString =
              productVariablesString +
              `${key}:  ${
                key === "step"
                  ? window.dcoTemplateSelected
                    ? stepValue[tpClassName]
                    : `'&#x3C;insert ${key} value here&#x3E;'`
                  : `'&#x3C;insert ${key} value here&#x3E;'`
              } `;
          }
        }
        document.querySelector(
          `.${tpClassName}`
        ).innerHTML = `&#x3C;!-- Adform Tracking Code BEGIN --&#x3E;
&#x3C;script type=&#x22;text/javascript&#x22;&#x3E;
    window._adftrack = Array.isArray(window._adftrack) ? window._adftrack : (window._adftrack ? [window._adftrack] : [])
    window._adftrack.push({
        HttpHost: '${window.trackingDomain}',
        pm: ${window.trackingID},
        divider: encodeURIComponent('|'),
        pagename: encodeURIComponent('${trackingPointName}'),
        order: {
          ${orderVariablesString}
          itms: [
            {
              ${productVariablesString}
            }
          ]     
        }
        });
    (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://s2.adform.net/banners/scripts/st/trackpoint-async.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();
&#x3C;/script&#x3E;
&#x3C;noscript&#x3E;
    &#x3C;p style="margin:0;padding:0;border:0;">
        &#x3C;img src="https://${
          window.trackingDomain
        }/Serving/TrackPoint/?pm=${
          window.trackingID
        }&ADFPageName=${encodeURIComponent(
          trackingPointName
        )}&ADFdivider=|" width="1" height="1" alt="" />
    &#x3C;/p&#x3E;
&#x3C;/noscript&#x3E;
&#x3C;!-- Adform Tracking Code END --&#x3E;`;
        Prism.highlightAll();
      }
      //if no wars are selected
      if (orderVars.length === 0 && productVars.length === 0) {
        document.querySelector(
          `.${tpClassName}`
        ).innerHTML = `&#x3C;!-- Adform Tracking Code BEGIN --&#x3E;
&#x3C;script type=&#x22;text/javascript&#x22;&#x3E;
    window._adftrack = Array.isArray(window._adftrack) ? window._adftrack : (window._adftrack ? [window._adftrack] : [])
    window._adftrack.push({
        HttpHost: '${window.trackingDomain}',
        pm: ${window.trackingID},
        divider: encodeURIComponent('|'),
        pagename: encodeURIComponent('${trackingPointName}')
        });
    (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://s2.adform.net/banners/scripts/st/trackpoint-async.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();
&#x3C;/script&#x3E;
&#x3C;noscript&#x3E;
    &#x3C;p style="margin:0;padding:0;border:0;">
        &#x3C;img src="https://${
          window.trackingDomain
        }/Serving/TrackPoint/?pm=${
          window.trackingID
        }&ADFPageName=${encodeURIComponent(
          trackingPointName
        )}&ADFdivider=|" width="1" height="1" alt="" />
    &#x3C;/p&#x3E;
&#x3C;/noscript&#x3E;
&#x3C;!-- Adform Tracking Code END --&#x3E;`;
        Prism.highlightAll();
      }
    }
  });
  scriptsNodeList.forEach((node) => scriptsUIContainer.appendChild(node));
}

function generateTrackingScriptsAfterTime(seconds) {
  scriptsUIContainer.innerHTML = "";
  const scriptsNodeList = [];
  window.selectedTrackingPoints.forEach((trackingPointName) => {
    const divParent = document.createElement("div");
    const trackingPointText = document.createElement("div");
    trackingPointText.innerHTML = `<p>Tracking Point <span class="bold">${trackingPointName}</span>:`;
    const trackingScriptContainer = document.createElement("div");
    trackingScriptContainer.className = "scripts-and-vars";
    const pre = document.createElement("pre");
    pre.className = "language-js hljs javascript code-snippet";
    const code = document.createElement("code");
    const tpClassName = trackingPointName.replaceAll(" ", "");
    window.orderLevelVars[tpClassName] = [];
    window.productLevelVars[tpClassName] = [];
    // let orderVars = window.orderLevelVars[tpClassName];
    // let productVars = window.productLevelVars[tpClassName];
    code.className = `${tpClassName} language-js`;
    code.innerHTML = `&#x3C;!-- Adform Tracking Code BEGIN --&#x3E;
&#x3C;script type=&#x22;text/javascript&#x22;&#x3E;
    setTimeout(()=> {
    window._adftrack = Array.isArray(window._adftrack) ? window._adftrack : (window._adftrack ? [window._adftrack] : [])
    window._adftrack.push({
        HttpHost: '${window.trackingDomain}',
        pm: ${window.trackingID},
        divider: encodeURIComponent('|'),
        pagename: encodeURIComponent('${trackingPointName}')
        });
    (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://s2.adform.net/banners/scripts/st/trackpoint-async.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();
    },  ${seconds * 1000})
    &#x3C;/script&#x3E;
&#x3C;!-- Adform Tracking Code END --&#x3E;`;

    pre.appendChild(code);
    trackingScriptContainer.appendChild(pre);
    const downloadScriptContainer = document.createElement("div");
    downloadScriptContainer.className = "download-script-container";
    const downloadScriptButton = document.createElement("a");
    downloadScriptButton.className = "button button-primary";
    downloadScriptButton.innerText = "Download Script";

    downloadScriptButton.onclick = () => {
      downloadScriptButton.href =
        "data:text/plain;charset=utf-8," +
        document.querySelector("." + tpClassName).innerText;
      downloadScriptButton.download = trackingPointName + ".txt";
    };
    downloadScriptContainer.appendChild(downloadScriptButton);
    // downloadScriptContainer.appendChild(emailScriptButton);
    divParent.appendChild(trackingPointText);
    divParent.appendChild(trackingScriptContainer);
    divParent.appendChild(downloadScriptContainer);

    scriptsNodeList.push(divParent);
  });
  scriptsNodeList.forEach((node) => scriptsUIContainer.appendChild(node));
}

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
            variablesString + `${key}: '&#x3C;insert ${key} value here&#x3E;'`;
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
    // Prism.highlightAll();
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
        HttpHost: '${trackingDomain}',
        pm: ${trackingSetupID},
        divider: encodeURIComponent('|'),
        pagename: encodeURIComponent('${pageName}'),
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
        &#x3C;img src="https://${trackingDomain}/Serving/TrackPoint/?pm=${trackingSetupID}&ADFPageName=${encodeURIComponent(
      pageName
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
        HttpHost: '${trackingDomain}',
        pm: ${trackingSetupID},
        divider: encodeURIComponent('|'),
        pagename: encodeURIComponent('${pageName}'),
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
        &#x3C;img src="https://${trackingDomain}/Serving/TrackPoint/?pm=${trackingSetupID}&ADFPageName=${encodeURIComponent(
      pageName
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
        HttpHost: '${trackingDomain}',
        pm: ${trackingSetupID},
        divider: encodeURIComponent('|'),
        pagename: encodeURIComponent('${pageName}')
        });
    (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://s2.adform.net/banners/scripts/st/trackpoint-async.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();
&#x3C;/script&#x3E;
&#x3C;noscript&#x3E;
    &#x3C;p style="margin:0;padding:0;border:0;">
        &#x3C;img src="https://${trackingDomain}/Serving/TrackPoint/?pm=${trackingSetupID}&ADFPageName=${encodeURIComponent(
      pageName
    )}&ADFdivider=|" width="1" height="1" alt="" />
    &#x3C;/p&#x3E;
&#x3C;/noscript&#x3E;
&#x3C;!-- Adform Tracking Code END --&#x3E;`;
    Prism.highlightAll();
  }
}

(function() {
"use strict";

function setupTab(tab) {
  if (
    !tab ||
    /^chrome:\/\//.test(tab.url) ||
    /^https?:\/\/chrome\.google\.com\/webstore/.test(tab.url)
  ) {
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["setup.js"],
    world: "MAIN",
  });
}

chrome.tabs.query({}, (tabs) => {
  tabs.forEach(tab => setupTab(tab));
});
chrome.tabs.onUpdated.addListener(tabId => {
  chrome.tabs.get(tabId, tab => setupTab(tab));
});

})();

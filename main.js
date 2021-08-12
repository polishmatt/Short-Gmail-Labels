(function() {
"use strict";

var LABEL_CLASSES = ['av', 'hN'];

function cleanLabel(element) {
  // Only look for slashes outside of HTML which is used for emoji
  for(
    var slashIndex = element.innerHTML.lastIndexOf('/');
    slashIndex !== -1;
    slashIndex = element.innerHTML.lastIndexOf('/', slashIndex - 1)
  ) {
    var leftOpenIndex = element.innerHTML.lastIndexOf('<', slashIndex);
    var leftCloseIndex = element.innerHTML.lastIndexOf('>', slashIndex);
    var rightOpenIndex = element.innerHTML.indexOf('<', slashIndex);
    var rightCloseIndex = element.innerHTML.indexOf('>', slashIndex);
    if (
      leftOpenIndex === -1 ||
      rightCloseIndex === -1 ||
      leftCloseIndex !== -1 && leftCloseIndex > leftOpenIndex ||
      rightOpenIndex !== -1 && rightOpenIndex < rightCloseIndex
    ) {
      break;
    }
  }

  if (slashIndex !== -1) {
    element.innerHTML = element.innerHTML.substring(slashIndex + 1);
  }
}

function cleanLabels(element) {
  if (element.getElementsByClassName) {
    LABEL_CLASSES.forEach(function(className) {
      [].slice.call(element.getElementsByClassName(className)).forEach(function(element) {
        cleanLabel(element);
      });
    });
  }
}

cleanLabels(document.body);

// This is broad but plugging in somewhere more specific 
//   is much more likely to break due to changes
document.body.addEventListener('DOMNodeInserted', function(event) {
  cleanLabels(event.target);
});

})();

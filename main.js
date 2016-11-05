(function() {
"use strict";

var LABEL_CLASSES = ['av', 'hN'];

function cleanLabel(element) {
  if (element.innerHTML && element.innerHTML.indexOf('/') != -1) {
    element.innerHTML = element.innerHTML.substring(element.innerHTML.lastIndexOf('/') + 1);
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

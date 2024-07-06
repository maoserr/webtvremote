import browser from "webextension-polyfill";

function getFocusable(doc: Document): HTMLElement[] {
  let focussableElements =
    'a:not([disabled]), button:not([disabled]), ' +
    'input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
  let allEls = doc.querySelectorAll(focussableElements)
  console.log(doc.querySelectorAll(focussableElements))
  return Array.prototype.filter.call(allEls,
    function (element) {
      return element.offsetWidth > 0 || element.offsetHeight > 0 || element === doc.activeElement
    })
}

export function getSelEls(doc: Document) {
  let focussable = getFocusable(doc)
  let index = doc.activeElement === null ? -1 : focussable.indexOf(doc.activeElement as HTMLElement);
  if (index + 1 == focussable.length) {
    focussable[0].focus()
  } else {
    focussable[index + 1].focus();
  }
}

import browser from "webextension-polyfill";

function getFocusable(doc: Document, sels: string[]): HTMLElement[] {
  // let focussableElements =
  //   'a:not([disabled]), button:not([disabled]), ' +
  //   'input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
  // let allEls = doc.querySelectorAll(focussableElements)
  let allEls: HTMLElement[] = []
  for (let s of sels) {
    let currels = Array.prototype.filter.call(doc.querySelectorAll(s),
      function (element) {
        return element.offsetWidth > 0 || element.offsetHeight > 0 || element === doc.activeElement
      })
    allEls = allEls.concat(currels)
  }
  return allEls
}

export function getSelEls(doc: Document, direction: string) {
  let twitch = [
    'button[data-a-target="player-play-pause-button"]',
    'button[data-a-target="player-fullscreen-button"]',
    'button[data-a-target="side-nav-arrow"]',
    'div.tw-hover-accent-effect a',
    'button[data-a-target="right-column__toggle-collapse-btn"]',
    'a.side-nav-card',
  ]
  let focussable = getFocusable(doc, twitch)
  let index = doc.activeElement === null ? -1 : focussable.indexOf(doc.activeElement as HTMLElement);
  if (direction == "down") {
    if (index + 1 == focussable.length) {
      focussable[0].focus()
    } else {
      focussable[index + 1].focus();
    }
  } else {
    if (index == 0) {
      focussable[focussable.length - 1].focus()
    } else {
      focussable[index - 1].focus();
    }
  }
}

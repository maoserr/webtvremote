import * as defaults from './defaults'

function getFocusable(doc: Document, sels: string[]): HTMLElement[] {
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

function getSelectorFromDoc(doc: Document, win: Window):string[]{
  if (window.location.href.startsWith("https://www.twitch.tv")){
    return defaults.twitch
  } else {
    return defaults.all
  }
}

export function getSelEls(doc: Document,win: Window, direction: string) {
  const sels = getSelectorFromDoc(doc, win)
  let focussable = getFocusable(doc, sels)
  let index = doc.activeElement === null ? -1 : focussable.indexOf(doc.activeElement as HTMLElement);
  try {
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
  } catch (e) {
    console.log(e)
  }
}

import {getDefinitions} from "./useropts";
import {Keybind, Selectables, SelectorDef, WebPageDef} from "./datatypes";
import browser from "webextension-polyfill";

let last_grp = 0

/**
 * Identify current web page
 * @param doc
 * @param win
 */
async function idWebpage(doc: Document, win: Window): Promise<WebPageDef> {
  let defs = await getDefinitions()
  for (let w of defs) {
    for (let f of w.filts) {
      if (f.hosts.filter(x => RegExp(x).exec(win.location.host)).length == 0) {
        continue
      }
      if (f.hrefs && f.hrefs.filter(x => RegExp(x).exec(win.location.href)).length == 0) {
        continue
      }
      if (f.selectors && f.selectors.filter(x => doc.querySelector(x)).length == 0) {
        continue
      }
      return w
    }
  }
  return defs[defs.length - 1]
}

/**
 * Get a list of selectable elements
 * @param doc
 * @param sels
 */
function getSelectables(doc: Document, sels: SelectorDef[]): Selectables[] {
  let allEls: Selectables[] = []
  for (let d of sels) {
    let grpEls = d.selectors.flatMap(
      s => doc.querySelectorAll(s))
    let grpFilted: HTMLElement[] = []
    for (let els of grpEls) {
      let currels = Array.prototype.filter.call(els,
        function (element) {
          return element.offsetWidth > 0 || element.offsetHeight > 0 || element === doc.activeElement
        })
      grpFilted = grpFilted.concat(currels)
    }
    grpFilted = [...new Set(grpFilted)]
    if (grpFilted.length > 0) {
      allEls.push(
        {
          name: d.name,
          elements: grpFilted
        }
      )
    }
  }
  return allEls
}

async function procFocusChange(keybind: Keybind, doc: Document, win: Window) {
  const page = await idWebpage(doc, win)
  let selGrps = getSelectables(doc, page.seldefs)
  let grpIndex = 0
  let elIndex = -1
  if (doc.activeElement !== null) {
    let grpIdices = selGrps.map(s =>
      s.elements.indexOf(doc.activeElement as HTMLElement))
    let grpIdx = grpIdices.filter(i => i > -1)
    if (grpIdx.length > 0) {
      if ((grpIdx.length > 1) && (grpIdices[last_grp] > -1)) {
        grpIndex = grpIdices[last_grp]
      } else {
        grpIndex = grpIdices.indexOf(grpIdx[0])
      }
      elIndex = grpIdx[0]
    }
  }

  let focusEl: HTMLElement | undefined
  let cycledGrp = 0
  let cycledEl = 0
  switch (keybind) {
    case Keybind.next:
      if (elIndex + 1 == selGrps[grpIndex].elements.length) {
        if (grpIndex + 1 == selGrps.length) {
          console.debug("Cycled start group.")
        } else {
          cycledGrp = grpIndex + 1
          console.debug("Cycled next group.")
        }
      } else {
        cycledEl = elIndex + 1
        cycledGrp = grpIndex
        console.debug("Normal next")
      }
      break;
    case Keybind.prev:
      if (elIndex == 0) {
        if (grpIndex == 0) {
          cycledGrp = selGrps.length - 1
          console.debug("Cycle end group.")
        } else {
          cycledGrp = grpIndex - 1
          console.debug("Cycle prev group")
        }
        cycledEl = selGrps[cycledGrp].elements.length - 1
      } else {
        cycledGrp = grpIndex
        cycledEl = elIndex - 1
        console.debug("Normal prev")
      }
      break;
    case Keybind.grpNext:
      if (grpIndex + 1 == selGrps.length) {
        console.debug("Cycle group start group")
      } else {
        cycledGrp = grpIndex + 1
        console.debug("Cycle group normal next")
      }
      break;
    case Keybind.grpPrev:
      if (grpIndex == 0) {
        cycledGrp = selGrps.length - 1
        console.debug("Cycle group end group")
      } else {
        cycledGrp = grpIndex - 1
        console.debug("Cycle group normal prev")
      }
      break;
  }
  focusEl = selGrps[cycledGrp].elements[cycledEl]
  console.log(focusEl)
  if (focusEl !== undefined) {
    focusEl.focus()
    let def = page.seldefs.filter(s=>selGrps[cycledGrp].name == s.name)[0]
    if (def.scrollIntoView) {
      focusEl.scrollIntoView({
        behavior: "smooth",
        block: def.scrollIntoView, inline: "nearest"
      })
    }
  }
}

export async function procKeyEvent(keybind: Keybind, doc: Document, win: Window) {
  if ([Keybind.next, Keybind.prev, Keybind.grpNext, Keybind.grpPrev].includes(keybind)) {
    return await procFocusChange(keybind, doc, win)
  }

  try {
    switch (keybind) {
      case Keybind.home:
        await browser.runtime.sendMessage({cmd: 'home'})
        break;
    }
  } catch (e) {
    console.log(e)
  }
}

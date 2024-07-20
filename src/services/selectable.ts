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

export async function procKeyEvent(keybind: Keybind, doc: Document, win: Window) {
  const page = await idWebpage(doc, win)
  let selGrps = getSelectables(doc, page.seldefs)
  let grpIndex = 0
  let elIndex = -1
  if (doc.activeElement !== null) {
    let grpIdices = selGrps.map(s => s.elements.indexOf(doc.activeElement as HTMLElement))
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

  try {
    switch (keybind) {
      case Keybind.home:
        await browser.runtime.sendMessage({cmd: 'home'})
        break;
      case Keybind.next:
        if (elIndex + 1 == selGrps[grpIndex].elements.length) {
          if (grpIndex + 1 == selGrps.length) {
            selGrps[0].elements[0].focus()
            last_grp = 0
          } else {
            selGrps[grpIndex + 1].elements[0].focus()
          }
        } else {
          selGrps[grpIndex].elements[elIndex + 1].focus()
        }
        break;
      case Keybind.prev:
        if (elIndex == 0) {
          if (grpIndex == 0) {
            const end_grp = selGrps[selGrps.length - 1]
            end_grp.elements[end_grp.elements.length - 1].focus()
          } else {
            selGrps[grpIndex - 1].elements[selGrps[grpIndex - 1].elements.length - 1].focus()
          }
        } else {
          selGrps[grpIndex].elements[elIndex - 1].focus()
        }
        break;
      case Keybind.grpNext:
        if (grpIndex + 1 == selGrps.length) {
          selGrps[0].elements[0].focus()
        } else {
          selGrps[grpIndex + 1].elements[0].focus()
        }
        break;
      case Keybind.grpPrev:
        if (grpIndex == 0) {
          selGrps[selGrps.length - 1].elements[0].focus()
        } else {
          selGrps[grpIndex - 1].elements[0].focus()
        }
        break;
    }
  } catch (e) {
    console.log(e)
  }
}

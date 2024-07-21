import {procKeyEvent} from "../services/selectable";
import {getKeybinds} from "../services/useropts";

async function setUp() {
  console.log("Loading remote extension...")
  let keybind = await getKeybinds()
  window.addEventListener("keydown",
    (event: KeyboardEvent) => {
      console.log(event.key)
      if (event.key in keybind) {
        event.preventDefault()
        event.stopImmediatePropagation()
        procKeyEvent(keybind[event.key], document, window)
      }
    }, {capture:true});
}

setUp().then()

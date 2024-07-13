import {getSelEls} from "../services/selectable";


console.log("Loading remote extension...")

window.addEventListener("keydown", (event: KeyboardEvent) => {
  // do something
  console.log(event.key)
  if (event.key == 'ArrowDown') {
    event.preventDefault()
    getSelEls(document,window, "down")
  } else if (event.key == 'ArrowUp'){
    event.preventDefault()
    getSelEls(document,window, "up")
  }
});

function getSelEls() {
  let focussableElements =
    'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
  let allEls = document.querySelectorAll(focussableElements)
  console.log(document.querySelectorAll(focussableElements))
  let focussable = Array.prototype.filter.call(allEls,
    function(element) {
      return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
    });
  let index = focussable.indexOf(document.activeElement);
  if (index+1 == focussable.length){
    focussable[0].focus()
  } else {
    focussable[index + 1].focus();
  }
}

console.log("Hello")

window.addEventListener("keydown", (event: KeyboardEvent) => {
  // do something
  console.log(event.key)
  if (event.key == 'ArrowDown') {
    event.preventDefault()
    getSelEls()
  }
});

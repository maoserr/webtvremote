<template>
  <div class="grid" style="width:100%">
    <div class="col-3">
      <a href="https://www.twitch.com/directory/following">Twitch</a>
    </div>
    <div class="col-3">
      <a href="https://www.youtube.com">Youtube</a>
    </div>
    <div class="col-12">
      {{ logs }}
    </div>
  </div>
</template>

<script setup lang="ts">
import 'primeflex/primeflex.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';

import {onMounted, Ref, ref} from "vue";

const logs = ref<string>('')

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

onMounted(async () => {
  window.addEventListener("keydown", (event: KeyboardEvent) => {
    // do something
    logs.value += event.key + "\n"
    if (event.key == 'ArrowDown') {
      event.preventDefault()
      getSelEls()
    }
  });
})

</script>

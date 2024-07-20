<template>
  <h3><img src="images/icon128.png"/>Web TV Remote</h3>
  <ul>
    <li><a href="https://www.twitch.com/directory/following">Twitch</a></li>
    <li><a href="https://www.youtube.com">Youtube</a></li>
    <li><a href="options.html">Options</a></li>
  </ul>
</template>

<script setup lang="ts">
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import {onMounted, Ref, ref} from "vue";
import {procKeyEvent} from "../services/selectable";
import {getKeybinds} from "../services/useropts";

const logs = ref<string>('')

onMounted(async () => {
  let keybind = await getKeybinds()
  window.addEventListener("keydown",
      (event: KeyboardEvent) => {
        console.log(event.key)
        if (event.key in keybind) {
          event.preventDefault()
          procKeyEvent(keybind[event.key], document, window)
        }
      });
})

</script>

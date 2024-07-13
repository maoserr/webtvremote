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
import {getSelEls} from "../services/selectable";

const logs = ref<string>('')

onMounted(async () => {
  window.addEventListener("keydown", (event: KeyboardEvent) => {
    // do something
    logs.value += event.key + "\n"
    if (event.key == 'ArrowDown') {
      event.preventDefault()
      getSelEls(document, window,"down")
    }
  });
})

</script>

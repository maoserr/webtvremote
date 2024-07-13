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
import {getSelEls} from "../services/selectable";

const logs = ref<string>('')

onMounted(async () => {
  window.addEventListener("keydown", (event: KeyboardEvent) => {
    // do something
    logs.value += event.key + "\n"
    if (event.key == 'ArrowDown') {
      event.preventDefault()
      getSelEls(document, "down")
    }
  });
})

</script>

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


</script>

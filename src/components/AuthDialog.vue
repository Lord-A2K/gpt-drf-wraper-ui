<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { ref } from "vue";

const isOpen = ref(false);

</script>
<template>

  <Button icon="pi pi-user" size="small" @click="isOpen = true" />
  <Dialog v-model:visible="isOpen" modal header="Authenticatio" :style="{ width: '25rem' }">
    laskjdfgljk
  </Dialog>
</template>

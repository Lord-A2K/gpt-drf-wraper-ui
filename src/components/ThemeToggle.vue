<script setup lang='ts'>
import { computed, onMounted } from 'vue';
import { useThemeStore } from '../stores/theme';

const themeStore = useThemeStore();

const isDarkMode = computed(() => themeStore.isDarkMode);

onMounted(() => {
  themeStore.checkInitialTheme();
});

const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>

<template>
  <div :class="['pi pi-sun mr-2 animate-fade animate-normal ', isDarkMode ? 'hidden' : '']" style="font-size: 1.2rem">
  </div>
  <div :class="['pi pi-moon mr-2 animate-fade duration-200', isDarkMode ? '' : 'hidden']" style="font-size: 1.2rem">
  </div>
  <Toggle @click="toggleTheme" v-model='isDarkMode' class="rounded-full" />
</template>

<style scoped></style>

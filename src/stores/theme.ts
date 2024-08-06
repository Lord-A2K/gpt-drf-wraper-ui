import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('themeStore', () => {
  const isDarkMode = ref(JSON.parse(localStorage.getItem('isDarkMode') || 'false'));

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    const element = document.querySelector('html');
    if (element) {
      if (isDarkMode.value) {
        element.classList.add('dark');
      } else {
        element.classList.remove('dark');
      }
    }
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode.value));
  };

  const checkInitialTheme = () => {
    const element = document.querySelector('html');
    if (element) {
      if (isDarkMode.value) {
        element.classList.add('dark');
      } else {
        element.classList.remove('dark');
      }
    }
  };

  return {
    isDarkMode,
    toggleTheme,
    checkInitialTheme,
  };
});

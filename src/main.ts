import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { createPinia } from 'pinia';

import Button from "primevue/button"
import SpeedDial from 'primevue/speeddial';
import Card from 'primevue/card';
import ToggleSwitch from 'primevue/toggleswitch';

import Input from './components/Input.vue';

import './style.css'
import 'primeicons/primeicons.css'
import './assets/tailwind.css';
import router from './router';
import App from './App.vue'

const pinia = createPinia();
const app = createApp(App);
app.use(
  PrimeVue,
  {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.dark',
      }
    }
  }
);
app.use(pinia);
app.use(router);
app.component("Button", Button);
app.component("SpeedDial", SpeedDial);
app.component("Card", Card);
app.component("Toggle", ToggleSwitch);
app.component("Input", Input);
app.mount('#app');


// document.documentElement.style.setProperty('--p-toggleswitch-checked-background', '#3498db');

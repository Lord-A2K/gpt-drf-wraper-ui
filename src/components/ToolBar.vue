<script setup lang="ts">
import Toolbar from 'primevue/toolbar';

import { useAuthStore } from '../stores/auth';
import ThemeToggle from './ThemeToggle.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import SpeedDial from 'primevue/speeddial';

const router = useRouter();
const props = defineProps<{
  className: string;
}>();
const authStore = useAuthStore();
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    command: () => router.push('/')
  },
  {
    label: 'Profile',
    icon: 'pi pi-fw pi-user',
    command: () => router.push('/profile')
  },
  {
    label: 'Chat',
    icon: 'pi pi-fw pi-comments',
    command: () => router.push('/chat')
  },
  {
    label: 'Logout',
    icon: 'pi pi-fw pi-sign-out',
    command: async () => {
      await authStore.logout();
      router.push('/');
    }
  }
]);

</script>


<template>
  <div class="w-full flex items-center justify-center absolute top-5 z-50 animate-fade-down">
    <Toolbar :class="['w-full mx-72 rounded-full duration-300', className]">
      <template #start>
        <h2 class="text-2xl font-bold">GPT<span class="font-light animate-pulse">UI</span></h2>
      </template>
      <template #center>
        <Button link as="router-link" to="/">Home</Button>
        <Button link as="router-link" to="/chat"> Chat</Button>

      </template>
      <template #end>

        <ThemeToggle />
        <div class="m-2"></div>
        <Button v-if="!authStore.isAuthenticated()" icon="pi pi-user" size="small" as="router-link" to="/auth" />
      </template>
    </Toolbar>

  </div>
  <div class="absolute z-50 bottom-10 right-5">
    <SpeedDial v-if="authStore.isAuthenticated()" :model="items" direction="up" :transitionDelay="80"
      pt:menuitem="m-2" />
  </div>
</template>


<style scoped></style>

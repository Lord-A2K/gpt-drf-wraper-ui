<script setup lang="ts">
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

import { ref } from 'vue';

const authState = ref('login')
</script>


<template>
  <div v-if="authState == 'login'" class="animate-fade-left">
    <Login />
    <div class="text-center mt-2">
      <Button style="font-size: 0.8rem" link @click="authState = 'register'">Don't have an account? Register
        now!</Button>
    </div>
  </div>
  <div v-if="authState == 'register'" class="animate-fade-right">
    <Register />
    <div class="text-center mt-2">
      <Button style="font-size: 0.8rem" link @click="authState = 'login'">Already have an account? Login now!</Button>
    </div>
  </div>
</template>

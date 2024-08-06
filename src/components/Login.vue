<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { ZodError } from 'zod'; // Import ZodError for specific error handling
import { useRouter } from 'vue-router';

const router = useRouter();
const emailState = ref('');
const pwdState = ref('');
const error = ref<string | null>(null);
const fieldErrors = ref<{ [key: string]: string | null }>({ email: null, password: null });
const authStore = useAuthStore();

const handleLogin = async () => {
  console.log('handleLogin called'); // Debug log
  try {
    error.value = null;
    fieldErrors.value.email = null;
    fieldErrors.value.password = null;
    console.log('Attempting login with:', emailState.value, pwdState.value); // Debug log
    await authStore.login(emailState.value, pwdState.value);
    console.log('Login successful'); // Debug log
    router.push('/profile');
    // Redirect or show a success message
  } catch (err) {
    console.error('Login failed:', err); // Debug log
    if (err instanceof ZodError) {
      err.errors.forEach(e => {
        fieldErrors.value[e.path[0]] = e.message;
      });
    } else {
      error.value = 'Login failed. Please check your credentials.';
    }
  }
};
</script>

<template>
  <Card class="p-5 w-80">
    <template #header>
      <div class="text-center text-3xl font-bold">
        Login
      </div>
    </template>
    <template #content>
      <div class="w-full flex flex-col items-center justify-center gap-3 mt-10">
        <Input :icon="['pi pi-envelope']" v-model="emailState" placeholder="Email"
          :className="{ 'p-invalid': fieldErrors.email }" />
        <Input placeholder="Password" v-model="pwdState" password :className="{ 'p-invalid': fieldErrors.password }" />
      </div>
      <div v-if="error" class="text-red-500 text-center mt-3">{{ error }}</div>
    </template>
    <template #footer>
      <div class="text-center">
        <Button size="small" class="mt-5" label="submit" @click="handleLogin" />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.p-invalid {
  border: 1px solid red;
}
</style>

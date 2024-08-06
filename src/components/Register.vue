<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { ZodError } from 'zod'; // Import ZodError for specific error handling
import { useRouter } from 'vue-router';

const router = useRouter();
const nameState = ref('');
const emailState = ref('');
const pwdState = ref('');
const error = ref<string | null>(null);
const fieldErrors = ref<{ [key: string]: string | null }>({ name: null, email: null, password: null });
const authStore = useAuthStore();

const handleRegister = async () => {
  console.log('handleRegister called'); // Debug log
  try {
    error.value = null;
    fieldErrors.value.email = null;
    fieldErrors.value.password = null;
    fieldErrors.value.name = null;
    console.log('Attempting register with:', nameState.value, emailState.value, pwdState.value); // Debug log
    await authStore.register(emailState.value, nameState.value, pwdState.value);
    console.log('Register successful'); // Debug log
    router.push('/profile');
    // Redirect or show a success message
  } catch (err) {
    console.error('Register failed:', err); // Debug log
    if (err instanceof ZodError) {
      err.errors.forEach(e => {
        fieldErrors.value[e.path[0]] = e.message;
      });
    } else {
      error.value = 'Register failed. Please check your credentials.';
    }
  }
};
</script>

<template>
  <Card class="p-5 w-80">
    <template #header>
      <div class="text-center text-3xl font-bold">
        Register
      </div>
    </template>
    <template #content>
      <div class="w-full flex flex-col items-center justify-center gap-3 mt-10">
        <Input :icon="['pi pi-user']" v-model="nameState" placeholder="Name" />

        <Input :icon="['pi pi-envelope']" v-model="emailState" placeholder="Email"
          :className="{ 'p-invalid': fieldErrors.email }" />

        <Input placeholder="Password" feedback v-model="pwdState" password
          :className="{ 'p-invalid': fieldErrors.password }" />
      </div>
      <div v-if="error" class="text-red-500 text-center mt-3">{{ error }}</div>
    </template>
    <template #footer>
      <div class="text-center">
        <Button size="small" class="mt-5" label="submit" @click="handleRegister" />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.p-invalid {
  border: 1px solid red;
}
</style>

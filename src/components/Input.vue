<script setup lang='ts'>
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

import { defineProps, defineEmits, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
  className: String;
  icon: string;
  placeholder: string;
  password: boolean;
  modelValue: string;
  feedback: boolean;
}>(), { password: false, feedback: false });

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const localValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue;
});

const emitInput = () => {
  emit('update:modelValue', localValue.value);
};
</script>

<template>
  <IconField>
    <InputIcon :class="icon" />
    <Password :style="[className]" v-if="password" v-model="localValue" @input="emitInput" :placeholder="placeholder"
      toggleMask :feedback="feedback" />
    <InputText :class="[className]" v-if="!password" v-model="localValue" @input="emitInput"
      :placeholder="placeholder" />
  </IconField>
</template>

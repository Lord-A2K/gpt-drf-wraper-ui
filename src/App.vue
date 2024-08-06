<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import ToolBar from './components/ToolBar.vue'
</script>

<template>
  <div class="w-full h-[100vh] relative">

    <ToolBar className="mt-10" />
    <div class="w-full h-full flex items-center justify-center">
      <RouterView />
    </div>

  </div>
</template>

<style scoped></style>

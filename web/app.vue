<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
const customTheme = useTheme();
const themeStore = useThemeStore()
const isDark = ref(themeStore.isDark);

customTheme.global.name.value = isDark.value ? 'myCustomDarkTheme' : 'myCustomLightTheme';
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(5px);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  filter: blur(5px);
}</style>

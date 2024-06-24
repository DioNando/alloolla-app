<template>
  <div>
    <v-btn :icon="themeStore.isDark ? 'mdi-moon-waxing-crescent' : 'mdi-white-balance-sunny'" @click="toggleTheme"
      variant="tonal">
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
const customTheme = useTheme();
const themeStore = useThemeStore()
const isDark = ref(themeStore.isDark);

const toggleTheme = () => {
  isDark.value = !isDark.value
  themeStore.setDark(isDark.value)
  customTheme.global.name.value = isDark.value ? 'myCustomDarkTheme' : 'myCustomLightTheme';
};
</script>
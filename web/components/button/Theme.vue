<template>
  <div>
    <v-btn :icon="!theme.isDark ? 'mdi-moon-waxing-crescent' : 'mdi-white-balance-sunny'" @click="toggleTheme"
      variant="tonal">
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";

const customTheme = useTheme();

const theme = useThemeStore()

const isDark = ref(theme.isDark);

const toggleTheme = () => {
  isDark.value = !isDark.value
  theme.setDark(isDark.value)
  if (!isDark.value) {
    customTheme.global.name.value = "myCustomDarkTheme";
  } else {
    customTheme.global.name.value = "myCustomLightTheme";
  }
};
</script>
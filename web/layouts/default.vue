<template>
    <v-app id="app">
        <v-navigation-drawer v-model="drawer" app>
            <BaseNavigation />
        </v-navigation-drawer>
        <v-app-bar app color="primary">
            <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
            <v-app-bar-title>Alloolla</v-app-bar-title>
            <ButtonTheme class="mr-4" />
        </v-app-bar>
        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const drawer = ref(true)

const toggleDrawer = () => {
    drawer.value = !drawer.value
}
</script>

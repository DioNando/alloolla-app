<template>
    <v-app id="app">
        <v-app-bar app :elevation="0" class="bg-transparent">
            <!-- <v-app-bar-title>Alloolla</v-app-bar-title> -->
             <v-spacer></v-spacer>
            <ButtonTheme class="mr-4" />
        </v-app-bar>
        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>
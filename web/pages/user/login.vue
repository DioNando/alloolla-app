<template>
    <v-container class="h-100 d-flex align-center">
        <v-row align="center" justify="center">
            <v-col>
                <FormLogin />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'authentication'
})
</script>

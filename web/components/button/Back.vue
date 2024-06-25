<template>
    <v-btn @click="goBack" variant="plain" prepend-icon="mdi-chevron-left">
        Retour
    </v-btn>
</template>

<script setup lang="ts">
const goBack = () => {
    if (history.length > 1) {
        window.history.back();
    } else {
        useRouter().push('/');
    }
};
</script>
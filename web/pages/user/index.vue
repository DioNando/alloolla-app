<template>
    <section class="pa-2">
        <TextTitle :title="'Utilisateurs'" />
        <div>
            <!-- <CardUser :user="user" /> -->
        </div>
    </section>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

onMounted(() => {
    authStore.initializeStore();
});

const user = computed(() => authStore.user);
</script>

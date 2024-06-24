<template>
    <section class="pa-2">
        <TextTitle :title="'Utilisateurs'" />
        <div>
            <CardUser :user="user" />
            <TableUser class="mt-2" />
        </div>
    </section>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

authStore.initializeStore();

const user = computed(() => authStore.user);
</script>

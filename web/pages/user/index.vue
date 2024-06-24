<template>
    <section class="pa-2">
        <TextTitle :title="'Utilisateurs'" />
        <div>
            <!-- FIXME: null is not assignable -->
            <CardUser :user="user" class="mb-2" />
            <TableUser />
        </div>
    </section>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

authStore.initializeStore();

const user = computed(() => authStore.user);
</script>

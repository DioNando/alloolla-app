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
import { type UserInterface } from "~/interfaces/user.interface"

const authStore = useAuthStore();

authStore.initializeStore();

// const user = ref<UserInterface>({
//     id: 0,
//     name: "Inconnu",
//     email: "Inconnu@mail.com"
// });

const user = authStore.user;
</script>

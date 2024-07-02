<template>
    <section class="pa-2">
        <TextTitle :title="'Tableau de bord'" />
        <CardUser :user="user" class="mb-2" />
        <div class="grid-container grid-container__el1 mb-2">
            <v-skeleton-loader class="grid-item border" v-for="i in 4" :key="i" type="card-avatar, actions"
                boilerplate></v-skeleton-loader>
        </div>
        <div class="grid-container grid-container__el2">
            <v-skeleton-loader class="grid-item border" v-for="i in 2" :key="i" type="article"
                boilerplate></v-skeleton-loader>
        </div>
    </section>
</template>

<script setup lang="ts">
import { type UserInterface } from "~/interfaces/user.interface"

const authStore = useAuthStore();

authStore.initializeStore();

const user = authStore.user;
</script>

<style lang="scss" scoped>
.content {
    width: 30%;

}

.grid-container {
    display: grid;
    gap: 0.5rem;

    @media only screen and (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media only screen and (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media only screen and (max-width: 600px) {
        grid-template-columns: 1fr;
    }

    &__el1 {
        grid-template-columns: repeat(4, 1fr);
    }

    &__el2 {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
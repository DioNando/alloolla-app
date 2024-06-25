<template>
    <v-card color="primary" max-width="344">
        <v-card-title>
            {{ props.user.name }}
        </v-card-title>

        <v-card-subtitle class="mb-4">
            {{ props.user.email }}
        </v-card-subtitle>
    </v-card>
</template>

<script setup lang="ts">
import { type UserInterface } from "~/interfaces/user.interface";

const props = defineProps<{
    user: UserInterface
}>()
</script>

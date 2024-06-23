<template>
    <section class="pa-2">
        <TextTitle :title="'Utilisateurs'" />
        <div>
            <h1>Bonjour, {{ user.name }}</h1>
            <p>Email: {{ user.email }}</p>
            <p>Rôle: {{ user.role }}</p>
            <p>Compte actif: {{ user.isActive ? 'Oui' : 'Non' }}</p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UserInterface } from './interfaces/UserInterface' // Assurez-vous que le chemin est correct
import { exampleUser } from '../../interfaces/user.interface'

const user = ref<UserInterface>(exampleUser)
</script>

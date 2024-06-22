<template>
    <div class="d-flex flex-column justify-space-between h-100">
        <div>
            <TextTitle :title="'Menu'" class="px-5 pt-3" />
            <v-list>
                <NuxtLink v-for="(l, index) in links" :key="index" :to="l.link">
                    <v-list-item :prepend-icon="l.icon" :title="l.title" link></v-list-item>
                </NuxtLink>
            </v-list>
        </div>
        <v-list>
            <v-list-item prepend-icon="mdi-logout" title="Deconnexion" link @click="handleLogout"></v-list-item>
        </v-list>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import links from '~/data/links.json'

const router = useRouter()

const handleLogout = () => {
    // Effectuer ici les opérations de déconnexion si nécessaire, puis rediriger vers /login
    // Par exemple, effacer les données utilisateur ou les tokens

    // Rediriger vers la page /login
    router.push('/user/login')
}
</script>
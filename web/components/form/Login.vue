<template>
  <v-card class="mx-auto pa-6" max-width="528" :elevation="0">
    <TextTitle :title="'Connexion'" />
    <v-text-field label="Email" prepend-icon="mdi-account" variant="outlined"></v-text-field>
    <v-text-field label="Mot de passe" prepend-icon="mdi-key" variant="outlined"></v-text-field>
    <div class="d-flex justify-end">
      <v-btn append-icon="mdi-login" text="Se Connecter" color="primary" @click="handleLogin">SE CONNECTER</v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import links from '~/data/links.json'

const router = useRouter()

const handleLogin = () => {
    // Effectuer ici les opérations de déconnexion si nécessaire, puis rediriger vers /login
    // Par exemple, effacer les données utilisateur ou les tokens

    // Rediriger vers la page /login
    router.push('/')
}
</script>
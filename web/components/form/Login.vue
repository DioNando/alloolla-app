<template>
  <div class="form mx-auto d-flex flex-column ga-6">
    <v-card class="pa-6" :class="[theme.isDark ? 'bg-grey-lighten-4' : '']" :elevation="0">
      <TextTitle :title="'Connexion'" />
      <div class="d-flex flex-column ga-3">
        <v-text-field v-model="email" label="Email" prepend-icon="mdi-account" variant="outlined"
          :rules="emailRules"></v-text-field>
        <v-text-field v-model="password" label="Mot de passe" prepend-icon="mdi-key" variant="outlined"
          :type="showPassword ? 'text' : 'password'" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="showPassword = !showPassword" :rules="passwordRules"></v-text-field>
        <div class="d-flex justify-end ga-3">
          <v-btn append-icon="mdi-login" text="Se Connecter" color="primary" @click="handleLogin">SE CONNECTER</v-btn>
        </div>
      </div>
    </v-card>
    <v-alert v-if="showError" text="Email ou Mot de passe incorrect" type="error" dismissible></v-alert>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const theme = useThemeStore()

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const showError = ref(false)

const emailRules = [
  v => !!v || 'L\'email est requis',
  v => /.+@.+\..+/.test(v) || 'L\'email doit être valide',
]

const passwordRules = [
  v => !!v || 'Le mot de passe est requis',
  v => v.length >= 6 || 'Le mot de passe doit comporter au moins 6 caractères',
]

const handleLogin = () => {
  // Remplacez cette logique par une vérification réelle des informations d'identification
  if (email.value === 'utilisateur@example.com' && password.value === 'motdepasse') {
    // Rediriger vers la page d'accueil après une connexion réussie
    router.push('/')
  } else {
    // Afficher le message d'erreur si les informations d'identification sont incorrectes
    showError.value = true
  }
}
</script>

<style lang="scss" scoped>
.form {
  max-width: 528px;
}
</style>

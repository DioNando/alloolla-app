<template>
  <div class="form mx-auto d-flex flex-column ga-6">
    <v-card class="pa-6" :class="[themeStore.isDark ? '' : 'bg-grey-lighten-4']" :elevation="0">
      <TextTitle :title="'Connexion'" />
      <div class="d-flex flex-column ga-3">
        <v-text-field v-model="user.email" label="Email" prepend-icon="mdi-account" variant="outlined"
          :rules="emailRules"></v-text-field>
        <v-text-field v-model="user.password" label="Mot de passe" prepend-icon="mdi-key" variant="outlined"
          :type="showPassword ? 'text' : 'password'" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="showPassword = !showPassword" :rules="passwordRules"></v-text-field>
        <div class="d-flex justify-end ga-3">
          <v-btn append-icon="mdi-login" text="Se Connecter" color="primary" @click="login" :loading="loading">SE
            CONNECTER</v-btn>
        </div>
      </div>
    </v-card>
    <v-alert v-if="error" :text="error" type="error" dismissible></v-alert>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const themeStore = useThemeStore()

const router = useRouter()
const showPassword = ref(false)

const emailRules = [
  v => !!v || 'L\'email est requis',
  v => /.+@.+\..+/.test(v) || 'L\'email doit être valide',
]

const passwordRules = [
  v => !!v || 'Le mot de passe est requis',
  v => v.length >= 6 || 'Le mot de passe doit comporter au moins 6 caractères',
]

import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/stores/auth'; // import the auth store we just created

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated, loading, error } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
  email: 'jhon@example.org',
  password: 'password',
});

const login = async () => {
  await authenticateUser(user.value);
  if (authenticated) {
    router.push('/');
  }
};
</script>

<style lang="scss" scoped>
.form {
  max-width: 528px;
}
</style>

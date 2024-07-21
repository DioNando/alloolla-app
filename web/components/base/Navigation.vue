<template>
    <div class="d-flex flex-column justify-space-between h-100">
        <div>
            <TextTitle :title="'Menu'" class="px-5 pt-3" />
            <v-list>
                <NuxtLink v-for="(l, index) in links" :key="index" :to="l.link">
                    <v-list-item v-if="!l.is_admin" :prepend-icon="l.icon" :title="l.title" link></v-list-item>
                </NuxtLink>
                <NuxtLink v-for="(l, index) in linksAdmin" :key="index" :to="l.link">
                    <v-list-item v-if="user?.is_admin" :prepend-icon="l.icon" :title="l.title" link></v-list-item>
                </NuxtLink>
            </v-list>
        </div>
        <v-list>
            <v-list-item prepend-icon="mdi-logout" title="Deconnexion" link @click="logout"></v-list-item>
        </v-list>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import links from '~/data/links.json'
import linksAdmin from '~/data/linksAdmin.json'

import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/stores/auth'; // import the auth store we just created

const authStore = useAuthStore();

authStore.initializeStore();
const user = authStore.user;

const router = useRouter();


const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
};
</script>
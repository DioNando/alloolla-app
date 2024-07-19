<template>
    <v-row justify="center">
        <v-col cols="12">
            <div class="mb-5">
                <v-card append-icon="mdi-tag" class="mx-auto" title="Ajouter une nouvelle catégorie" variant="tonal"
                    color="primary">
                </v-card>
            </div>
            <v-form>
                <!-- <div class="text-h5 text-bold my-5">Renseignements de base</div> -->
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="category.name" :rules="rules.nameRules" label="Nom" required
                            variant="outlined"></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field v-model="category.slug" label="Slug" required variant="outlined"
                            disabled></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-select v-model="category.display" label="Affichage" variant="outlined"
                            :items="['default', 'products', 'subcategories', 'both']"></v-select>
                    </v-col>

                    <v-col cols="12">
                        <v-textarea v-model="category.description" label="Description" variant="outlined"
                            :rules="rules.descriptionRules"></v-textarea>
                    </v-col>
                    <v-col>
                        <div class="d-flex flex-column flex-lg-row justify-end ga-3">
                            <v-btn class="" variant="flat" @click="resetValidation">
                                Effacer
                            </v-btn>

                            <v-btn class="" color="primary" variant="outlined" @click="formAddCategory"
                                append-icon="mdi-cloud-upload">
                                Publier
                            </v-btn>

                            <v-btn class="" color="primary" @click="formAddCategory" append-icon="mdi-tag" :loading="loading">
                                Ajouter
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-form>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import type { CategoryInterface } from "~/interfaces/category.interface"

import { addCategory } from '@/api/categoryApi'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
authStore.initializeStore()

const user = authStore.user

const router = useRouter()
const loading = ref(false)

const rules = ref<any>({
    nameRules: [
        value => !!value || 'Nom requis.',
        value => (value?.length <= 50) || 'Le nom doit comporter moins de 50 caractères.'
    ],
    descriptionRules: [
        value => !!value || 'Type requis.'
    ],
})

const category = ref<CategoryInterface>({
    name: "",
    slug: "",
    description: "",
    display: "default",
    id_category_wp: 0,
})

const resetValidation = () => {
    category.value = {
        name: "",
        slug: "",
        description: "",
        display: "default",
        id_category_wp: 0,
    }
}

const formAddCategory = async () => {
    loading.value = true
    try {
        if (user?.id != undefined) {
            const response = await addCategory(category.value, user?.id)
            loading.value = false
            if (response) {
                alert('Ajout ok');
                // $emit('category-add', true);
                // TODO: add notification
            }
        }
    } catch (error) {
        console.error('Failed to add category:', error)
    }
}

// Fonction pour transformer le texte en slug
const generateSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '') // Enlever les caractères non-alphanumériques
        .replace(/\s+/g, '-')        // Remplacer les espaces par des tirets
        .replace(/-+/g, '-')         // Remplacer les tirets multiples par un seul tiret
}

// Watcher pour écouter les modifications du modèle category.name
watch(() => category.value.name, (newName) => {
    category.value.slug = generateSlug(newName)
})
</script>

<style lang="scss" scoped>
.form-container {
    display: flex;
    justify-content: center;

    @media only screen and (max-width: 1200px) {
        width: 50%;
    }

    @media only screen and (max-width: 900px) {
        width: 50%;
    }

    @media only screen and (max-width: 600px) {
        width: 50%;
    }

    &__sub {
        flex: auto;
    }
}
</style>
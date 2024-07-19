<template>
    <v-row justify="center" class="mb-12">
        <v-col cols="12" md="5">
            <div>
                <v-card append-icon="mdi-archive" class="mx-auto" title="Ajouter un nouveau produit" variant="tonal"
                    color="primary">
                </v-card>
            </div>
            <v-form>
                <div class="text-h5 text-bold my-5">Renseignements de base</div>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="product.name" :counter="10" :rules="rules.nameRules" label="Nom" required
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="product.type" :rules="rules.typeRules" label="Type" required
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="product.regular_price" :rules="rules.priceRules" label="Tarif régulier"
                            required variant="outlined" type="number"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="product.short_description" :rules="rules.shortDescriptionRules"
                            label="Résumé" required variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea v-model="product.description" :rules="rules.descriptionRules" label="Description"
                            variant="outlined"></v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <!-- <v-select v-model="product.categories" clearable chips label="Catégories" :items="categories" item-value="id"
                            item-title="name" multiple variant="outlined"></v-select> -->
                        <v-select clearable chips label="Catégories" :items="categoryStore.categories" item-value="id" item-title="name"
                         multiple variant="outlined"></v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-file-input multiple prepend-icon="mdi-image" label="Images" variant="outlined"
                            @change="handleFileChange">
                            <template v-slot:selection="{ fileNames }">
                                <template v-for="fileName in fileNames" :key="fileName">
                                    <v-chip class="me-1" color="primary" size="small" label>
                                        {{ fileName }}
                                    </v-chip>
                                </template>
                            </template>
                        </v-file-input>
                    </v-col>
                    <v-col v-if="previews.length" cols="12" class="preview--container">
                        <img v-for="(preview, index) in previews" :key="index" :src="preview" class="preview--image" />
                    </v-col>
                    <v-col>
                        <div class="d-flex flex-column flex-lg-row justify-end ga-3">
                            <v-btn class="" variant="flat" @click="resetValidation">
                                Effacer
                            </v-btn>
                            <v-btn class="" color="primary" variant="outlined" append-icon="mdi-cloud-upload"
                                @click="formAddProduct" :loading="loading">
                                Publier
                            </v-btn>
                            <v-btn class="" color="primary" @click="formAddProduct" :loading="loading"
                                append-icon="mdi-archive">
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
import type { ProductInterface } from "~/interfaces/product.interface"

import { addProduct } from '@/api/productApi'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

import categories from '~/data/categories.json'

const categoryStore = useCategoryStore()
categoryStore.fetchCategories()

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
    typeRules: [
        value => !!value || 'Type requis.'
    ],
    priceRules: [
        value => !!value || 'Tarif requis.',
        value => !isNaN(parseFloat(value)) || 'Le tarif doit être un nombre valide.'
    ],
    shortDescriptionRules: [
        value => !!value || 'Résumé requis.'
    ],
    descriptionRules: [
        value => !!value || 'Description requise.'
    ]
})

const product = ref<ProductInterface>({
    name: "",
    type: "",
    regular_price: 0,
    short_description: "",
    stock: 1,
    description: "",
    categories: [],
    images: []
})

const resetValidation = () => {
    product.value = {
        name: "",
        type: "",
        regular_price: 0,
        short_description: "",
        stock: 1,
        description: "",
        categories: [],
        images: []
    }
    previews.value = []
}

const formAddProduct = async () => {
    loading.value = true
    try {
        if (user?.id != undefined) {
            const response = await addProduct(product.value, user?.id)
            loading.value = false
            if (response) {
                alert('Ajout ok')
                router.push('/products')
                // TODO: add notification
            }
        }
    } catch (error) {
        console.error('Failed to add product:', error)
    }
}

const previews = ref<string[]>([])

const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (!input.files) return

    previews.value = []
    product.value.images = []

    for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i]
        const reader = new FileReader()

        reader.onload = (e) => {
            const result = e.target?.result as string
            previews.value.push(result)
            product.value.images?.push({
                src: result
            })
        }

        reader.readAsDataURL(file)
    }
}
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

.preview--container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    .preview--image {
        width: 10rem;
        aspect-ratio: 1/1;
        object-fit: cover;
        flex: auto;
        border-radius: 0.5rem;
        background-color: white;
    }
}
</style>

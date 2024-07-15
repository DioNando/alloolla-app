<template>
    <v-row justify="center" class="mb-12">
        <v-col cols="12">
            <div>
                <v-card append-icon="mdi-archive" class="mx-auto" title="Mettre à jour un produit" variant="tonal"
                    color="primary">
                </v-card>
            </div>
            <v-form>
                <div class="text-h5 text-bold my-5">Renseignements de base</div>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="props.product.name" :counter="10" :rules="rules.nameRules" label="Nom"
                            required variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="props.product.type" :rules="rules.typeRules" label="Type" required
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="props.product.regular_price" :rules="rules.priceRules"
                            label="Tarif régulier" required variant="outlined" type="number"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="props.product.short_description" :rules="rules.shortDescriptionRules"
                            label="Résumé" required variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea v-model="props.product.description" :rules="rules.descriptionRules"
                            label="Description" variant="outlined"></v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <v-file-input multiple prepend-icon="mdi-image" label="Images"
                            variant="outlined"></v-file-input>
                    </v-col>
                    <v-col>
                        <div class="d-flex flex-column flex-lg-row justify-end ga-3">
                            <v-btn class="" color="error" append-icon="mdi-delete" @click="formDeleteProduct"
                                :loading="loading">
                                Supprimer
                            </v-btn>
                            <v-btn class="" color="primary" append-icon="mdi-cloud-upload">
                                Publier
                            </v-btn>
                            <v-btn class="" color="warning" append-icon="mdi-pencil" @click="formEditProduct"
                                :loading="loading">
                                Modifier
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
import { editProduct, deleteProduct } from '@/api/productApi'

const authStore = useAuthStore();
authStore.initializeStore();

const user = authStore.user

const router = useRouter()
const loading = ref(false)

const props = defineProps<{
    product: ProductInterface
}>()

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
});

const formEditProduct = async () => {
    loading.value = true;
    try {
        if (user?.id != undefined) {
            const response = await editProduct(props.product, user?.id);
            loading.value = false;
            if (response) {
                alert('Modification ok')
                // TODO: add notification
            }
        }
    } catch (error) {
        console.error('Failed to edit product:', error);
    }
};

const formDeleteProduct = async () => {
    loading.value = true;
    try {
        if (props.product.id != undefined) {
            const response = await deleteProduct(props.product.id);
            loading.value = false;
            if (response) {
                router.push('/products');
                alert('Suppression ok')
                // TODO: add notification
            }
        }
    } catch (error) {
        console.error('Failed to delete product:', error);
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
</style>

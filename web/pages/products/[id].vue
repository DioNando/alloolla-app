<template>
    <div class="pa-2">
        <div class="d-flex align-center justify-space-between">
            <ButtonBack />
            <div class="text-h5 font-weight-bold">
                Details du produit - {{ product.name }}
            </div>
        </div>
        <v-row align="start" justify="start" class="flex-column flex-md-row mt-3">
            <v-col lg="4" md="5" sm="12">
                <CardProductDetails :product="product" />
            </v-col>
            <v-col>
                <FormProductEdit :product="product" />
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { type ProductInterface } from "~/interfaces/product.interface"
import { getProduct } from '@/api/productApi'

const { id } = useRoute().params;

const product = ref<ProductInterface>({
    id: 0,
    name: "...",
    regular_price: 0,
    description: "...",
    user: {
        id: 0,
        name: "",
        email: ""
    }
    // TODO: ajouter les autres attributs
});

// const { data: fakeProduct } = await useFetch<any>(`https://fakestoreapi.com/products/${id}`);

const fetchProduct = async () => {
    try {
        product.value = await getProduct(parseInt(id as string))
    } catch (err) {
        console.error("Erreur lors de la requête.", err);
    }
}

onMounted(fetchProduct)
</script>

<style lang="scss" scoped></style>
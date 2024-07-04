<template>
    <div class="pa-2">
        <div class="d-flex align-center justify-space-between">
            <ButtonBack />
            <div class="text-h5 font-weight-bold">
                Details du produit {{ product.id }} - {{ product.name }}
            </div>
        </div>
        <v-row align="start" justify="start" class="flex-column flex-md-row mt-3">
            <v-col lg="4" md="5" sm="12">
                <CardProductDetails :product="fakeProduct" />
            </v-col>
            <v-col>
                <FormProductEdit :product="fakeProduct" />
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { type ProductInterface } from "~/interfaces/product.interface"

const { id } = useRoute().params;
const token = useCookie("token");

const config = useRuntimeConfig();

const product = ref<ProductInterface>({
    id: 0,
    name: "0",
    regular_price: 0,
    description: "...",
    user: {
        id: 0,
        name: "0",
        email: "0"
    }
});

const { data: fakeProduct } = await useFetch<any>(`https://fakestoreapi.com/products/${id}`);

const fetchProduct = async () => {
    try {
        const response = await $fetch<any>(`${config.public.apiUrl}/products/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });
        if (response) {
            product.value = response.data;
        }
    } catch (err) {
        console.error("Erreur lors de la requête.", err);
    }
}

onMounted(fetchProduct)
</script>

<style lang="scss" scoped></style>
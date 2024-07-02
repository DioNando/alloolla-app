<template>
    <section>
        <div class="mb-3 d-flex justify-space-between">
            <div class="d-flex ga-3 align-center">
                <p>Page: {{ meta.current_page }} / {{ meta.last_page }}</p>
                <p>Total des articles: {{ meta.total }}</p>
            </div>
            <div class="d-flex ga-3 align-center">
                <v-btn @click="prevPage" :disabled="page <= 1">Précédent</v-btn>
                <v-btn @click="nextPage" :disabled="page >= meta.last_page">Suivant</v-btn>
            </div>
        </div>
        <div class="grid-container">
            <v-skeleton-loader class="grid-item border" v-if="loading" v-for="i in 5" :key="i" type="card, actions"></v-skeleton-loader>
            <CardProduct class="grid-item" v-else v-for="product in products" key="product.id" :product="product" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { getProducts } from '@/api/productApi'

import { type ProductInterface } from "~/interfaces/product.interface";
import { type Meta } from "~/interfaces/pagination.interface";

const products = ref<ProductInterface[]>([]);
const meta = ref<Meta>({
    current_page: 0,
    from: 0,
    last_page: 0,
    links: [],
    path: '',
    per_page: 0,
    to: 0,
    total: 0
});

const page = ref(1);
const loading = ref(true);

const fetchProducts = async () => {
    try {
        const response = await getProducts(page.value);
        products.value = response.data;
        meta.value = response.meta;
        loading.value = false;
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
};

const nextPage = () => {
    if (page.value < meta.value.last_page) {
        loading.value = true;
        page.value++;
    }
};

const prevPage = () => {
    if (page.value > 1) {
        loading.value = true;
        page.value--;
    }
};

onMounted(fetchProducts);

watch(page, fetchProducts);

</script>

<style lang="scss" scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    
    @media only screen and (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media only screen and (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: 600px) {
        grid-template-columns: 1fr;
    }
}
</style>
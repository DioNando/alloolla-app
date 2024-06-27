<template>
    <section class="pa-2">
        <TextTitle :title="'Produits Woo Commerce'" />
        <div class="table">
            <v-skeleton-loader v-if="loading" class="border" type="table"></v-skeleton-loader>
            <v-table class="border" v-else fixed-header>
                <thead>
                    <tr>
                        <th class="text-left">
                            ID
                        </th>
                        <th class="text-left">
                            Nom
                        </th>
                        <th class="text-left">
                            Description
                        </th>
                        <th class="text-left">
                            Prix
                        </th>
                        <th class="text-left">
                            Type
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id">
                        <td>{{ product.id }}</td>
                        <td>{{ product.name }}</td>
                        <td>
                            <p class="table__description">{{ product.description }}</p>
                        </td>
                        <td>{{ product.regular_price }}</td>
                        <td>{{ product.type }}</td>
                    </tr>
                </tbody>
            </v-table>

            <!-- <div class="table__pagination mt-2">
            <v-pagination v-model="page" :length="meta.last_page" rounded="circle"></v-pagination>
        </div> -->
            <!-- <div>
            <div class="pagination">
                <v-btn @click="prevPage" :disabled="page <= 1">Previous</v-btn>
                <v-btn @click="nextPage" :disabled="page >= meta.last_page">Next</v-btn>
                <p>Page: {{ meta.current_page }} / {{ meta.last_page }}</p>
                <p>Total Users: {{ meta.total }}</p>
            </div>
        </div> -->
        </div>
    </section>
</template>

<script setup lang="ts">
import { getProducts } from '@/api/woo_commerce/productApi'

const products = ref<any[]>([])

const page = ref(1);
const loading = ref(true);

const fetchProducts = async () => {
    try {
        const response = await getProducts();
        products.value = response;
        loading.value = false;
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
};

onMounted(fetchProducts);

watch(page, fetchProducts);
</script>

<style lang="scss" scoped>
@import "~/assets/scss/style.scss";

.table {
    &__description {
        @include paragraph-overflow-hidden(1);
    }
}
</style>
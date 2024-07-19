<template>
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

    </div>
</template>

<script setup lang="ts">
import { getProductsWooCommerce } from '@/api/wooCommerce/productWooCommerceApi'

const products = ref<any[]>([])

const page = ref(1);
const loading = ref(true);

const fetchProducts = async () => {
    try {
        const response = await getProductsWooCommerce();
        products.value = response;
        // console.log('Produits: ' + products.value.length);
        // console.table(products.value);
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
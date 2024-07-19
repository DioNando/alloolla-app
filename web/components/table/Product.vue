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
                    <!-- <th class="text-left">
                        Titre
                    </th> -->
                    <th class="text-left">
                        Description
                    </th>
                    <th class="text-right">
                        Stock
                    </th>
                    <th class="text-right">
                        Prix
                    </th>
                    <th class="text-left">
                        Utilisateur
                    </th>
                    <th class="text-center">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td>{{ product.name }}</td>
                    <td>
                        <p class="table__description">{{ product.short_description }}</p>
                    </td>
                    <!-- <td>
                        <p class="table__description">{{ product.description }}</p>
                    </td> -->
                    <td class="text-right">{{ product.stock }}</td>
                    <td class="text-right">{{ product.regular_price }}</td>
                    <td>{{ product.user?.name }}</td>
                    <td class="text-center">
                        <v-btn variant="text" color="primary" icon="mdi-cloud-upload"
                            class="text-none" :disabled="product.id_product_wp ? true : false"
                            @click="uploadProduct(product)"></v-btn>
                        <v-btn :to="`/products/${product.id}`" variant="text" color="primary" icon="mdi-chevron-right"
                            class="text-none"></v-btn></td>
                </tr>
            </tbody>
        </v-table>

        <v-row justify="center">
            <v-col cols="10">
                <v-container class="max-width">
                    <v-pagination v-model="page" rounded :length="meta.last_page"></v-pagination>
                </v-container>
            </v-col>
        </v-row>
        <!-- <div>
            <div class="pagination">
                <v-btn @click="prevPage" :disabled="page <= 1">Previous</v-btn>
                <v-btn @click="nextPage" :disabled="page >= meta.last_page">Next</v-btn>
                <p>Page: {{ meta.current_page }} / {{ meta.last_page }}</p>
                <p>Total Users: {{ meta.total }}</p>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { addProductWooCommerce } from '@/api/wooCommerce/productWooCommerceApi'

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

const fetchUsers = async () => {
    try {
        const response = await getProducts(page.value);
        products.value = response.data;
        meta.value = response.meta;
        loading.value = false;
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
};

const uploadProduct = async (product: ProductInterface) => {
    try {
        const response = await addProductWooCommerce(product)
        console.log(response)
    } catch (error) {
        alert('error')
    }
}

const nextPage = () => {
    if (page.value < meta.value.last_page) {
        page.value++;
    }
};

const prevPage = () => {
    if (page.value > 1) {
        page.value--;
    }
};

onMounted(fetchUsers);

watch(page, fetchUsers);

</script>

<style lang="scss" scoped>
@import "~/assets/scss/style.scss";

.table {
    &__description {
        @include paragraph-overflow-hidden(1);
    }

    // &__pagination {}
}
</style>
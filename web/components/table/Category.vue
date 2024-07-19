<template>
    <div>
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
                        Affichage
                    </th>
                    <th class="text-center">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categories" :key="category.id">
                    <td>{{ category.id }}</td>
                    <td>{{ category.name }}</td>
                    <td>{{ category.description }}</td>
                    <td>{{ category.display }}</td>
                    <td class="text-center"><v-btn variant="text" color="primary" icon="mdi-cloud-upload"
                            class="text-none" :disabled="category.id_category_wp ? true : false"
                            @click="uploadCategory(category)"></v-btn></td>
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
import { addCategoryWooCommerce } from '@/api/wooCommerce/categoryWooCommerceApi'

import { getCategories } from '@/api/categoryApi'

import { type CategoryInterface } from "~/interfaces/category.interface";
import { type Meta } from "~/interfaces/pagination.interface";

const categories = ref<CategoryInterface[]>([]);
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

const fetchCategories = async () => {
    try {
        const response = await getCategories(page.value);
        categories.value = response.data;
        meta.value = response.meta;
        loading.value = false;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
    }
};

const uploadCategory = async (category: CategoryInterface) => {
    try {
        const response = await addCategoryWooCommerce(category)
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

onMounted(fetchCategories);

watch(page, fetchCategories);

</script>

<style lang="scss" scoped>
.active {
    font-weight: bold;
}

.pagination {
    width: 20vw;
}
</style>
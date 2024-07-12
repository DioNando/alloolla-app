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
                        Nombre
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categories" :key="category.id">
                    <td>{{ category.id }}</td>
                    <td>{{ category.name }}</td>
                    <td>{{ category.count }}</td>
                </tr>
            </tbody>
        </v-table>

    </div>
</template>

<script setup lang="ts">
import { getCategories } from '@/api/wooCommerce/categoryWooCommerceApi'

const categories = ref<any[]>([])

const page = ref(1);
const loading = ref(true);

const fetchCategories = async () => {
    try {
        const response = await getCategories();
        categories.value = response;
        // console.log('Categories: ' + categories.value.length);
        // console.table(categories.value);
        loading.value = false;
    } catch (error) {
        console.error('Failed to fetch categorys:', error);
    }
};

onMounted(fetchCategories);

watch(page, fetchCategories);
</script>

<style lang="scss" scoped>
@import "~/assets/scss/style.scss";

.table {
    &__description {
        @include paragraph-overflow-hidden(1);
    }
}
</style>
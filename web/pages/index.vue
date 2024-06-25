<template>
    <section class="pa-2">
        <TextTitle :title="'Tableau de bord'" />
        <div class="mb-3 d-flex justify-space-between">
            <div class="d-flex ga-3 align-center">
                <p>Page: {{ meta.current_page }} / {{ meta.last_page }}</p>
                <p>Total des articles: {{ meta.total }}</p>
            </div>
            <div class="d-flex ga-3 align-center">
                <v-btn @click="prevPage" :disabled="page <= 1">Previous</v-btn>
                <v-btn @click="nextPage" :disabled="page >= meta.last_page">Next</v-btn>
            </div>
        </div>
        <div class="d-flex flex-wrap ga-3">
            <v-skeleton-loader v-if="loading" v-for="i in 4" :key="i" type="card" width="344"></v-skeleton-loader>
            <CardArticle v-else v-for="article in articles" key="article.id" :article="article" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { getArticles } from '@/api/articleApi'

import { type ArticleInterface } from "~/interfaces/article.interface";
import { type Meta } from "~/interfaces/pagination.interface";

const articles = ref<ArticleInterface[]>([]);
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
        const response = await getArticles(page.value);
        articles.value = response.data;
        meta.value = response.meta;
        loading.value = false;
    } catch (error) {
        console.error('Failed to fetch articles:', error);
    }
};

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
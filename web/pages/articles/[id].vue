<template>
    <div class="pa-2">
        <v-row align="center" no-gutters class="mt-1">
            <v-col class="text-h3 font-weight-bold" cols="auto">
                Details du produit {{ product.id }}
            </v-col>
        </v-row>
        <v-row align="start" justify="start" class="flex-column flex-md-row mt-3">
            <v-col>
                <v-card variant="tonal">
                    <v-img :src="product.image" class="ma-6"></v-img>
                </v-card>
            </v-col>
            <v-col>
                <v-card variant="flat" class="bg-transparent">
                    <p class="text-h4 mt-2">
                        {{ product.title }}
                    </p>
                    <v-divider class="my-3" />
                    <p class="text-h6 py-1">{{ product.category }}</p>
                    <p class="text-body-2">{{ product.description }}</p>
                    <p class="text-h4 font-weight-bold text-error mt-3">
                        {{ product.price }} $
                    </p>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { type ArticleInterface } from "~/interfaces/article.interface"

const { id } = useRoute().params;
const token = useCookie("token");

const config = useRuntimeConfig();

const article = ref<ArticleInterface>({
    id: 0,
    amount: 0,
    description: "0",
    name: "0",
    status: '',
    userId: 0,
    user: {
        id: 0,
        name: "0",
        email: "0"
    }
});

const { data: product } = await useFetch<any>(`https://fakestoreapi.com/products/${id}`);

const fetchArticle = async () => {
    try {
        const data = await $fetch<ArticleInterface>(`${config.public.apiUrl}/articles/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });
        if (data) {
            article.value = data;
        }
    } catch (err) {
        console.error("Erreur lors de la requête.", err);
    }
}

onMounted(fetchArticle)
</script>

<style lang="scss" scoped></style>
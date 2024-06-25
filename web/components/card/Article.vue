<template>
    <v-card class="card" border :elevation="0">
        <v-img height="150" :src="product.image" cover></v-img>

        <v-card-item>
            <v-card-title>{{ props.article.name }}</v-card-title>

            <v-card-subtitle class="d-flex align-center">
                <span class="me-1">{{ props.article.amount }}</span>
                <!-- TODO: Ajouter attribut isAvailable -->
                <v-icon color="error" icon="mdi-fire-circle" size="large"></v-icon>
            </v-card-subtitle>
        </v-card-item>

        <v-card-text>
            <div class="card__description">{{ props.article.description }}</div>
        </v-card-text>

        <!-- <v-divider class="mx-4 mb-1"></v-divider> -->

        <!-- <div class="px-4 mb-2">
            <v-chip-group selected-class="bg-deep-purple-lighten-2">
                <v-chip>5:30PM</v-chip>

                <v-chip>7:30PM</v-chip>

                <v-chip>8:00PM</v-chip>

                <v-chip>9:00PM</v-chip>
            </v-chip-group>
        </div> -->

        <v-card-actions class="d-flex justify-end">
            <v-btn class="text-none" text="Details" color="secondary" append-icon="mdi-chevron-right"
                variant="text" :to="`/articles/${props.article.id}`"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { type ArticleInterface } from "~/interfaces/article.interface";

const props = defineProps<{
    article: ArticleInterface
}>()

const { data: product } = await useFetch<any>(`https://fakestoreapi.com/products/${props.article.id}`);
</script>

<style lang="scss" scoped>
@import "~/assets/scss/style.scss";

.card {
    flex: 1;
    min-width: 250px;

    &__description {
        @include paragraph-overflow-hidden(3);
    }
}
</style>

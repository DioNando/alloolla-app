<template>
  <v-card variant="tonal" class="bg-white card">
    <div class="pa-2">
      <div class="d-flex justify-center">
        <v-img height="200" width="300" :src="product.image" class="ma-4"></v-img>
      </div>
      <v-card-item>
        <v-card-title>{{ product.title }}</v-card-title>

        <v-card-subtitle>
          <span class="me-1">{{ product.category }}</span>
        </v-card-subtitle>
      </v-card-item>
      <v-card-actions class="d-flex align-center justify-space-between">
        <v-btn variant="text" icon="mdi-chevron-up" @click="reveal = true">
        </v-btn>
        <v-btn :to="`/articles/${article.id}`" variant="text" append-icon="mdi-chevron-right"
          class="text-none">Consulter</v-btn>
      </v-card-actions>
    </div>
    <!-- <v-expand-transition> -->
    <v-card v-if="reveal" class="pa-2 d-flex flex-column justify-space-between v-card--reveal">
      <v-card-text class="pb-0">
        <p class="text-h6 text--primary">{{ product.title }}</p>
        <p class="text-subtitle text--primary">{{ product.category }}</p>
        <v-divider class="my-2"></v-divider>
        <p class="lines">
          {{ product.description }}
        </p>
      </v-card-text>

      <v-card-actions class="d-flex align-center justify-space-between">
        <v-btn variant="text" color="white" icon="mdi-close" @click="reveal = false" class="text-none">
        </v-btn>
        <v-btn :to="`/articles/${article.id}`" variant="text" append-icon="mdi-chevron-right"
          class="text-none">Consulter</v-btn>
      </v-card-actions>
    </v-card>
    <!-- </v-expand-transition> -->
  </v-card>
</template>

<script setup lang="ts">
import { type ArticleInterface } from "~/interfaces/article.interface";

const props = defineProps<{
  article: ArticleInterface
}>()

const reveal = ref(false);

const { data: product } = await useFetch<any>(`https://fakestoreapi.com/products/${props.article.id}`);
</script>

<style lang="scss" scoped>
@import "~/assets/scss/style.scss";

a {
  text-decoration: none;
}

.card {
  position: relative;

  .v-card--reveal {
    // bottom: 0;
    top: 0;
    opacity: 1 !important;
    position: absolute;
    // width: 100%;
    height: 100%;
  }
}

.lines {
  @include paragraph-overflow-hidden(5);
}
</style>

<template>
    <div>
        <v-card variant="tonal">
            <v-img :src="props.product.image" class="ma-3"></v-img>
        </v-card>
        <v-card variant="flat" class="bg-transparent">
            <p class="text-h4 mt-2">
                {{ props.product.title }}
            </p>
            <v-divider class="my-3" />
            <p class="text-h6 py-1">{{ product.category }}</p>
            <p class="text-body-2">{{ product.description }}</p>
            <p class="text-h4 font-weight-bold text-error mt-3">
                {{ props.product.price }} $
            </p>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { type ArticleInterface } from "~/interfaces/article.interface"

const props = defineProps<{
    product: any
}>()

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

</script>

<style lang="scss" scoped></style>
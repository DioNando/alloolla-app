<template>
    <div>
        <!-- <v-card variant="tonal">
            <v-img :src="props.product.images[0].src" class="ma-3"></v-img>
        </v-card> -->
        <v-skeleton-loader type="image"></v-skeleton-loader>
        <v-card variant="flat" class="bg-transparent">
            <p class="text-h4 mt-2">
                {{ props.product.name }}
            </p>
            <v-divider class="my-3" />
            <p class="text-h6 py-1">{{ product.short_description }}</p>
            <p class="text-body-2">{{ product.description }}</p>
            <p class="text-h4 font-weight-bold text-error mt-3">
                {{ props.product.regular_price }} Dh
            </p>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import type { ProductInterface } from "~/interfaces/product.interface"

const props = defineProps<{
    product: ProductInterface
}>()
</script>

<style lang="scss" scoped></style>
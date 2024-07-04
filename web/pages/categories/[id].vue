<template>
    <div class="pa-2">
        <div class="d-flex align-center justify-space-between">
            <ButtonBack />
            <div class="text-h5 font-weight-bold">
                <!-- Details du produit {{ product.id }} - {{ product.name }} -->
            </div>
        </div>
        <v-row align="start" justify="start" class="flex-column flex-md-row mt-3">
            <v-col lg="4" md="5" sm="12">
                <!-- <CardProductDetails :product="fakeProduct" /> -->
            </v-col>
            <v-col>
                <!-- <FormProduct :product="fakeProduct" /> -->
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
const { id } = useRoute().params;
const token = useCookie("token");

const config = useRuntimeConfig();

</script>

<style scoped></style>
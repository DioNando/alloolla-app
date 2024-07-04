<template>
    <section class="pa-2">
        <TextTitle :title="'WooCommerce'" />
        <div>
            <v-tabs v-model="tab" align-tabs="left" color="primary" class="mb-3">
                <v-tab append-icon="mdi-archive" :value="1">Produits</v-tab>
                <v-tab append-icon="mdi-tag" :value="2">Catégories</v-tab>
            </v-tabs>

            <v-tabs-window v-model="tab">
                <v-tabs-window-item :value="1">
                    <TableWordpressProduct />
                </v-tabs-window-item>
                <v-tabs-window-item :value="2">
                    <TableWordpressCategory />
                </v-tabs-window-item>
            </v-tabs-window>
        </div>
    </section>
</template>

<script setup lang="ts">
const tab = ref(null)

</script>

<style lang="scss"></style>
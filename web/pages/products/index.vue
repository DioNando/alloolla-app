<template>
    <section class="pa-2">
        <TextTitle :title="'Produits'" />
        <div class="mb-3 d-flex align-center justify-space-between">
            <v-tabs v-model="tab" align-tabs="start" color="primary">
                <v-tab append-icon="mdi-view-dashboard" :value="1">Galerie</v-tab>
                <v-tab append-icon="mdi-format-list-numbered" :value="2">Liste</v-tab>
                <v-tab append-icon="mdi-plus" :value="3">Nouveau</v-tab>
            </v-tabs>
            <div class="search" :class="tab && tab != 3 ? '' : 'opacity-0'">
                <v-text-field label="Recherche..." prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
                    single-line></v-text-field>
            </div>
        </div>

        <v-tabs-window v-model="tab">
            <v-tabs-window-item :value="1">
                <UIProducts />
            </v-tabs-window-item>
            <v-tabs-window-item :value="2">
                <TableProduct />
            </v-tabs-window-item>
            <v-tabs-window-item :value="3">
                <UIAddProduct />
            </v-tabs-window-item>
        </v-tabs-window>
        <!-- <v-fab icon="mdi-plus" class="button__add" color="secondary"></v-fab> -->
    </section>
</template>

<script setup lang="ts">
const tab = ref(null)
</script>

<style lang="scss" scoped>
.search {
    width: 25%;
}

.button__add {
    position: fixed;
    right: 5rem;
    bottom: 3rem;
    z-index: 10;
}
</style>
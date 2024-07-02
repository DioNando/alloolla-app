<template>
    <section class="pa-2">
        <TextTitle :title="'Produits'" />
        <v-tabs v-model="tab" align-tabs="left" color="primary" class="mb-3">
            <v-tab append-icon="mdi-view-dashboard" :value="1">Affiche</v-tab>
            <v-tab append-icon="mdi-format-list-numbered" :value="2">Liste</v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
            <v-tabs-window-item :value="1">


                <UIProducts />

            </v-tabs-window-item>
            <v-tabs-window-item :value="2">


                <TableProduct />

            </v-tabs-window-item>
        </v-tabs-window>
    </section>
</template>
<script setup lang="ts">
const tab = ref(null)
</script>
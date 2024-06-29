<template>
    <section class="pa-2">
        <v-tabs v-model="tab" align-tabs="left" color="primary">
            <v-tab :value="1">Affiche</v-tab>
            <v-tab :value="2">Liste</v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
            <v-tabs-window-item :value="1">


                <UIArticles />

            </v-tabs-window-item>
            <v-tabs-window-item :value="2">


                <TableArticle />

            </v-tabs-window-item>
        </v-tabs-window>
    </section>
</template>
<script>
export default {
    data: () => ({
        tab: null,
    }),
}
</script>
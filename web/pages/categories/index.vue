<template>
    <section class="pa-2">
        <TextTitle :title="'Catégories'" />
        <div>
        </div>
        <v-row>
            <v-col cols="12" md="4">
                <FormCategory />
            </v-col>
            <v-col cols="12" md="8">
                <TableCategory />
            </v-col>
        </v-row>
    </section>
</template>

<script setup lang="ts">

</script>

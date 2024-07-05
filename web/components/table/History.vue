<template>
    <div>
        <v-skeleton-loader v-if="loading" class="border" type="table"></v-skeleton-loader>
        <v-table class="border" v-else fixed-header>
            <thead>
                <tr>
                    <th class="text-left">
                        ID
                    </th>
                    <th class="text-center">
                        Icone
                    </th>
                    <th class="text-left">
                        Description
                    </th>
                    <th class="text-left">
                        Date
                    </th>
                    <th class="text-left">
                        Heure
                    </th>
                    <th class="text-left">
                        Par
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="interaction in interactions" :key="interaction.id">
                    <td>{{ interaction.id }}</td>
                    <td class="text-center"><v-icon :icon="`mdi-` + interaction.icon" :color="interaction.color"></v-icon></td>
                    <td>{{ interaction.type }}</td>
                    <td>{{ interaction.created_at }}</td>
                    <td>{{ interaction.time }}</td>
                    <td>{{ interaction.user.name }}</td>
                </tr>
            </tbody>
        </v-table>

        <!-- <v-row justify="center">
            <v-col cols="10">
                <v-container class="max-width">
                    <v-pagination v-model="page" rounded :length="meta.last_page"></v-pagination>
                </v-container>
            </v-col>
        </v-row> -->
        <!-- <div>
            <div class="pagination">
                <v-btn @click="prevPage" :disabled="page <= 1">Previous</v-btn>
                <v-btn @click="nextPage" :disabled="page >= meta.last_page">Next</v-btn>
                <p>Page: {{ meta.current_page }} / {{ meta.last_page }}</p>
                <p>Total Users: {{ meta.total }}</p>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { getInteractions } from '@/api/interactionApi'

import { type Meta } from "~/interfaces/pagination.interface";

const interactions = ref<any[]>([]);
const meta = ref<Meta>({
    current_page: 0,
    from: 0,
    last_page: 0,
    links: [],
    path: '',
    per_page: 0,
    to: 0,
    total: 0
});

const page = ref(1);
const loading = ref(true);

const fetchInteractions = async () => {
    try {
        // const response = await getInteractions(page.value);
        const response = await getInteractions();
        interactions.value = response.data;
        // meta.value = response.meta;
        loading.value = false;
    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
};

const nextPage = () => {
    if (page.value < meta.value.last_page) {
        page.value++;
    }
};

const prevPage = () => {
    if (page.value > 1) {
        page.value--;
    }
};

onMounted(fetchInteractions);

watch(page, fetchInteractions);

</script>

<style lang="scss" scoped>
.active {
    font-weight: bold;
}

.pagination {
    width: 20vw;
}
</style>
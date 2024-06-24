<template>
    <div>
        <v-skeleton-loader v-if="loading" class="border" type="table"></v-skeleton-loader>
        <v-table class="border" v-else fixed-header>
            <thead>
                <tr>
                    <th class="text-left">
                        ID
                    </th>
                    <th class="text-left">
                        Nom
                    </th>
                    <th class="text-left">
                        Email
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                </tr>
            </tbody>
        </v-table>

        <div class="mt-2">
            <v-pagination v-model="page" :length="meta.last_page" rounded="circle"></v-pagination>
        </div>
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
import { ref } from 'vue';
import { getUsers } from '@/api/userApi'

import { type UserInterface, type Meta } from "~/interfaces/user.interface";

const users = ref<UserInterface[]>([]);
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

const fetchUsers = async () => {
    try {
        const response = await getUsers(page.value);
        users.value = response.data;
        meta.value = response.meta;
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

onMounted(fetchUsers);

watch(page, fetchUsers);

</script>

<style lang="scss" scoped>
.active {
    font-weight: bold;
}

.pagination {
    width: 20vw;
}
</style>
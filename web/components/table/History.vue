<template>
    <div>
        <v-skeleton-loader v-if="loading" class="border" type="table"></v-skeleton-loader>
        <v-table class="border" v-else fixed-header>
            <thead>
                <tr>
                    <th class="text-center">
                        Icone
                    </th>
                    <th class="text-left">
                        Type
                    </th>
                    <th class="text-left">
                        Description
                    </th>
                    <th class="text-left">
                        Date
                    </th>
                    <th class="text-left">
                        Par
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in auditLogs" :key="i.id">
                    <td class="text-center"><v-icon :icon="`mdi-` + i.icon" :color="i.color"></v-icon></td>
                    <td>{{ i.entity_type }}</td>
                    <td>{{ i.details }}</td>
                    <td>
                        <p>{{ i.date }}</p>
                        <p>{{ i.time }}</p>
                    </td>
                    <td>{{ i.user.name }}</td>
                </tr>
            </tbody>
        </v-table>

        <v-row justify="center">
            <v-col cols="10">
                <v-container class="max-width">
                    <v-pagination v-model="page" rounded :length="meta.last_page"></v-pagination>
                </v-container>
            </v-col>
        </v-row>
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
import { getAuditLogs } from '@/api/auditLogApi'

import type { Meta } from "~/interfaces/pagination.interface";
import type { AuditLogInterface } from "~/interfaces/auditLog.interface";

const auditLogs = ref<AuditLogInterface[]>([]);
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

const fetchAuditLogs = async () => {
    try {
        const response = await getAuditLogs(page.value);
        auditLogs.value = response.data;
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

onMounted(fetchAuditLogs);

watch(page, fetchAuditLogs);

</script>

<style lang="scss" scoped>
.active {
    font-weight: bold;
}

.pagination {
    width: 20vw;
}
</style>
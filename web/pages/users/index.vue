<template>
    <section class="pa-2">
        <TextTitle :title="'Utilisateurs'" />
        <div>
            <div class="d-flex ga-3 align-center justify-space-between mb-2">
                <!-- FIXME: null is not assignable -->
                <!-- <CardUser :user="userLogged" class="mb-2" /> -->
                <v-card color="primary" variant="text" min-width="344">
                    <v-card-title>
                        {{ userLogged?.name }}
                    </v-card-title>

                    <v-card-subtitle class="mb-4">
                        {{ userLogged?.email }}
                    </v-card-subtitle>
                </v-card>
                <v-btn :to="`/users/new`" class="" color="primary" icon="mdi-account-plus">
                </v-btn>
            </div>
            <v-row>
                <v-col cols="12" md="8">
                    <TableUser @user-emit="fetchUser" />
                </v-col>
                <v-col cols="12" md="4">
                    <FormUser :user="user" :loading="loading" />
                    <CardHistory :audit-logs="auditLogs" :loading="loading" />
                </v-col>
            </v-row>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { UserInterface } from "~/interfaces/user.interface"
import type { AuditLogInterface } from "~/interfaces/auditLog.interface";

import { getUser } from '@/api/userApi'


const authStore = useAuthStore();

authStore.initializeStore();

const user = ref<UserInterface>({
    id: 0,
    name: "",
    email: ""
});

const auditLogs = ref<AuditLogInterface[]>([])

const loading = ref(false);

const userLogged = authStore.user;

const fetchUser = async (data: number) => {
    loading.value = true;
    try {
        const response = await getUser(data);
        user.value = response.data;
        auditLogs.value = response.data.audit_logs
        loading.value = false;
    } catch (error) {
        console.error('Failed to fetch user:', error);
    }
};
</script>

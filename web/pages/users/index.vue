<template>
    <section class="pa-2">
        <TextTitle :title="'Utilisateurs'" />
        <div>
            <!-- FIXME: null is not assignable -->
            <CardUser :user="userLogged" class="mb-2" />
            <v-row>
                <v-col cols="12" md="8">
                    <TableUser @user-emit="fetchUser" />
                </v-col>
                <v-col cols="12" md="4">
                    <FormUser :user="user" :loading="loading" />
                    <CardHistory :interactions="interactions" :loading="loading" />
                </v-col>
            </v-row>
        </div>
    </section>
</template>

<script setup lang="ts">
import { type UserInterface } from "~/interfaces/user.interface"
import { getUser } from '@/api/userApi'


const authStore = useAuthStore();

authStore.initializeStore();

const user = ref<UserInterface>({
    id: 0,
    name: "",
    email: ""
});

const interactions = ref([] as any)

const loading = ref(false);

const userLogged = authStore.user;

// const handleUser = (data: number) => {
//     alert(data);
// }

const fetchUser = async (data: number) => {
    loading.value = true;
    try {
        const response = await getUser(data);
        user.value = response.data;
        interactions.value = response.data.interactions
        loading.value = false;
        console.log(interactions.value)
    } catch (error) {
        console.error('Failed to fetch user:', error);
    }
};
</script>

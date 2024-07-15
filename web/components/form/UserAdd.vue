<template>
    <v-row justify="center" class="mb-12">
        <v-col cols="12" md="5">
            <v-form>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="user.name" label="Nom" variant="outlined"
                            :rules="rules.nameRules"></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field v-model="user.email" label="Email" variant="outlined"
                            :rules="rules.emailRules"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="user.password" label="Mot de passe" variant="outlined"
                            :rules="rules.passwordRules" type="password"></v-text-field>
                    </v-col>
                    <v-col>
                        <div class="d-flex flex-column flex-lg-row justify-end ga-3">
                            <v-btn class="" variant="flat" @click="resetValidation">
                                Effacer
                            </v-btn>
                            <v-btn class="" color="primary" append-icon="mdi-account-plus" @click="formAddUser"
                                :loading="loading">
                                Ajouter
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-form>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import type { UserInterface } from "@/interfaces/user.interface";
import { addUser } from '@/api/userApi'

const router = useRouter()
const loading = ref(false)

const rules = ref<any>({
    nameRules: [
        value => {
            if (value) return true;
            return 'Le nom est requis.';
        },
        value => {
            if (value?.length <= 10) return true;
            return 'Le nom doit comporter moins de 10 caractères.';
        },
    ],
    emailRules: [
        value => {
            if (value) return true;
            return 'L\'e-mail est requis.';
        },
        value => {
            if (/.+@.+\..+/.test(value)) return true;
            return 'L\'e-mail doit être valide.';
        },
    ],
    passwordRules: [
        value => {
            if (value) return true;
            return 'Le mot de passe est requis.';
        },]
})

const user = ref<UserInterface>({
    name: "",
    email: "",
    password: "",
});

const resetValidation = () => {
    user.value = {
        name: "",
        email: "",
        password: "",
    };
}

const formAddUser = async () => {
    loading.value = true;
    try {
        const response = await addUser(user.value);
        loading.value = false;
        if (response) {
            router.push('/users');
            // TODO: add notification
        }
    } catch (error) {
        console.error('Failed to add user:', error);
    }
};
</script>

<style lang="scss" scoped>
.form-container {
    display: flex;
    justify-content: center;

    @media only screen and (max-width: 1200px) {
        width: 50%;
    }

    @media only screen and (max-width: 900px) {
        width: 50%;
    }

    @media only screen and (max-width: 600px) {
        width: 50%;
    }

    &__sub {
        flex: auto;
    }
}
</style>

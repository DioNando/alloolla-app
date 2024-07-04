<template>
    <v-row justify="center" class="mb-3">
        <v-col cols="12">
            <div>
                <v-card append-icon="mdi-account" class="mx-auto" title="Informations sur l'utilisateur" variant="tonal"
                    color="primary">
                </v-card>
            </div>
            <v-card variant="flat" color="transparent" class="pt-4">
                <v-form>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="user.firstname" :counter="10" :rules="user.nameRules" label="Nom"
                                hide-details required variant="outlined"></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field v-model="user.lastname" :counter="10" :rules="user.nameRules"
                                label="Tarif régulier" hide-details required variant="outlined"></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field v-model="user.email" :rules="user.emailRules" label="Résumé" hide-details
                                required variant="outlined"></v-text-field>
                        </v-col>
                        <v-col>
                            <div class="d-flex flex-column flex-lg-row justify-end ga-3">
                                <!-- <v-btn class="" variant="flat" click="validate">
                                    Effacer
                                </v-btn> -->
                                <v-btn class="" color="primary" @click="resetValidation" append-icon="mdi-pencil">
                                    Modifier
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
const props = defineProps<{
    product: any
}>()

const user = ref<any>({
    valid: false,
    firstname: '',
    lastname: '',
    nameRules: [
        value => {
            if (value) return true

            return 'Name is required.'
        },
        value => {
            if (value?.length <= 10) return true

            return 'Name must be less than 10 characters.'
        },
    ],
    email: '',
    emailRules: [
        value => {
            if (value) return true

            return 'E-mail is requred.'
        },
        value => {
            if (/.+@.+\..+/.test(value)) return true

            return 'E-mail must be valid.'
        },
    ],
});
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
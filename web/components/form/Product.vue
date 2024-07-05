<template>
    <v-row justify="center" class="mb-12">
        <v-col cols="12" md="5">
            <div>
                <v-card append-icon="mdi-archive" class="mx-auto" title="Ajouter un nouveau produit" variant="tonal"
                    color="primary">
                </v-card>
            </div>
            <v-form>
                <div class="text-h5 text-bold my-5">Renseignements de base</div>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="user.firstname" :counter="10" :rules="user.nameRules" label="Nom"
                            hide-details required variant="outlined"></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field v-model="user.lastname" :counter="10" :rules="user.nameRules" label="Tarif régulier"
                            hide-details required variant="outlined"></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field v-model="user.email" :rules="user.emailRules" label="Résumé" hide-details required
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea label="Description" variant="outlined" hide-details></v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <v-file-input prepend-icon="mdi-image" label="Images" variant="outlined" hide-details></v-file-input>
                    </v-col>
                    <v-col>
                        <div class="d-flex flex-column flex-lg-row justify-end ga-3">
                            <v-btn class="" variant="flat"click="validate">
                                Effacer
                            </v-btn>

                            <v-btn class="" color="primary" variant="outlined" @click="reset" append-icon="mdi-cloud-upload">
                                Publier
                            </v-btn>

                            <v-btn class="" color="primary" @click="resetValidation" append-icon="mdi-archive">
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
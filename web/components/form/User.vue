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
                            <v-text-field v-model="props.user.id" label="ID" variant="outlined" disabled
                                hide-details></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field v-model="props.user.name" label="Nom" variant="outlined"
                                hide-details></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field v-model="props.user.email" label="Email" variant="outlined"
                                hide-details></v-text-field>
                        </v-col>
                        <v-col v-if="props.user.id != 0 && !loading">
                            <div class="d-flex flex-column flex-lg-row justify-end ga-3">
                                <!-- <v-btn class="" variant="flat" click="validate">
                                    Effacer
                                </v-btn> -->
                                <v-btn :to="`/users/${props.user.id}`" class="" color="primary"
                                    append-icon="mdi-pencil">
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
import type { UserInterface } from "@/interfaces/user.interface"

const props = defineProps<{
    user: UserInterface,
    loading: boolean
}>()
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
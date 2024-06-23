<template>
    <v-app id="app">
        <section>
            <template v-if="error?.statusCode === 404">
                <div class="error__content">
                    <div class="text-primary text-h2">404!</div>
                    <div class="text-h4">Desolé, cette page n'existe pas.</div>
                    <div>
                        <v-btn append-icon="mdi-home" color="primary" rounded variant="outlined" class="mt-4 text-none"
                            @click="handleError">Retour à l'accueil
                        </v-btn>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="error__content">
                    <div class="text-primary text-h3">Dang</div>
                    <div class="text-primary text-h2">Erreur {{ error?.statusCode }}</div>
                    <p class="text-h4">Il semble avoir un problème.</p>
                    <p class="text-h5">Desolé pour ça.</p>
                    <div>
                        <v-btn append-icon="mdi-home" color="primary" rounded variant="outlined" class="mt-4 text-none"
                            @click="handleError">Retour à l'accueil</v-btn>
                    </div>
                </div>
            </template>
        </section>
    </v-app>
</template>

<script setup lang="ts">
const error = useError();

const handleError = () => {
    clearError({
        redirect: '/',
    });
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/style.scss";

section {
    width: 100%;
    height: 100%;
    position: relative;
    @extend %flex-center-el;
    text-align: center;
}

.error__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    z-index: 10;
    gap: .5rem;

    div {
        font-weight: bold;
    }
}

.v-btn {
    font-size: 1.5rem;
    padding: 2rem;
    @extend %flex-center-el;
    border-radius: 2rem;
}
</style>
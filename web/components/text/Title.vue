<template>
    <div>
        <!-- <p class="title" :class="themeStore.isDark ? 'dark' : 'light'">{{ props.title }}</p> -->
        <p class="title bg-primary">{{ props.title }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string
}>()

const themeStore = useThemeStore()
</script>

<style lang="scss" scoped>
@import "~/assets/scss/style.scss";

.title {
    font-size: clamp(1rem, 7vw, 2rem);
    font-weight: 900;
    // margin: 1rem 0;
    margin-bottom: 1rem;
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
}

.light {
    background-image: linear-gradient(45deg, $secondary, $primary, $primary, $primary);
}

.dark {
    background-image: linear-gradient(45deg, $primary, $secondary, $secondary, $secondary);
}
</style>
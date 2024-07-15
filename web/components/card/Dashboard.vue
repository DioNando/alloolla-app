<template>
    <v-card class="dash_card" variant="flat" :class="[themeStore.isDark ? '' : 'bg-grey-lighten-3']" >
        <v-card-title class="text-overline">
            <div class="text-primary text-h6 font-weight-medium">{{ props.reports.description }}</div>
        </v-card-title>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
    reports: any
}>()

const themeStore = useThemeStore()

</script>

<style lang="scss" scoped>
.dash_card {
    flex: auto;
}
</style>
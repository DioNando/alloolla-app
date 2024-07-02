<template>
    <div>
        {{ props.product }}
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    product: any
}>()
</script>

<style scoped></style>
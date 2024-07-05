<template>
    <v-card variant="tonal" append-icon="mdi-history" class="pa-4" title="Historique">
        <v-skeleton-loader v-if="props.loading" type="list-item"></v-skeleton-loader>
        <v-timeline v-else density="comfortable" truncate-line="both" side="end">
            <v-timeline-item v-for="i in props.interactions" key="i.id" :dot-color="i.color" size="small">
                <div class="d-flex">
                    <div class="d-flex flex-column">
                        <strong>{{ i.created_at }}</strong>
                        <span>{{ i.time }}</span>
                    </div>
                    <div>
                        <div class="d-flex align-center ga-1"><v-icon :icon="`mdi-` + i.icon"
                                size="small"></v-icon><strong>{{ i.type }}</strong></div>
                        <div class="text-caption">
                            {{ i.product.name }}
                        </div>
                    </div>
                </div>
            </v-timeline-item>
        </v-timeline>
    </v-card>

</template>

<script setup lang="ts">

const props = defineProps<{
    interactions: any,
    loading: boolean
}>()
</script>
<template>
    <v-card variant="flat" color="transparent" append-icon="mdi-history" title="Historique">
        <v-skeleton-loader v-if="props.loading" type="list-item" class="ma-3 mt-0"></v-skeleton-loader>
        <v-timeline v-else density="comfortable" truncate-line="both" side="end">
            <v-timeline-item v-for="i in props.auditLogs" key="i.id" :dot-color="i.color" size="small" :icon="i.icon">
                <!-- <div class="d-flex">
                    <div class="d-flex flex-column">
                        <strong>{{ i.date }}</strong>
                        <span>{{ i.time }}</span>
                    </div>
                    <div>
                        <div class="d-flex align-center ga-1"><v-icon :icon="`mdi-` + i.icon"
                                size="small"></v-icon><strong>{{ i.action }}</strong></div>
                        <div class="text-caption">
                            {{ i.details }}
                        </div>
                    </div>
                </div> -->
                <v-card variant="flat" :color="i.color" class="d-flex flex-column pa-3 timeline-card">
                    <div class="d-flex align-center ga-1"><v-icon :icon="`mdi-` + i.icon"
                            size="small"></v-icon><strong>{{ i.action }}</strong></div>
                    <div class="text-caption text-weight-bold">{{ i.date }}</div>
                    <span class="text-caption">{{ i.time }}</span>
                    <div class="text-caption">
                        {{ i.details }}
                    </div>
                </v-card>
            </v-timeline-item>
        </v-timeline>
    </v-card>

</template>

<script setup lang="ts">
import type { AuditLogInterface } from "~/interfaces/auditLog.interface";

const props = defineProps<{
    auditLogs: AuditLogInterface[],
    loading: boolean
}>()
</script>

<style lang="scss" scoped>
.timeline-card {
    width: 100%;
}
</style>
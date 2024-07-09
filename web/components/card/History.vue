<template>
    <v-card variant="tonal" append-icon="mdi-history" title="Historique">
        <v-skeleton-loader v-if="props.loading" type="list-item" class="ma-3 mt-0"></v-skeleton-loader>
        <v-timeline v-else density="comfortable" truncate-line="both" side="end">
            <v-timeline-item v-for="i in props.auditLogs" key="i.id" :dot-color="i.color" size="small">
                <div class="d-flex">
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
                </div>
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
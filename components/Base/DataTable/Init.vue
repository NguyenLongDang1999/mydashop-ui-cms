<script setup lang="ts" generic="T">

// ** Props & Emits
interface Props {
    dataTable: T[]
    dataAggregations?: number
    columns: Columns[]
    loading?: boolean
}

defineProps<Props>()
</script>

<template>
    <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
        <UTable
            :rows="dataTable as any"
            :columns="columns"
            :loading="loading"
            class="w-full"
        >
            <template
                v-for="col in columns"
                :key="col.key"
                #[`${col.key}-data`]="{ row, column }"
            >
                <slot
                    :row="row"
                    :column="column"
                />
            </template>
        </UTable>
    </div>

    <BasePagination
        v-if="dataAggregations"
        :data-aggregations="dataAggregations"
    />
</template>

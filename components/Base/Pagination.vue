<script setup lang="ts">

// ** Props & Emits
interface Props {
    dataAggregations: number
}

defineProps<Props>()

const search = inject('search') as IPagination

// ** Computed
const currentPage = computed({
    get: () => search.page ?? PAGE.CURRENT,
    set: (value: number) => search.page = value
})

const currentPageSize = computed(() => search.pageSize ?? PAGE.SIZE)
</script>

<template>
    <div class="mt-4 flex flex-wrap justify-between items-center">
        <UPagination
            v-model="currentPage"
            :page-count="currentPageSize"
            :total="dataAggregations"
        />
    </div>
</template>

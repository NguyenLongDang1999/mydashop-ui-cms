<script setup lang="ts">

// ** Types Imports
import type { BreadcrumbLink } from '#ui/types'

// ** Props & Emits
interface Props {
    closeButton?: () => void
}

const props = defineProps<Props>()

const emits = defineEmits(['imageUrl'])

// ** useHooks
const { search, dataTable, isFetching, pathSplit, pathURL } = useFileManagerDataTable()
const { mutateAsync, isPending } = useFileManagerDelete()

// ** Data
pathURL.value = ''

const links = ref<BreadcrumbLink[]>([{
    label: 'Home',
    icon: 'i-heroicons-home'
}])

// ** Watch
watch(pathURL, () => {
    links.value.splice(1)

    if (pathURL.value) {
        pathSplit.value.forEach((_p, index) => {
            links.value.push({
                label: _p,
                icon: 'i-heroicons-folder',
                index
            })
        })
    }
})

watch(() => props.closeButton, () => pathURL.value = '')
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Danh sách Files
                </h2>

                <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    class="-my-1"
                    @click="closeButton"
                />
            </div>
        </template>

        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12">
                <div class="bg-slate-100 px-3 py-2 rounded-md">
                    <UBreadcrumb
                        :links="links"
                        :ui="{ li: 'cursor-pointer' }"
                    >
                        <template #default="{ link }">
                            <span @click="pathURL = pathSplit.slice(0, link.index + 1).join(',')">{{ link.label }}</span>
                        </template>
                    </UBreadcrumb>
                </div>
            </div>

            <div class="col-span-12">
                <div class="flex gap-2">
                    <FileManagerCreateFolder />
                    <FileManagerUploadFile />
                </div>
            </div>

            <div class="col-span-3">
                <FormInput
                    v-model="search"
                    label="Tìm Kiếm"
                    name="search_file"
                    autocomplete="off"
                />
            </div>
        </div>

        <BaseDataTableInit
            v-slot="{ row, column }"
            :data-table="dataTable"
            :columns="fileManagerColumns"
            :loading="isFetching || isPending"
        >
            <BaseDataTableColumnFileManager
                v-if="areValuesEqual(column.key, FILE_MANAGER_KEYS.NAME)"
                :row="row"
                :close-button="closeButton"
                @image-url="val => emits('imageUrl', val)"
            />

            <span v-if="areValuesEqual(column.key, FILE_MANAGER_KEYS.SIZE)">{{ row.Length ? (row.Length / 1000).toFixed(2) + ' kB' : '-' }} </span>

            <span v-if="areValuesEqual(column.key, FILE_MANAGER_KEYS.DATE_MODIFIED)">
                {{ formatDateTime(row.DateCreated) }}
            </span>

            <div
                v-if="areValuesEqual(column.key, CORE_KEYS.ACTION)"
                class="flex gap-2"
            >
                <UButton
                    v-if="row.Length"
                    icon="i-heroicons-eye"
                    size="sm"
                    square
                    variant="solid"
                    target="_blank"
                    :to="getPathImageFile(formatPathFile(row.Path, row.ObjectName))"
                />

                <BaseConfirm
                    :remove="() => mutateAsync({
                        folder_name: row.ObjectName,
                        is_folder: !row.Length
                    })"
                />
            </div>
        </BaseDataTableInit>
    </UCard>
</template>

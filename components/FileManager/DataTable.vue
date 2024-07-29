<script setup lang="ts">

// ** Types Imports
import type { BreadcrumbLink } from '#ui/types'

// ** Props & Emits
interface Props {
    closeButton?: () => void
}

const props = defineProps<Props>()

defineEmits(['imageUrl'])

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

// ** Methods
const generateDynamicPath = (objectName: string) => {
    const pathArray = (pathURL.value as string)
        .split(',')
        .filter(segment => segment.trim() !== '')

    pathArray.push(objectName)

    pathURL.value = pathArray.join(',')
}
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

        <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
            <UTable
                :rows="dataTable"
                :columns="fileManagerColumns"
                :loading="Boolean(isFetching) || Boolean(isPending)"
                class="w-full"
            >
                <template #name-data="{ row }">
                    <ULink
                        v-if="!row.Length"
                        class="flex items-center gap-2 font-medium text-primary hover:underline"
                        @click="generateDynamicPath(row.ObjectName)"
                    >
                        <UIcon name="i-heroicons-folder" />
                        <span class="truncate flex-1">{{ row.ObjectName }}</span>
                    </ULink>

                    <UPopover
                        v-else
                        mode="hover"
                    >
                        <div
                            class="flex items-center gap-2 font-medium w-full"
                            @click="closeButton"
                        >
                            <UIcon
                                name="i-heroicons-document"
                                @click="$emit('imageUrl', formatPathFile(row.Path, row.ObjectName))"
                            />
                            <span
                                class="truncate flex-1"
                                @click="$emit('imageUrl', formatPathFile(row.Path, row.ObjectName))"
                            >{{ row.ObjectName }}</span>
                        </div>

                        <template #panel>
                            <div class="p-2">
                                <UAvatar
                                    :src="getPathImageFile(formatPathFile(row.Path, row.ObjectName))"
                                    :alt="row.ObjectName"
                                    size="lg"
                                />
                            </div>
                        </template>
                    </UPopover>
                </template>

                <template #size-data="{ row }">
                    <span>{{ row.Length ? (row.Length / 1000).toFixed(2) + ' kB' : '-' }} </span>
                </template>

                <template #date_modified-data="{ row }">
                    <span>{{ formatDateTime(row.DateCreated) }}</span>
                </template>

                <template #actions-data="{ row }">
                    <div class="flex gap-2">
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
                </template>
            </UTable>
        </div>
    </UCard>
</template>

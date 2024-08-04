<script setup lang="ts">

// ** Props & Emits
interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any
    closeButton?: () => void
}

defineProps<Props>()

defineEmits(['imageUrl'])

// ** useHooks
const { pathURL } = useFileManager()

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

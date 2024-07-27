<script setup lang="ts">

// ** Props & Emits
interface Props {
    label?: string
    name?: string
    modelValue?: string | null
}

const props = withDefaults(defineProps<Props>(), {
    label: 'Ảnh đại diện',
    name: 'image_uri'
})

// ** useHooks
const { value, setValue, errorMessage } = useField(() => props.name, undefined, {
    syncVModel: true,
    initialValue: props.modelValue
})

// ** Data
const isOpen = ref<boolean>(false)
</script>

<template>
    <UFormGroup
        :label="label"
        :name="name"
        :error="errorMessage"
    >
        <div class="flex items-center gap-3">
            <div
                v-if="value"
                class="relative group"
            >
                <UAvatar
                    :src="getPathImageFile(value as string)"
                    size="3xl"
                    icon="i-heroicons-photo"
                    class="w-40 h-40 group-hover:opacity-10"
                    :ui="{
                        rounded: 'rounded-md object-cover',
                        size: {
                            '3xl': 'h-40 w-40'
                        }
                    }"
                />

                <div
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform scale-0 group-hover:scale-100 cursor-pointer"
                    @click="setValue(null)"
                >
                    <UIcon
                        name="i-heroicons-trash"
                        class="w-7 h-7 text-gray-400"
                    />
                </div>
            </div>

            <div class="w-40 h-40">
                <label
                    class="flex w-full h-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300"
                    @click="isOpen = true"
                >
                    <div class="space-y-1 text-center">
                        <UIcon
                            name="i-heroicons-plus"
                            class="w-7 h-7 text-gray-400"
                        />
                    </div>
                </label>
            </div>

            <UModal
                v-model="isOpen"
                :ui="{
                    width: 'sm:max-w-5xl'
                }"
            >
                <FileManagerDataTable
                    :close-button="() => isOpen = false"
                    @image-url="val => setValue(val)"
                />
            </UModal>
        </div>
    </UFormGroup>
</template>

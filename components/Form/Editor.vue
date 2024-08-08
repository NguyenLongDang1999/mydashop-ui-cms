<script setup lang="ts">

// ** Props & Emits
interface Props {
    name: string
    label?: string
    modelValue?: string
}

const props = defineProps<Props>()

// ** useHooks
const { value, errorMessage } = useField(() => props.name, undefined, {
    syncVModel: true
})

// ** Computed
const error = computed(() => errorMessage.value)
</script>

<template>
    <UFormGroup
        :label="label"
        :name="name"
        :error="error"
    >
        <ClientOnly>
            <QuillEditor
                v-model:content="value"
                theme="snow"
                toolbar="full"
                class="!h-[400px] rounded-b-md"
                content-type="html"
                v-bind="$attrs"
            />
        </ClientOnly>
    </UFormGroup>
</template>

<script setup lang="ts">

// ** Props & Emits
interface Props {
    name: string
    label?: string
    labelToggle?: string
    modelValue?: boolean
}

const props = defineProps<Props>()

// ** useHooks
const { value, errorMessage } = useField(() => props.name, undefined, {
    syncVModel: true,
    initialValue: props.modelValue
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
        <div class="flex items-center gap-2">
            <UToggle
                v-model="value"
                v-bind="$attrs"
            />

            <span>{{ labelToggle }}</span>
        </div>
    </UFormGroup>
</template>

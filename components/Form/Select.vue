<script setup lang="ts">

// ** Validations Imports
import type { IOptions } from '~/validations/core'

// ** Props & Emits
interface Props {
    name: string
    label?: string
    options: IOptions[]
    modelValue?: string | number | string[] | (number | undefined)[]
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
        <USelectMenu
            v-model="value"
            :options="options"
            searchable
            placeholder="Vui Lòng Chọn"
            value-attribute="id"
            option-attribute="name"
            searchable-lazy
            :loading="Boolean($attrs.loading)"
            v-bind="$attrs"
        />
    </UFormGroup>
</template>

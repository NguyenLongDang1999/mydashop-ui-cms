<script setup lang="ts">

// ** Third Party Imports
import { CurrencyDisplay, useCurrencyInput } from 'vue-currency-input'

// ** Props & Emits
interface Props {
    name: string
    label?: string
    textTrailing?: string
    modelValue?: string | number
}

const props = defineProps<Props>()

// ** useHooks
const { inputRef, numberValue, formattedValue, setValue } = useCurrencyInput({
    currency: 'VND',
    currencyDisplay: CurrencyDisplay.hidden
})

const { value, errorMessage, handleChange } = useField(() => props.name, undefined, {
    syncVModel: true,
    initialValue: props.modelValue
})

// ** Lifecycle
onMounted(() => {
    setTimeout(() => setValue(Number(value.value)), 300)
})

// ** Watch
watch(numberValue, newValue => handleChange(newValue))
watch(() => props.modelValue, newValue => setValue(newValue as number))

// ** Computed
const error = computed(() => errorMessage.value)
</script>

<template>
    <UFormGroup
        :label="label"
        :name="name"
        :error="error"
    >
        <UInput
            ref="inputRef"
            v-model="formattedValue"
            v-bind="$attrs"
        >
            <template
                v-if="textTrailing"
                #trailing
            >
                <span class="text-gray-500 dark:text-gray-400 text-xs">{{ textTrailing }}</span>
            </template>
        </UInput>
    </UFormGroup>
</template>

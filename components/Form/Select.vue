<script setup lang="ts">

// ** Validations Imports
import type { IOptions } from '~/validations/core';

// ** Props & Emits
interface Props {
    name: string
    label?: string
    multiple?: boolean
    options: IOptions[]
    modelValue?: string | number | string[] | (number | undefined)[]
    colour?: boolean
    routePage?: string
}

const props = defineProps<Props>()

// ** useHooks
const { value, errorMessage } = useField(() => props.name, undefined, {
    syncVModel: true,
    initialValue: props.multiple && Array.isArray(props.modelValue)
        ? props.modelValue || []
        : props.modelValue || undefined
})

// ** Computed
const error = computed(() => errorMessage.value)
const dataList = computed(() => props.options.filter(option => 
    Array.isArray(value.value) && (value.value as number[])?.includes(option.id as number)
))

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
            :multiple="multiple"
            :loading="Boolean($attrs.loading)"
            v-bind="$attrs"
        >
            <template #label>
                <span
                    v-if="!Array.isArray(value)"
                    class="flex gap-1"
                >
                    <span
                        v-if="colour"
                        class="flex items-center -space-x-1"
                    >
                        <span
                            class="flex-shrink-0 w-2 h-2 mt-px rounded-full"
                            :class="`bg-${valueTransform(options, value)?.id}-500`"
                        />
                    </span>

                    <span>{{ valueTransform(options, value)?.name || 'Vui Lòng Chọn' }}</span>
                </span>

                <span v-else>
                    {{ dataList.length }} được chọn
                </span>
            </template>

            <template
                v-if="colour"
                #option="{ option }"
            >
                <span
                    class="flex-shrink-0 w-2 h-2 mt-px rounded-full"
                    :class="`bg-${option.id}-500`"
                />
                <span class="truncate">{{ option.name }}</span>
            </template>
        </USelectMenu>

        <div
            v-if="Array.isArray(value)"
            class="flex flex-wrap gap-1 mt-1"
        >
            <template v-for="option in options">
                <UButton
                    v-if="value.includes(option.id as never)"
                    :key="option.id"
                    :label="option.name.replace(/\|---/g, '')"
                    :to="routePage ? goToPage(ROUTER.PRODUCT_GENERAL, option.id as string, routePage) : undefined"
                    size="2xs"
                    variant="outline"
                />
            </template>
        </div>
    </UFormGroup>
</template>

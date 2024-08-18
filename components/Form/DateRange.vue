<script setup lang="ts">

// ** Props & Emits
interface Props {
    name: string
    label?: string
    data?: IDateRange
}

const props = defineProps<Props>()

// ** useHooks
const { value, errorMessage } = useField(() => props.name, undefined, {
    syncVModel: true,
    initialValue: {
        start: props.data?.start_date ? new Date(props.data.start_date) : new Date(),
        end: props.data?.end_date ? new Date(props.data.end_date) : new Date()
    }
})

// ** Computed
const error = computed(() => errorMessage.value)
const formatDate = computed(() => `${formatDateTime(value.value.start)} - ${formatDateTime(value.value.end)}`)
</script>

<template>
    <UFormGroup
        :label="label"
        :name="name"
        :error="error"
    >
        <ClientOnly>
            <UPopover :popper="{ placement: 'bottom-start' }">
                <UButton
                    :label="formatDate"
                    icon="i-heroicons-calendar-days-20-solid"
                    variant="outline"
                    block
                    class="justify-start"
                />

                <template #panel="{ close }">
                    <BaseDatePicker
                        v-model.range="value"
                        mode="dateTime"
                        v-bind="$attrs"
                        @close="close"
                    />
                </template>
            </UPopover>
        </ClientOnly>
    </UFormGroup>
</template>

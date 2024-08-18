<script setup lang="ts">

// ** Props & Emits
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:model-value', 'close'])

// ** Computed
const date = computed({
    get: () => props.modelValue,
    set: value => {
        emit('update:model-value', value)
        emit('close')
    }
})

const attrs = [{
    key: 'today',
    highlight: {
        color: 'blue',
        fillMode: 'outline',
        class: '!bg-gray-100 dark:!bg-gray-800'
    },
    dates: new Date()
}]
</script>

<template>
    <VDatePicker
        v-model="date"
        transparent
        borderless
        trim-weeks
        title-position="left"
        :attributes="attrs"
        :first-day-of-week="2"
    />
</template>

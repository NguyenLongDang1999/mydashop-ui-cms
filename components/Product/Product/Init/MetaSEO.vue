<script setup lang="ts">

// ** Validations Imports
import { label } from '~/validations/product'

// ** Props & Emits
interface Props {
    number?: number
}

withDefaults(defineProps<Props>(), {
    number: 4
})
</script>

<template>
    <div class="col-span-12">
        <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
            {{ number }}. Meta SEO
        </p>
    </div>

    <div class="col-span-12">
        <FormInput
            :label="label.meta_title"
            name="meta_title"
        />
    </div>

    <div class="col-span-12">
        <FormInput
            :label="label.meta_description"
            name="meta_description"
        />
    </div>
</template>

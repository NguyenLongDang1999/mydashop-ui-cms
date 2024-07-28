<script setup lang="ts">

// ** useHooks
const { data } = useSettingSystemDataList('secret_key_bunnycdn_')
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Thiết lập hệ thống
                </h2>

                <SettingSystemCreate />
            </div>
        </template>

        <div
            v-for="(item, index) in data"
            :key="item.id"
            :class="index !== 0 ? 'mt-4' : ''"
            class="grid gap-4 grid-cols-12"
        >
            <div class="col-span-5">
                <FormSelect
                    v-if="areValuesEqual(item.input_type, INPUT_TYPE.SELECT)"
                    :model-value="item.value"
                    :label="item.label"
                    :options="item.setting_system_options || []"
                    name="value"
                    disabled
                />

                <FormInput
                    v-if="areValuesEqual(item.input_type, INPUT_TYPE.TEXT)"
                    :model-value="item.value"
                    :label="item.label"
                    name="value"
                    disabled
                />

                <FormTextarea
                    v-if="areValuesEqual(item.input_type, INPUT_TYPE.TEXTAREA)"
                    :model-value="item.value"
                    :label="item.label"
                    name="value"
                    disabled
                />

                <UFormGroup
                    v-if="areValuesEqual(item.input_type, INPUT_TYPE.UPLOAD)"
                    :label="item.label"
                    :name="item.key"
                >
                    <NuxtImg
                        :src="item.value"
                        class="rounded-md"
                    />
                </UFormGroup>
            </div>

            <div class="col-span-1 mt-6">
                <SettingSystemUpdate :setting-system="item" />
            </div>
        </div>
    </UCard>
</template>

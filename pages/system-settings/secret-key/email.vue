<script setup lang="ts">

// ** useHooks
const { data } = useSettingSystemDataList('secret_key_email_')
</script>

<template>
    <section>
        <BaseTitle
            label="Thiết lập WEBSITE"
            title="Thiết lập Secret key"
        />

        <div class="mt-8 pb-24 max-w-none flex">
            <div class="w-40 mr-7 lg:flex gap-4 flex-col">
                <SettingSystemSecretKeyVerticalNavigation />
            </div>

            <div class="lg:w-[calc(100%-180px)] w-full">
                <UCard>
                    <template #header>
                        <div class="flex justify-between items-center">
                            <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                                Chỉnh sửa Secret Key Email
                            </h2>

                            <SettingSystemCreate />
                        </div>
                    </template>

                    <template v-if="data?.length">
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
                    </template>

                    <div
                        v-else
                        class="flex flex-col items-center justify-center py-6 gap-3"
                    >
                        <span class="italic text-sm">No one here!</span>
                        <SettingSystemCreate />
                    </div>
                </UCard>
            </div>
        </div>
    </section>
</template>

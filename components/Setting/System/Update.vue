<script setup lang="ts">

// ** Validations Imports
import { label, settingSystemFormSchema, type ISettingSystemForm } from '~/validations/setting-system'

// ** Props & Emits
interface Props {
    settingSystem: ISettingSystemForm
}

const props = defineProps<Props>()

// ** useHooks
const { isPending, mutateAsync } = useSettingSystemFormInput()

const { handleSubmit, values: setting, setFieldValue } = useForm<ISettingSystemForm>({
    validationSchema: settingSystemFormSchema,
    initialValues: _omitBy(props.settingSystem, _isNil),
    keepValuesOnUnmount: true
})

// ** Data
const isOpen = ref<boolean>(false)

// ** Computed
const inputTypeIsSelect = computed(() => areValuesEqual(setting.input_type, INPUT_TYPE.SELECT))

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync(values)
    isOpen.value = false
})
</script>

<template>
    <UButton
        icon="i-heroicons-pencil-square"
        size="sm"
        color="orange"
        variant="soft"
        @click="isOpen = true"
    />

    <UModal
        v-model="isOpen"
        prevent-close
    >
        <UForm
            :state="settingSystemFormSchema"
            @submit="onSubmit"
        >
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <h2 class="capitalize my-0 font-semibold text-xl text-gray-900 dark:text-white leading-tight">
                            Chỉnh sửa thiết lập
                        </h2>

                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="isOpen = false"
                        />
                    </div>
                </template>

                <div class="grid gap-4 grid-cols-12">
                    <div class="col-span-12">
                        <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                            1. Thông tin chung
                        </p>
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :label="label.label"
                            name="label"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :label="label.key"
                            name="key"
                        />
                    </div>

                    <div class="col-span-12">
                        <FormTextarea
                            :label="label.description"
                            name="description"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="label.input_type"
                            :options="optionInputType"
                            name="input_type"
                        />
                    </div>

                    <template v-if="inputTypeIsSelect">
                        <div class="col-span-12">
                            <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                                2. Khởi tạo các chọn lựa cho thiết lập
                            </p>
                        </div>

                        <div class="col-span-12">
                            <FieldArray
                                v-slot="{ push, remove }"
                                name="setting_system_options"
                            >
                                <UButton
                                    icon="i-heroicons-plus"
                                    size="sm"
                                    color="primary"
                                    variant="solid"
                                    label="Thêm Lựa Chọn"
                                    :trailing="false"
                                    @click="push({ id: '', name: '' })"
                                />

                                <div class="flex flex-col gap-4 mt-4">
                                    <div
                                        v-for="(value, index) in setting.setting_system_options"
                                        :key="index"
                                        class="grid gap-4 grid-cols-12"
                                    >
                                        <div class="col-span-4">
                                            <FormInput
                                                :label="label.setting_system_options.id"
                                                :name="`setting_system_options.${index}.id`"
                                            />
                                        </div>

                                        <div class="col-span-4">
                                            <FormInput
                                                :label="label.setting_system_options.name"
                                                :name="`setting_system_options.${index}.name`"
                                            />
                                        </div>

                                        <div class="col-span-3">
                                            <UButton
                                                :ui="{ rounded: 'rounded-full' }"
                                                icon="i-heroicons-trash"
                                                size="sm"
                                                color="red"
                                                variant="solid"
                                                class="mt-6"
                                                @click="setFieldValue('value', ''), remove(index)"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </FieldArray>
                        </div>
                    </template>

                    <div class="col-span-12">
                        <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                            {{ inputTypeIsSelect ? '3' : '2' }}. Nhập giá trị mặc định
                        </p>
                    </div>

                    <div class="col-span-12">
                        <FormSelect
                            v-if="inputTypeIsSelect"
                            :label="label.value"
                            :options="setting.setting_system_options ?? []"
                            name="value"
                        />

                        <FormInput
                            v-if="areValuesEqual(setting.input_type, INPUT_TYPE.TEXT)"
                            :label="label.value"
                            name="value"
                        />

                        <FormTextarea
                            v-if="areValuesEqual(setting.input_type, INPUT_TYPE.TEXTAREA)"
                            :label="label.value"
                            name="value"
                        />

                        <FormUpload
                            v-if="areValuesEqual(setting.input_type, INPUT_TYPE.UPLOAD)"
                            :label="label.value"
                            name="value"
                        />
                    </div>
                </div>

                <template #footer>
                    <div class="flex justify-center gap-4">
                        <UButton
                            type="submit"
                            size="sm"
                            variant="solid"
                            label="Chỉnh Sửa"
                            :loading="Boolean(isPending)"
                            :trailing="false"
                        />

                        <UButton
                            type="reset"
                            size="sm"
                            color="gray"
                            variant="solid"
                            label="Huỷ Bỏ"
                            :trailing="false"
                            @click="isOpen = false"
                        />
                    </div>
                </template>
            </UCard>
        </UForm>
    </UModal>
</template>

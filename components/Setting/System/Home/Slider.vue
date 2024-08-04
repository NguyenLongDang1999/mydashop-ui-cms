<script setup lang="ts">

const props = defineProps<Props>()

// ** Props & Emits
interface Props {
    data: ISettingSystemForm[]
}

// ** Computed
const slider = computed(() => props.data.find(_p => areValuesEqual(_p.key, HOME_SETTING.SLIDER)))

// ** useHooks
const { isPending, mutateAsync } = useSettingSystemFormInput()

const { handleSubmit, values: field } = useForm({
    validationSchema: settingSystemSliderFormSchema,
    initialValues: {
        home_slider: typeof slider.value?.value === 'string' ? JSON.parse(slider.value?.value) : []
    }
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    label: HOME_SETTING.SLIDER,
    key: HOME_SETTING.SLIDER,
    value: JSON.stringify(values.home_slider),
    input_type: INPUT_TYPE.TEXT

}))
</script>

<template>
    <UForm
        :state="settingSystemSliderFormSchema"
        @submit="onSubmit"
    >
        <FieldArray
            v-slot="{ fields, push, remove }"
            name="home_slider"
        >
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12">
                    <div class="flex flex-col gap-4">
                        <div
                            v-for="(_, index) in fields"
                            :key="index"
                            class="grid gap-4 grid-cols-12"
                        >
                            <div class="col-span-12">
                                <FormUpload :name="`home_slider[${index}].image_uri`" />
                            </div>

                            <div class="col-span-6">
                                <FormInput
                                    :label="settingSystemLabel.home_slider.image_link"
                                    :name="`home_slider[${index}].image_link`"
                                />
                            </div>

                            <div class="col-span-2">
                                <UButton
                                    :ui="{ rounded: 'rounded-full' }"
                                    icon="i-heroicons-trash"
                                    size="sm"
                                    color="red"
                                    variant="solid"
                                    class="mt-6"
                                    @click="remove(index)"
                                />
                            </div>

                            <div class="col-span-12">
                                <UDivider />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-12">
                    <UButton
                        icon="i-heroicons-plus"
                        size="sm"
                        color="primary"
                        variant="outline"
                        label="Thêm Slider"
                        class="mb-4"
                        block
                        :trailing="false"
                        @click="push({ image_uri: '', image_link: '' })"
                    />
                </div>
            </div>
        </FieldArray>

        <UButton
            v-if="field.home_slider?.length"
            type="submit"
            size="sm"
            variant="solid"
            label="Lưu Lại"
            :loading="Boolean(isPending)"
            :trailing="false"
        />
    </UForm>
</template>

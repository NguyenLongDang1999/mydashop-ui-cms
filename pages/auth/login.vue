<script setup lang="ts">

// ** Layout
definePageMeta({
    layout: 'auth'
})

// ** useHooks
const { handleSubmit } = useForm<IAuthLoginForm>({
    validationSchema: authLoginSchema
})

const { isPending, mutateAsync } = useAuthLogin()

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync(values))
</script>

<template>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <BaseLogo class="mb-6" />

        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-center capitalize text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Đăng nhập
                </h1>

                <UForm
                    :state="authLoginSchema"
                    class="space-y-4 md:space-y-6"
                    @submit="onSubmit"
                >
                    <div class="grid gap-4 grid-cols-12">
                        <div class="col-span-12">
                            <FormInput
                                :label="authLabel.email"
                                name="email"
                            />
                        </div>

                        <div class="col-span-12">
                            <FormInput
                                :label="authLabel.password"
                                name="password"
                                type="password"
                            />
                        </div>

                        <div class="col-span-12">
                            <UButton
                                type="submit"
                                size="lg"
                                block
                                variant="solid"
                                label="Đăng Nhập"
                                :loading="Boolean(isPending)"
                                :trailing="false"
                            />
                        </div>
                    </div>
                </UForm>
            </div>
        </div>
    </div>
</template>

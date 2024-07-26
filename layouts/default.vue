<script setup lang="ts">

// updateAppConfig({
//     ui: { primary: data.value?.theme_colour }
// })
</script>

<template>
    <div>
        <LayoutTheHeader />

        <main class="min-h-[calc(100vh-64px)]">
            <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
                <div class="lg:grid lg:grid-cols-10 lg:gap-8">
                    <div class="lg:col-span-2">
                        <LayoutTheSidebar />
                    </div>

                    <div class="lg:col-span-8">
                        <slot />
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

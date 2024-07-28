<template>
    <SettingSystemHomeSetup title="Thiết lập danh mục phổ biến">
        <template #default="scope">
            <SettingSystemHomeProductCategoryPopular :data="scope.data" />
        </template>
    </SettingSystemHomeSetup>
</template>

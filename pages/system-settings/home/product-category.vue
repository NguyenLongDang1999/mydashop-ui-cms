<template>
    <SettingSystemHomeSetup title="Thiết lập danh mục phổ biến">
        <template #default="scope">
            <SettingSystemHomeProductCategory :data="scope.data" />
        </template>
    </SettingSystemHomeSetup>
</template>

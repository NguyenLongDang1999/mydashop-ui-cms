<template>
    <SettingSystemHomeSetup title="Thiết lập bộ sưu tập sản phẩm">
        <template #default="scope">
            <SettingSystemHomeProductCollection :data="scope.data" />
        </template>
    </SettingSystemHomeSetup>
</template>

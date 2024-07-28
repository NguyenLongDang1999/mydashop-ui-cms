// ** Third Party Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { VerticalNavigationLink } from '#ui/types'

// ** Validations Imports
import type { IMetadata, ISettingSystemForm } from '~/validations/setting-system'

// ** State
const path = ref<string>(ROUTE.SYSTEM_SETTINGS)

const queryKey = {
    dataList: `${path.value}-data-list`,
    retrieve: `${path.value}-retrieve`,
    metadata: `${path.value}-metadata`
}

const pathKey = {
    index: path.value,
    metadata: `${path.value}/metadata`,
    id: `${path.value}/$id`
}

export const useSettingSystemFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<ISettingSystemForm, Error, ISettingSystemForm>({
        mutationFn: body => useFetcher(body.id ? pathQueryKey(pathKey.id, body.id) : pathKey.index, {
            method: body.id ? 'PATCH' : 'POST',
            body
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey.dataList] })
            queryClient.invalidateQueries({ queryKey: [queryKey.retrieve] })

            useNotification(MESSAGE.SUCCESS)
        }
    })
}

export const useSettingSystemDataList = (key?: string) => {
    // ** useHooks
    const { data, suspense } = useQuery({
        queryKey: [queryKey.dataList, key],
        queryFn: () => useFetcher(pathKey.index, {
            params: { key }
        })
    })

    const links: VerticalNavigationLink[] = [{
        label: 'Slider',
        to: ROUTER.SYSTEM_SETTINGS_HOME_SLIDER
    }, {
        label: 'Sản phẩm Flash Deals',
        to: ROUTER.SYSTEM_SETTINGS_HOME_PRODUCT_FLASH_DEALS
    }, {
        label: 'Danh mục phổ biến',
        to: ROUTER.SYSTEM_SETTINGS_HOME_PRODUCT_CATEGORY
    }, {
        label: 'Bộ sưu tập',
        to: ROUTER.SYSTEM_SETTINGS_HOME_PRODUCT_COLLECTION
    }, {
        label: 'Thương hiệu',
        to: ROUTER.SYSTEM_SETTINGS_HOME_PRODUCT_BRAND
    }]

    return {
        links,
        suspense,
        data: computed(() => data.value as ISettingSystemForm[])
    }
}

export const useSettingSystemRetrieve = () => {
    // ** useHooks
    const { data } = useQuery({
        queryKey: [queryKey.retrieve],
        queryFn: () => useFetcher(pathKey.index)
    })

    return {
        data: computed(() => data.value as ISettingSystemForm[])
    }
}

export const useMetadata = async () => {
    // ** useHooks
    const { data, suspense } = useQuery({
        queryKey: [queryKey.metadata],
        queryFn: () => useFetcher(pathKey.metadata)
    })

    await suspense()

    return {
        data: computed(() => data.value as IMetadata)
    }
}

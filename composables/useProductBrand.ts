// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { VerticalNavigationLink } from '#ui/types'

// ** State
const path = ref<string>(ROUTE.PRODUCT_BRAND)

const queryKey = {
    dataTable: `${path.value}-data-table`,
    dataList: `${path.value}-data-list`,
    retrieve: `${path.value}-retrieve`
}

const pathKey = {
    index: path.value,
    id: `${path.value}/$id`,
    dataList: `${path.value}/data-list`
}

export const productBrandColumns: Columns[] = [
    {
        key: PRODUCT_BRAND_KEYS.NAME,
        label: 'Thông tin thương hiệu',
        class: minWithColumn(180)
    },
    {
        key: PRODUCT_BRAND_KEYS.PRODUCT_CATEGORY_ID,
        label: 'Danh mục',
        class: minWithColumn(180)
    },
    {
        key: PRODUCT_BRAND_KEYS.STATUS,
        label: 'Trạng thái'
    },
    {
        key: PRODUCT_BRAND_KEYS.CREATED_AT,
        label: 'Ngày tạo',
        class: minWithColumn(120)
    },
    {
        key: CORE_KEYS.ACTION,
        label: 'Thao tác',
        class: minWithColumn(100)
    }
]

export default function () {
    return {
        path
    }
}

export const useProductBrandDataTable = () => {
    // ** Data
    const search = reactive<IProductBrandSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    const productCategoryId = inject('productCategoryId', undefined)

    // ** Set Data
    if (productCategoryId) search.product_category_id = productCategoryId

    // ** useHooks
    const { data, isFetching } = useQuery<IProductBrandTable>({
        queryKey: [queryKey.dataTable, search],
        queryFn: () => useFetcher(pathKey.index, { params: search }),
        placeholderData: keepPreviousData
    })

    provide('search', search)

    return {
        search,
        isFetching,
        productCategoryId,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}

export const useProductBrandRetrieve = async () => {
    // ** useHooks
    const { params } = useRoute()

    // ** Data
    const links: VerticalNavigationLink[] = [{
        label: 'Thông Tin Chi Tiết',
        to: goToPage(ROUTER.PRODUCT_GENERAL, params.id as string, ROUTER.PRODUCT_BRAND)
    }, {
        label: 'Danh mục',
        to: goToPage(ROUTER.PRODUCT_CATEGORY_CATEGORY, params.id as string, ROUTER.PRODUCT_BRAND)
    }, {
        label: 'Sản Phẩm',
        to: goToPage(ROUTER.PRODUCT_PRODUCT, params.id as string, ROUTER.PRODUCT_BRAND)
    }]

    const { data, suspense } = useQuery<IProductBrandForm>({
        queryKey: [queryKey.retrieve, params.id],
        queryFn: () => useFetcher(pathQueryKey(pathKey.id, params.id))
    })

    await suspense()

    return {
        links,
        data: computed(() => data.value as IProductBrandForm || {})
    }
}

export const useProductBrandFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IProductBrandForm, Error, IProductBrandForm>({
        mutationFn: body => useFetcher(body.id ? pathQueryKey(pathKey.id, body.id) : pathKey.index, {
            method: body.id ? 'PATCH' : 'POST',
            body
        }),
        onSuccess: (_data, variables) => {
            queryClient.refetchQueries({ queryKey: [queryKey.dataTable] })
            queryClient.invalidateQueries({ queryKey: [queryKey.dataList] })
            if (variables.id) queryClient.invalidateQueries({ queryKey: [queryKey.retrieve, variables.id] })

            useNotification(MESSAGE.SUCCESS)
        }
    })
}

export const useProductBrandFormDelete = () => {
    const queryClient = useQueryClient()

    return useMutation<IDeleteRecord, Error, IDeleteRecord>({
        mutationFn: body => useFetcher(pathQueryKey(pathKey.id, body.id), {
            method: 'DELETE',
            params: {
                slug: body.slug
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey.dataList] })
            queryClient.invalidateQueries({ queryKey: [queryKey.dataTable] })

            useNotification(MESSAGE.DELETE)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}

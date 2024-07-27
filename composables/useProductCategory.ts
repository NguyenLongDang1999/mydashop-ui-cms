// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { VerticalNavigationLink } from '#ui/types'

// ** Validations Imports
import type { Columns, IDeleteRecord } from '~/validations/core'
import type { IProductCategoryForm, IProductCategoryList, IProductCategorySearch, IProductCategoryTable } from '~/validations/product-category'

// ** State
const path = ref<string>(ROUTE.PRODUCT_CATEGORY)

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

export const productCategoryColumns: Columns[] = [
    {
        key: 'name',
        label: 'Thông tin danh mục',
        class: minWithColumn(200)
    },
    {
        key: 'parent_id',
        label: 'Danh mục cha',
        class: minWithColumn(200)
    },
    {
        key: 'status',
        label: 'Trạng thái'
    },
    {
        key: 'created_at',
        label: 'Ngày tạo',
        class: minWithColumn(120)
    },
    {
        key: 'actions',
        label: 'Thao tác',
        class: minWithColumn(100)
    }
]

export const useProductCategoryDataTable = () => {
    // ** Data
    const search = reactive<IProductCategorySearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    const productBrandId = inject('productBrandId', undefined)

    // ** Set Data
    if (productBrandId) search.product_brand_id = productBrandId

    // ** useHooks
    const { data, isFetching, suspense } = useQuery<IProductCategoryTable>({
        queryKey: [queryKey.dataTable, search],
        queryFn: () => useFetcher(pathKey.index, { params: search }),
        placeholderData: keepPreviousData
    })

    provide('search', search)

    return {
        suspense,
        search,
        isFetching,
        productBrandId,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}

export const useProductCategoryDataList = () => {
    // ** useHooks
    const { data } = useQuery<IProductCategoryList[]>({
        queryKey: [queryKey.dataList],
        queryFn: () => useFetcher(pathKey.dataList)
    })

    return computed(() => data.value || [])
}

export const useProductCategoryRetrieve = async () => {
    // ** useHooks
    const { params } = useRoute()

    // ** Data
    const links: VerticalNavigationLink[] = [{
        label: 'Thông Tin Chi Tiết',
        to: goToPage(ROUTER.PRODUCT_GENERAL, `${ROUTER.PRODUCT_CATEGORY}/${params.id}`)
    }, {
        label: 'Thương hiệu',
        to: goToPage(ROUTER.PRODUCT_CATEGORY_BRAND, `${ROUTER.PRODUCT_CATEGORY}/${params.id}`)
    }, {
        label: 'Thuộc tính',
        to: goToPage(ROUTER.PRODUCT_CATEGORY_ATTRIBUTE, `${ROUTER.PRODUCT_CATEGORY}/${params.id}`)
    }, {
        label: 'Sản Phẩm',
        to: goToPage(ROUTER.PRODUCT_PRODUCT, `${ROUTER.PRODUCT_CATEGORY}/${params.id}`)
    }]

    const { data, suspense } = useQuery<IProductCategoryForm>({
        queryKey: [queryKey.retrieve, params.id],
        queryFn: () => useFetcher(pathQueryKey(pathKey.id, params.id))
    })

    await suspense()

    return {
        links,
        data: computed(() => data.value as IProductCategoryForm || {})
    }
}

export const useProductCategoryFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IProductCategoryForm, Error, IProductCategoryForm>({
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

export const useProductCategoryFormDelete = () => {
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

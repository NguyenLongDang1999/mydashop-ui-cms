// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { VerticalNavigationLink } from '#ui/types'

// ** State
const path = ref<string>(ROUTE.ORDERS)

const queryKey = {
    dataTable: `${path.value}-data-table`,
    retrieve: `${path.value}-retrieve`
}

const pathKey = {
    index: path.value,
    id: `${path.value}/$id`
}

export const ordersColumns: Columns[] = [
    {
        key: PRODUCT_CATEGORY_KEYS.NAME,
        label: 'Thông tin danh mục',
        class: minWithColumn(200)
    },
    {
        key: PRODUCT_CATEGORY_KEYS.PARENT_ID,
        label: 'Danh mục cha',
        class: minWithColumn(200)
    },
    {
        key: PRODUCT_CATEGORY_KEYS.STATUS,
        label: 'Trạng thái'
    },
    {
        key: PRODUCT_CATEGORY_KEYS.CREATED_AT,
        label: 'Ngày tạo',
        class: minWithColumn(160)
    },
    {
        key: CORE_KEYS.ACTION,
        label: 'Thao tác',
        class: minWithColumn(100)
    }
]

export const useOrdersDataTable = () => {
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

export const useOrdersRetrieve = async () => {
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

export const useOrdersFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IProductCategoryForm, Error, IProductCategoryForm>({
        mutationFn: body => useFetcher(body.id ? pathQueryKey(pathKey.id, body.id) : pathKey.index, {
            method: body.id ? 'PATCH' : 'POST',
            body
        }),
        onSuccess: (_data, variables) => {
            queryClient.refetchQueries({ queryKey: [queryKey.dataTable] })
            if (variables.id) queryClient.invalidateQueries({ queryKey: [queryKey.retrieve, variables.id] })

            useNotification(MESSAGE.SUCCESS)
        }
    })
}

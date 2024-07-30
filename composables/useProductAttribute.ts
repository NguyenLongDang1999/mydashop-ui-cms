// ** Third Party Imports
import { keepPreviousData, useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { VerticalNavigationLink } from '#ui/types'

// ** State
const path = ref<string>(ROUTE.PRODUCT_ATTRIBUTE)

const queryKey = {
    dataTable: `${path.value}-data-table`,
    dataList: `${path.value}-data-list`,
    retrieve: `${path.value}-retrieve`,
    dataValueCategory: `${path.value}-data-value-category`
}

const pathKey = {
    index: path.value,
    id: `${path.value}/$id`,
    dataList: `${path.value}/data-list`
}

export const productAttributeColumns: Columns[] = [
    {
        key: 'name',
        label: 'Thông tin thuộc tính',
        class: minWithColumn(180)
    },
    {
        key: 'product_category_id',
        label: 'Danh mục',
        class: minWithColumn(350)
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

export default function () {
    return {
        path
    }
}

export const useProductAttributeDataTable = () => {
    // ** Data
    const search = reactive<IProductAttributeSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    const productCategoryId = inject('productCategoryId', undefined)

    // ** Set Data
    if (productCategoryId) search.product_category_id = productCategoryId

    // ** useHooks
    const { data, isFetching } = useQuery<IProductAttributeTable>({
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

export const useProductAttributeDataList = () => {
    // ** useHooks
    const { data } = useQuery<IProductAttributeList[]>({
        queryKey: [queryKey.dataList],
        queryFn: () => useFetcher(pathKey.dataList)
    })

    return computed(() => data.value || [])
}

export const useProductAttributeRetrieve = async () => {
    // ** useHooks
    const { params } = useRoute()

    // ** Data
    const links: VerticalNavigationLink[] = [{
        label: 'Thông Tin Chi Tiết',
        to: goToPage(ROUTER.PRODUCT_GENERAL, params.id as string, ROUTER.PRODUCT_ATTRIBUTE)
    }]

    const { data, suspense } = useQuery<IProductAttributeForm>({
        queryKey: [queryKey.retrieve, params.id],
        queryFn: () => useFetcher(pathQueryKey(pathKey.id, params.id))
    })

    await suspense()

    return {
        links,
        data: computed(() => data.value as IProductAttributeForm || {})
    }
}

export const useProductAttributeFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IProductAttributeForm, Error, IProductAttributeForm>({
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

export const useProductAttributeFormDelete = () => {
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

export const useProductAttributeValueList = () => {
    // ** Data
    const attribute_id = ref<string[]>([])

    const attributeData = useQueries({
        queries: computed(() => attribute_id.value.map(_v => {
            return {
                queryKey: [queryKey.dataValueCategory, _v],
                queryFn: () => useFetcher(`${path.value}/attribute-value-data-list/${_v}`)
            }
        }))
    })

    return {
        attribute_id,
        attributeValueList: computed(() => attributeData.value)
    }
}

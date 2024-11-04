// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** State
const path = ref<string>(ROUTE.PRODUCT_COUPON)

const queryKey = {
    dataTable: `${path.value}-data-table`,
    retrieve: `${path.value}-retrieve`
}

const pathKey = {
    index: path.value,
    id: `${path.value}/$id`
}

export const productCouponColumns: Columns[] = [
    {
        key: PRODUCT_COUPON_KEYS.CODE,
        label: 'Code',
        class: minWithColumn(180)
    },
    {
        key: PRODUCT_COUPON_KEYS.MIN_ORDER_VALUE,
        label: 'Giá trị đơn hàng giảm',
        class: minWithColumn(200)
    },
    {
        key: PRODUCT_COUPON_KEYS.PRICE,
        label: 'Giá giảm',
        class: minWithColumn(100)
    },
    {
        key: PRODUCT_COUPON_KEYS.DATE_RANGE,
        label: 'Ngày áp dụng',
        class: minWithColumn(350)
    },
    {
        key: PRODUCT_COUPON_KEYS.STATUS,
        label: 'Trạng thái'
    },
    {
        key: PRODUCT_COUPON_KEYS.CREATED_AT,
        label: 'Ngày tạo',
        class: minWithColumn(160)
    },
    {
        key: CORE_KEYS.ACTION,
        label: 'Thao tác',
        class: minWithColumn(100)
    }
]

export const useProductCouponDataTable = () => {
    // ** Data
    const search = reactive<IProductCouponSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching } = useQuery<IProductCouponTable>({
        queryKey: [queryKey.dataTable, search],
        queryFn: () => useFetcher(pathKey.index, { params: search }),
        placeholderData: keepPreviousData
    })

    provide('search', search)

    return {
        search,
        isFetching,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}

export const useProductCouponRetrieve = async () => {
    // ** useHooks
    const { params } = useRoute()

    const { data, suspense } = useQuery<IProductCouponForm>({
        queryKey: [queryKey.retrieve, params.id],
        queryFn: () => useFetcher(pathQueryKey(pathKey.id, params.id))
    })

    await suspense()

    return {
        data: computed(() => data.value as IProductCouponForm || {})
    }
}

export const useProductCouponFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IProductCouponForm, Error, IProductCouponForm>({
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

export const useProductCouponFormDelete = () => {
    const queryClient = useQueryClient()

    return useMutation<IDeleteRecord, Error, IDeleteRecord>({
        mutationFn: body => useFetcher(pathQueryKey(pathKey.id, body.id), {
            method: 'DELETE',
            params: {
                slug: body.slug
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey.dataTable] })

            useNotification(MESSAGE.DELETE)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}

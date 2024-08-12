// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** State
const path = ref<string>(ROUTE.PRODUCT_INVENTORY)

const queryKey = {
    dataTable: `${path.value}-data-table`
}

const pathKey = {
    index: path.value
}

export const productInventoryColumns: Columns[] = [
    {
        key: PRODUCT_INVENTORY_KEYS.NAME,
        label: 'Thông tin sản phẩm',
        class: minWithColumn(250)
    },
    {
        key: PRODUCT_INVENTORY_KEYS.QUANTITY,
        label: 'Số lượng',
        class: minWithColumn(200)
    }
]

export const useProductInventoryDataTable = () => {
    // ** Data
    const search = reactive<IProductInventorySearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching } = useQuery<IProductInventoryTable>({
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

export const useProductInventoryFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IProductInventoryFormInput, Error, IProductInventoryFormInput>({
        mutationFn: body => useFetcher(pathKey.index, {
            method: 'POST',
            body
        }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [queryKey.dataTable] })

            useNotification(MESSAGE.SUCCESS)
        }
    })
}

// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { VerticalNavigationLink } from '#ui/types'
import type { IProductSearch, IProductTable } from '~/types/product.type'

// ** Validations Imports
import type { IProductGenerateVariants } from '~/validations/product-flash-deals'

// ** State
const path = ref<string>(ROUTE.PRODUCT)
const productVariants = ref<IProductGenerateVariants[]>([])

const queryKey = {
    dataTable: `${path.value}-data-table`,
    dataList: `${path.value}-data-list`,
    retrieve: `${path.value}-retrieve`,
    dataListCategory: `${path.value}-data-list-category`
}

const pathKey = {
    index: path.value,
    id: `${path.value}/$id`,
    dataList: `${path.value}/data-list`,
    idImages: `${path.value}/$id/images`,
    idRelations: `${path.value}/$id/relations`,
    generateVariant: `${path.value}/generate-variant`
}

export const productColumns: Columns[] = [
    {
        key: PRODUCT_KEYS.NAME,
        label: 'Thông tin sản phẩm',
        class: minWithColumn(250)
    },
    {
        key: PRODUCT_KEYS.PRICE,
        label: 'Giá tiền',
        class: minWithColumn(200)
    },
    {
        key: PRODUCT_KEYS.PRODUCT_CATEGORY_ID,
        label: 'Danh mục',
        class: minWithColumn(200)
    },
    {
        key: PRODUCT_KEYS.PRODUCT_BRAND_ID,
        label: 'Thương hiệu',
        class: minWithColumn(200)
    },
    {
        key: PRODUCT_KEYS.STATUS,
        label: 'Trạng thái'
    },
    {
        key: PRODUCT_KEYS.CREATED_AT,
        label: 'Ngày tạo',
        class: minWithColumn(160)
    },
    {
        key: CORE_KEYS.ACTION,
        label: 'Thao tác',
        class: minWithColumn(100)
    }
]

export default function () {
    return {
        path,
        productVariants
    }
}

export const useProductDataTable = (notFlashDeals?: boolean, productIdFlashDeals?: string) => {
    const search = reactive<IProductSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    const productCategoryId = inject('productCategoryId', undefined)
    const productBrandId = inject('productBrandId', undefined)

    // ** Set Data
    search.product_category_id = productCategoryId
    search.product_brand_id = productBrandId
    search.not_flash_deals = notFlashDeals
    search.product_id_flash_deals = productIdFlashDeals

    // ** useHooks
    const { data, isFetching, suspense } = useQuery<IProductTable>({
        queryKey: [queryKey.dataTable, search],
        queryFn: () => useFetcher(pathKey.index, { params: search }),
        placeholderData: keepPreviousData
    })

    provide('search', search)

    return {
        search,
        isFetching,
        productCategoryId,
        productBrandId,
        dataTable: computed(() => data.value?.data as IProductTable[] || []),
        dataAggregations: computed(() => data.value?.aggregations || 0),
        suspense
    }
}

export const useProductRetrieve = async () => {
    // ** useHooks
    const { params } = useRoute()

    // ** Data
    const links: VerticalNavigationLink[] = [{
        label: 'Thông Tin Chi Tiết',
        to: goToPage(ROUTER.PRODUCT_GENERAL, params.id as string, ROUTER.PRODUCT)
    }, {
        label: 'Sản Phẩm Đính Kèm',
        to: goToPage(ROUTER.PRODUCT_RELATIONS, params.id as string, ROUTER.PRODUCT)
    }, {
        label: 'Hình Ảnh Sản Phẩm',
        to: goToPage(ROUTER.PRODUCT_IMAGES, params.id as string, ROUTER.PRODUCT)
    }]

    const { data, suspense } = useQuery<IProductVariantForm>({
        queryKey: [queryKey.retrieve, params.id],
        queryFn: () => useFetcher(pathQueryKey(pathKey.id, params.id))
    })

    await suspense()

    // ** Computed
    const productTypeSingle = computed(() => areValuesEqual(data.value?.product_type as number, PRODUCT_TYPE.SINGLE))

    const computedItems = computed(() => {
        const newItems = [...links]

        if (!productTypeSingle.value) {
            const detailIndex = newItems.findIndex(item => areValuesEqual(item.to as string, goToPage(ROUTER.PRODUCT_GENERAL, params.id as string, ROUTER.PRODUCT) as string))

            if (detailIndex !== -1) {
                newItems.splice(detailIndex + 1, 0, {
                    label: 'Thuộc Tính Sản Phẩm',
                    to: goToPage(ROUTER.PRODUCT_ATTRIBUTES, params.id as string, ROUTER.PRODUCT)
                })
            }
        }

        return newItems
    })

    return {
        productTypeSingle,
        links: computedItems,
        data: computed(() => data.value as IProductVariantForm || {})
    }
}

export const useProductFormInput = <T extends { id?: string } = IProductVariantForm>() => {
    const queryClient = useQueryClient()

    return useMutation<T, Error, T>({
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

export const useProductRelationsForm = () => {
    const queryClient = useQueryClient()

    return useMutation<IProductRelationsForm, Error, IProductRelationsForm>({
        mutationFn: body => useFetcher(pathQueryKey(pathKey.idRelations, body.id!), {
            method: 'PATCH',
            body
        }),
        onSuccess: (_data, variables) => {
            queryClient.refetchQueries({ queryKey: [queryKey.dataTable] })
            if (variables.id) queryClient.invalidateQueries({ queryKey: [queryKey.retrieve, variables.id] })

            useNotification(MESSAGE.SUCCESS)
        }
    })
}

export const useProductImagesForm = () => {
    const queryClient = useQueryClient()

    return useMutation<IProductImagesForm, Error, IProductImagesForm>({
        mutationFn: body => useFetcher(pathQueryKey(pathKey.idImages, body.id!), {
            method: 'PATCH',
            body
        }),
        onSuccess: (_data, variables) => {
            queryClient.refetchQueries({ queryKey: [queryKey.dataTable] })
            if (variables.id) queryClient.invalidateQueries({ queryKey: [queryKey.retrieve, variables.id] })

            useNotification(MESSAGE.SUCCESS)
        }
    })
}

export const useProductFormDelete = () => {
    const queryClient = useQueryClient()

    return useMutation<IDeleteRecord, Error, IDeleteRecord>({
        mutationFn: body => useFetcher(pathQueryKey(pathKey.id, body.id), {
            method: 'DELETE',
            params: {
                slug: body.slug
            }
        }),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: [queryKey.dataTable] })
            if (variables.id) queryClient.invalidateQueries({ queryKey: [queryKey.retrieve, variables.id] })

            useNotification(MESSAGE.DELETE)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}

export const useProductSelectedWithCategory = () => {
    // ** Data
    const endPoint = '/data-list-category'
    const category_id = ref<string>()

    // ** useHooks
    const { path: pathBrand } = useProductBrand()
    const { path: pathAttribute } = useProductAttribute()

    const { isFetching: isFetchingBrand, data: dataBrand } = useQuery<IProductBrandList[]>({
        queryKey: [pathBrand.value + queryKey.dataListCategory, category_id],
        queryFn: () => useFetcher(`${pathBrand.value + endPoint}/${category_id.value}`),
        enabled: () => !!category_id.value
    })

    const { isFetching: isFetchingAttribute, data: dataAttribute } = useQuery<IProductAttributeList[]>({
        queryKey: [pathAttribute.value + queryKey.dataListCategory, category_id],
        queryFn: () => useFetcher(`${pathAttribute.value + endPoint}/${category_id.value}`),
        enabled: () => !!category_id.value
    })

    const brandList = computed(() => dataBrand.value || [])
    const attributeList = computed(() => dataAttribute.value || [])

    return {
        category_id,
        brandList,
        isFetchingBrand,
        attributeList,
        isFetchingAttribute
    }
}

export const useProductFormGenerateVariant = () => useMutation<IProductGenerateVariants[], Error, { product_id: string[] }>({
    mutationFn: body => useFetcher(pathKey.generateVariant, {
        method: 'POST',
        body
    }),
    onSuccess: data => productVariants.value = data,
    onError: () => useNotificationError(MESSAGE.ERROR)
})

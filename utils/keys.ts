export enum PRODUCT_CATEGORY_KEYS {
    NAME = 'name',
    PARENT_ID = 'parent_id',
    STATUS = 'status',
    CREATED_AT = 'created_at'
}

export enum PRODUCT_BRAND_KEYS {
    NAME = 'name',
    PRODUCT_CATEGORY_ID = 'product_category_id',
    STATUS = 'status',
    CREATED_AT = 'created_at'
}

export enum PRODUCT_ATTRIBUTE_KEYS {
    NAME = 'name',
    PRODUCT_CATEGORY_ID = 'product_category_id',
    STATUS = 'status',
    CREATED_AT = 'created_at'
}

export enum PRODUCT_COLLECTION_KEYS {
    NAME = 'name',
    STATUS = 'status',
    CREATED_AT = 'created_at'
}

export enum PRODUCT_FLASH_DEALS_KEYS {
    NAME = 'name',
    PRICE = 'price',
    DATE_RANGE = 'date_range',
    STATUS = 'status',
    CREATED_AT = 'created_at'
}

export enum PRODUCT_COUPON_KEYS {
    CODE = 'code',
    PRICE = 'price',
    MIN_ORDER_VALUE = 'min_order_value',
    DATE_RANGE = 'date_range',
    STATUS = 'status',
    CREATED_AT = 'created_at'
}

export enum PRODUCT_INVENTORY_KEYS {
    NAME = 'name',
    QUANTITY = 'quantity'
}

export enum PRODUCT_KEYS {
    NAME = 'name',
    PRICE = 'price',
    PRODUCT_CATEGORY_ID = 'product_category_id',
    PRODUCT_BRAND_ID = 'product_brand_id',
    STATUS = 'status',
    CREATED_AT = 'created_at'
}

export enum FILE_MANAGER_KEYS {
    NAME = 'name',
    SIZE = 'size',
    DATE_MODIFIED = 'date_modified'
}

export enum CORE_KEYS {
    ACTION = 'action'
}

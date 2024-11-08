export enum ROUTE {
    AUTHENTICATION = 'auth',
    PRODUCT_CATEGORY = 'product-categories',
    PRODUCT_BRAND = 'product-brands',
    PRODUCT_ATTRIBUTE = 'product-attributes',
    PRODUCT_FLASH_DEALS = 'product-flash-deals',
    PRODUCT = 'product',
    ORDERS = 'orders',
    FILE_MANAGER = 'file-manager',
    PRODUCT_COLLECTION = 'product-collections',
    PRODUCT_COUPON = 'product-coupons',
    SYSTEM_SETTINGS = 'system-settings',
    PRODUCT_INVENTORY = 'product-inventory',
}

export enum ROUTER {
    DASHBOARD = '/',
    LOGIN = '/auth/login',
    FLASH_DEALS = '/flash-deals',

    // ** PRODUCT
    PRODUCT_CATEGORY = '/product-category',
    PRODUCT_ATTRIBUTE = '/product-attribute',
    PRODUCT_BRAND = '/product-brand',
    PRODUCT_COLLECTION = '/product-collection',
    PRODUCT_FLASH_DEALS = '/product-flash-deals',
    PRODUCT_COUPON = '/product-coupon',
    PRODUCT = '/product',

    // ** ORDER
    ORDER = '/orders',
    ORDER_PRODUCT_INVENTORY = '/product-inventory',

    // ** PRODUCT RETRIEVE
    PRODUCT_GENERAL = 'general',
    PRODUCT_VARIANTS = 'variants',
    PRODUCT_RELATIONS = 'relations',
    PRODUCT_IMAGES = 'images',
    PRODUCT_PRODUCT = 'product',
    PRODUCT_CATEGORY_BRAND = 'product-brand',
    PRODUCT_CATEGORY_CATEGORY = 'product-category',
    PRODUCT_CATEGORY_ATTRIBUTE = 'product-attribute',

    // ** SYSTEM SETTING
    SYSTEM_SETTINGS = '/system-settings',
    SYSTEM_SETTINGS_HOME = '/system-settings/home',

    // ** SYSTEM SETTING SECRET KEY
    SYSTEM_SETTINGS_SECRET_KEY_BUNNYCDN = '/system-settings/secret-key/bunnycdn',
    SYSTEM_SETTINGS_SECRET_KEY_GOOGLE = '/system-settings/secret-key/google',
    SYSTEM_SETTINGS_SECRET_KEY_FACEBOOK = '/system-settings/secret-key/facebook',

    // ** SYSTEM SETTING HOME
    SYSTEM_SETTINGS_HOME_SLIDER = '/system-settings/home/slider',
    SYSTEM_SETTINGS_HOME_PRODUCT_FLASH_DEALS = '/system-settings/home/product-flash-deals',
    SYSTEM_SETTINGS_HOME_PRODUCT_CATEGORY = '/system-settings/home/product-category',
    SYSTEM_SETTINGS_HOME_PRODUCT_COLLECTION = '/system-settings/home/product-collection',
    SYSTEM_SETTINGS_HOME_PRODUCT_BRAND = '/system-settings/home/product-brand'
}

export enum HOME_SETTING {
    SLIDER = 'home_slider',
    PRODUCT_FLASH_DEALS = 'home_product_flash_deals',
    PRODUCT_CATEGORIES_POPULAR = 'home_product_categories_popular',
    PRODUCT_COLLECTION = 'home_product_collection',
    PRODUCT_BRAND = 'home_product_brand'
}

export enum HTTP_CODE {
    CONFLICT = 409,
    UNAUTHORIZED = 401
}

export enum MESSAGE {
    SUCCESS = 'Dữ liệu đã được lưu thành công!',
    ERROR = 'Đã xảy ra lỗi trong quá trình xử lý!',
    DELETE = 'Xóa dữ liệu thành công!',
    CONFLICT = 'Dữ liệu này đã tồn tại trong hệ thống!'
}

export enum AUTH {
    ACCESS_TOKEN = 'accessTokenAdmin',
    REFRESH_TOKEN = 'refreshTokenAdmin',
}

export enum FORMAT {
    DATE_TIME = 'DD-MM-YYYY HH:mm'
}

export enum STATUS {
    ACTIVE = 10,
    INACTIVE = 20
}

export enum PAGE {
    CURRENT = 1,
    SIZE = 10
}

export enum INPUT_TYPE {
    TEXT = 10,
    TEXTAREA = 20,
    SELECT = 30,
    UPLOAD = 40
}

export enum PATH {
    BUNNY_CDN_URL = 'https://nuxivy.b-cdn.net/'
}

export enum IMAGE {
    DEFAULT = '/default.jpg'
}

export enum PRODUCT_TYPE {
    SINGLE = 10,
    VARIANT = 20,
}

export enum PRODUCT_TYPE_TEXT {
    SINGLE = 'single',
    VARIANT = 'variant',
}

export enum MANAGE_INVENTORY {
    YES = 10,
    NO = 20
}

export enum SPECIAL_PRICE {
    PRICE = 10,
    PERCENT = 20
}

export enum RELATIONS_TYPE {
    UPSELL = 10,
    CROSS_SELL = 20,
    RELATED = 30
}

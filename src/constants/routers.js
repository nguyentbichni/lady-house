export const ROUTER = {
  USER: {
    HOME: '/',
    PRODUCT_LIST: '/products',
    PRODUCT_DETAIL: '/product/:id',
    CART: '/cart',
  },
  ADMIN: {
    PRODUCT_LIST: '/admin/products',
    CREATE_PRODUCT: '/admin/product/create',
    UPDATE_PRODUCT: '/admin/product/:id/update',
    CATEGORY_LIST: '/admin/categories',
    CREATE_CATEGORY: '/admin/category/create',
    UPDATE_CATEGORY: '/admin/category/:id/update',
    USER_LIST: '/admin/users',
    UPDATE_USER: '/admin/users/:id/update',
    DISCOUNT_LIST: '/admin/discounts',
    CREATE_DISCOUNT: '/admin/discounts/create',
    UPDATE_DISCOUNT: '/admin/discounts/:id/update',
  },
  LOGIN: '/login',
  REGISTER: '/register',
  NOT_FOUND: '/404',
};

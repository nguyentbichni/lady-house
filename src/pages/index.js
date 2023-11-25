import LoginPage from './Login'
import RegisterPage from './Register'
// user
import HomePage from './user/Home'
import ProductListPage from './user/ProductList'
import ProductDetailPage from './user/ProductDetail'
import CartPage from './user/CartPage'
import CheckoutPage from './user/Checkout'
import ProfilePage from './user/Profile'
// admin
import AdminProductListPage from './admin/ProductListPage'
import AdminCreateProductPage from './admin/CreateProductPage'
import AdminUpdateProductPage from './admin/UpdateProductPage'
import AdminCategoryListPage from '././admin/CategoryListPage'
import AdminCreateCategoryPage from '././admin/CreateCategoryPage'
import AdminUpdateCategoryPage from '././admin/UpdateCategoryPage'
import AdminUserListPage from '././admin/UserListPage'
import DiscountListPage from '././admin/DiscountListPage'
import CreateDiscountPage from '././admin/CreateDiscountPage'

import StyleGuidePage from './StyleGuide'

const pages = {
  LoginPage,
  RegisterPage,
  // user
  HomePage,
  ProductListPage,
  ProductDetailPage,
  CartPage,
  CheckoutPage,
  ProfilePage,
  // admin
  AdminProductListPage,
  AdminCreateProductPage,
  AdminUpdateProductPage,
  AdminCategoryListPage,
  AdminCreateCategoryPage,
  AdminUpdateCategoryPage,
  AdminUserListPage,
  DiscountListPage,
  CreateDiscountPage,
  // style guide
  StyleGuidePage,
}

export default pages

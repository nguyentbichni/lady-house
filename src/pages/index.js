import LoginPage from './Login';
import RegisterPage from './Register';
// user
import HomePage from './user/Home';
import ProductListPage from './user/ProductList';
import ProductDetailPage from './user/ProductDetail';
import CartPage from './user/CartPage';
// admin
import AdminProductListPage from './admin/ProductListPage';
import AdminCreateProductPage from './admin/CreateProductPage';
import AdminUpdateProductPage from './admin/UpdateProductPage';
import AdminCategoryListPage from '././admin/CategoryListPage';
import AdminCreateCategoryPage from '././admin/CreateCategoryPage';
import AdminUpdateCategoryPage from '././admin/UpdateCategoryPage';
import AdminUserListPage from '././admin/UserListPage';
import DiscountListPage from '././admin/DiscountListPage';

const pages = {
  LoginPage,
  RegisterPage,
  // user
  HomePage,
  ProductListPage,
  ProductDetailPage,
  CartPage,
  // admin
  AdminProductListPage,
  AdminCreateProductPage,
  AdminUpdateProductPage,
  AdminCategoryListPage,
  AdminCreateCategoryPage,
  AdminUpdateCategoryPage,
  AdminUserListPage,
  DiscountListPage,
};

export default pages;

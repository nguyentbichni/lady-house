import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import { ROUTER } from './constants/routers'
import PublicLayout from './layouts/PublicLayout'
import LoginLayout from './layouts/LoginLayout'
import AdminLayout from './layouts/AdminLayout'

import { getUserInfoAction } from './redux/actions'
import P from './pages'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const cartData = localStorage.getItem('cart')
    if (token) {
      const decoded = jwtDecode(token)
      dispatch(getUserInfoAction({ id: decoded.sub }))
    }
    if (!cartData) localStorage.setItem('cart', JSON.stringify([]))
  }, [])

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={ROUTER.USER.HOME} element={<P.HomePage />} />
        <Route path={ROUTER.USER.PRODUCT_LIST} element={<P.ProductListPage />} />
        <Route path={ROUTER.USER.PRODUCT_DETAIL} element={<P.ProductDetailPage />} />
        <Route path={ROUTER.USER.CART} element={<P.CartPage />} />
        <Route path={ROUTER.USER.CHECKOUT} element={<P.CheckoutPage />} />
        <Route path={ROUTER.USER.PROFILE} element={<P.ProfilePage />} />
      </Route>
      <Route element={<LoginLayout />}>
        <Route path={ROUTER.LOGIN} element={<P.LoginPage />} />
        <Route path={ROUTER.REGISTER} element={<P.RegisterPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path={ROUTER.ADMIN.PRODUCT_LIST} element={<P.AdminProductListPage />} />
        <Route path={ROUTER.ADMIN.CREATE_PRODUCT} element={<P.AdminCreateProductPage />} />
        <Route path={ROUTER.ADMIN.UPDATE_PRODUCT} element={<P.AdminUpdateProductPage />} />
        <Route path={ROUTER.ADMIN.CATEGORY_LIST} element={<P.AdminCategoryListPage />} />
        <Route path={ROUTER.ADMIN.CREATE_CATEGORY} element={<P.AdminCreateCategoryPage />} />
        <Route path={ROUTER.ADMIN.UPDATE_CATEGORY} element={<P.AdminUpdateCategoryPage />} />
        <Route path={ROUTER.ADMIN.USER_LIST} element={<P.AdminUserListPage />} />
        <Route path={ROUTER.ADMIN.DISCOUNT_LIST} element={<P.DiscountListPage />} />
        <Route path={ROUTER.ADMIN.CREATE_DISCOUNT} element={<P.CreateDiscountPage />} />
      </Route>
      <Route path={ROUTER.STYLE_GUIDE} element={<P.StyleGuidePage />} />
    </Routes>
  )
}

export default App

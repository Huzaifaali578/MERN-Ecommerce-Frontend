import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/Authorization/components/Protected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemByUserIdAsync } from './features/cart/cartSlice';
import { checkAuthAsync, checkUserAuthSelector, loggedInUserSelector } from './features/Authorization/authSlice';
import PageNotFound from './pages/404';
import OrderPlaced from './pages/OrderPlaced';
import UserOrderPage from './pages/UserOrderPage';
import MyProfilePage from './pages/MyProfilePage';
import { fetchUserInfoAsync, updateUserAddressAsync } from './features/user/userSlice';
import Logout from './features/Authorization/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/Authorization/components/ProtectedAdmin';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminHome from './pages/AdminHome';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import StripeCheckout from './pages/stripeCheckout';

// import Home from './pages/Home';

const router = createBrowserRouter([
  // Admin Routing
  { path: "/admin", element: <ProtectedAdmin><AdminHome /></ProtectedAdmin> },
  { path: "/admin/product-detail/:id", element: <ProtectedAdmin><AdminProductDetailPage /></ProtectedAdmin> },
  { path: "/admin/product-form", element: <ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin> },
  { path: "/admin/product-form/edit/:id", element: <ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin> },
  { path: "/admin/orders", element: <ProtectedAdmin><AdminOrdersPage /></ProtectedAdmin> },
  // User Routing
  { path: "/", element: <Protected><Home /></Protected> },
  {path: "/login", element:<LoginPage />},
  {path: "/signup", element:<SignUpPage />},
  {path: "/cart", element:<Protected><CartPage /></Protected>},
  {path: "/checkout", element:<Protected><Checkout /></Protected>},
  {path: "/product-detail/:id", element:<Protected><ProductDetailPage /></Protected>},
  {path: "*", element:<PageNotFound />},
  {path: "/order-succes/:id", element:<OrderPlaced />},
  {path: "/my-order", element:<Protected><UserOrderPage /></Protected>},
  {path: "/my-profile", element:<Protected><MyProfilePage /></Protected>},
  {path: "/logout", element:<Logout />},
  {path: "/forgot-password", element:<ForgotPasswordPage />},
  {path: "/stripe-checkout", element:<Protected><StripeCheckout /></Protected>},
])

function App() {
  const dispatch = useDispatch()
  const user = useSelector(loggedInUserSelector)
  const checkUserAuth = useSelector(checkUserAuthSelector)

  useEffect(() => {
    dispatch(checkAuthAsync())
  },[dispatch])

  useEffect(() => {
    if (user) {
      dispatch(fetchItemByUserIdAsync())
      dispatch(fetchUserInfoAsync())
    } else {
      console.log("user not found")
    }
  }, [dispatch, user])
  return (
    <div className="App">
      {checkUserAuth && <RouterProvider router={router}>

      </RouterProvider>}
    </div>
  );
}

export default App;

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
import { loggedInUserSelector } from './features/Authorization/authSlice';
import PageNotFound from './pages/404';
import OrderPlaced from './pages/OrderPlaced';
import UserOrderPage from './pages/UserOrderPage';
import MyProfilePage from './pages/MyProfilePage';
import { fetchUserInfoAsync, updateUserAddressAsync } from './features/user/userSlice';
import Logout from './features/Authorization/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// import Home from './pages/Home';

const router = createBrowserRouter([
  {path: "/", element: <Home />},
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
])

function App() {
  const dispatch = useDispatch()
  const user = useSelector(loggedInUserSelector)

  useEffect(() => {
    if (user) {
      dispatch(fetchItemByUserIdAsync(user.id))
      dispatch(fetchUserInfoAsync(user.id))
      console.log("app", user.id)
    } else {
      console.log("user not found")
    }
  }, [dispatch, user])
  return (
    <div className="App">
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  );
}

export default App;

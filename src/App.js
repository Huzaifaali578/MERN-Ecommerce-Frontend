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
])

function App() {
  const dispatch = useDispatch()
  const user = useSelector(loggedInUserSelector)

  useEffect(() => {
    if (user) {
      dispatch(fetchItemByUserIdAsync(user.id))
    } else {
      
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

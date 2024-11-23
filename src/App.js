import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';
// import Home from './pages/Home';

const router = createBrowserRouter([
  {path: "/", element:<Home />},
  {path: "/login", element:<LoginPage />},
  {path: "/signup", element:<SignUpPage />},
  {path: "/cart", element:<CartPage />},
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  );
}

export default App;

import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import ProductListing from "../Pages/ProductListing";
import PrivateRoute from "../components/PrivateRoute";
import RootLayout from "../components/RootLayout";
import ProductDetails from "../Pages/ProductDetails";
import CartPage from "../Pages/Cart";
import MyAccount from "../Pages/MyAccount";
import OrderSuccess from "../Pages/OrderSuccess";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import MyList from "../Pages/MyList";
import BlogDetails from "../components/BlogDetails";
import Verify from "../Pages/Verify";
import ResetPassword from "../Pages/ForgotPassword";
import Checkout from "../Pages/Checkout";
import OrderFail from "../Pages/OrderFail";
import OrderTracking from "../components/OrderTracking";
import Orders from "../Pages/Orders";
import Address from "../Pages/MyAccount/Address";
import { homeLoader } from "../loaders/homeLoader";
// ... import other pages

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home />,loader:homeLoader  },
      { path: "products", element: <ProductListing /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "cart", element: <CartPage /> },
      { 
        path: "my-account", 
        element: <PrivateRoute><MyAccount /></PrivateRoute> 
      },
      { path: "my-list", element: <MyList/> },
      // ... add the rest of your routes here
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      { path:'/blog/:id' , element:<BlogDetails/>},
      { path:'/verify' , element:<Verify resetPassword={false}/>},
      { path:'/verify-reset-password' , element:<Verify resetPassword={true}/>},
      { path:'/reset-password' , element:<ResetPassword/>},
      { path:'/checkout' , element:<Checkout/>},
      { path:'/order-success' , element:<OrderSuccess/>},
      { path:'/order-failed' , element:<OrderFail/>},
      { path:'/order/:orderId' , element:<OrderTracking/>},
      { path:'/my-orders' , element:<Orders/>},
      { path:'/address' , element:<Address/>},
      { path:'/address' , element:<Address/>},
    //   { path:'/request-otp' , element:</>},
      
      
    ],
  },
]); 
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import PrivateRoute from "../components/PrivateRoute";
import RootLayout from "../components/RootLayout";
import { homeLoader } from "../loaders/homeLoader";


import Home from "../Pages/Home";
const ProductListing = lazy(() => import("../Pages/ProductListing"));
const ProductDetails = lazy(() => import("../Pages/ProductDetails"));
const CartPage = lazy(() => import("../Pages/Cart"));
const MyAccount = lazy(() => import("../Pages/MyAccount"));
const MyList = lazy(() => import("../Pages/MyList"));
const Login = lazy(() => import("../Pages/Login"));
const Register = lazy(() => import("../Pages/Register"));
const BlogDetails = lazy(() => import("../components/BlogDetails"));
const Verify = lazy(() => import("../Pages/Verify"));
const ResetPassword = lazy(() => import("../Pages/ForgotPassword"));
const Checkout = lazy(() => import("../Pages/Checkout"));
const OrderSuccess = lazy(() => import("../Pages/OrderSuccess"));
const OrderFail = lazy(() => import("../Pages/OrderFail"));
const OrderTracking = lazy(() => import("../components/OrderTracking"));
const Orders = lazy(() => import("../Pages/Orders"));
const Address = lazy(() => import("../Pages/MyAccount/Address"));



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
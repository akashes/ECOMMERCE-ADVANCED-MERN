import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import ProductDetailsModal from "./ProductDetailsModal";

const RootLayout = () => {
  const location = useLocation();
//   const { openProductDetailsModal, handleCloseProductDetailsModal } = useContext(MyContext);

  const HIDE_PATHS = ["/order-success", "/order-failed"];
  const isOrderTracking = location.pathname.startsWith("/order/");
  const shouldHide = HIDE_PATHS.includes(location.pathname) || isOrderTracking;

  return (
    <>
      {!shouldHide && <Header />}
      
      <main>
        <Outlet /> {/* This renders Home, ProductListing, etc. */}
      </main>

      {!shouldHide && <Footer />}
      <ProductDetailsModal/>

      {/* Global Modals stay here */}
      {/* <ProductDetailsModal 
        state={openProductDetailsModal} 
        onClose={handleCloseProductDetailsModal} 
      /> */}
    </>
  );
};

export default RootLayout;
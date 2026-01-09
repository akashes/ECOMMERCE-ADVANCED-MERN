import { store } from "../components/redux/store";
import { fetchBannerV1 } from "../features/bannerV1Slice";
import { wishlistLoader } from "../features/wishList/wishListLoader";
export const homeLoader = async () => {

await Promise.all([
    wishlistLoader(), 
    store.dispatch(fetchBannerV1()) 
  ]);  
  return null; 
};
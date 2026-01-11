import { store } from "../components/redux/store";
import { fetchBannerV1 } from "../features/bannerV1Slice";
import { wishlistLoader } from "../features/wishList/wishListLoader";
export const homeLoader = async () => {

  const results = await Promise.allSettled([
    wishlistLoader(),
    store.dispatch(fetchBannerV1())
  ]);

  results.forEach((result) => {
    if (result.status === 'rejected') {
      console.error('Loader error:', result.reason);
    }
  });

  return null;

};
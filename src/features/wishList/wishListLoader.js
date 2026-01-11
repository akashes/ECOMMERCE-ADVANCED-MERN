// features/wishList/wishlistLoader.js
import { store } from '../../components/redux/store';
import { getWishlistItems } from './wishListSlice';
import { isTokenExpired } from '../../utils/auth';

export const wishlistLoader = async () => {

  const token = localStorage.getItem("accessToken");
  const userData = localStorage.getItem("user");

  //  If no token or it's expired, we treat them as a guest
  if (!token || isTokenExpired(token)) {
    store.dispatch(getWishlistItems(null));
    return { isAuthorized: false };
  }

  const user = userData ? JSON.parse(userData) : null;

  if (user) {
    await store.dispatch(getWishlistItems(user));
  }

  return { isAuthorized: true };
};
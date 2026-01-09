// features/wishList/wishlistLoader.js
import { store } from '../../components/redux/store';
import { getWishlistItems } from './wishListSlice';
import { isTokenExpired } from '../../utils/auth';

export const wishlistLoader = async () => {
  // 1. Get the token exactly how your AuthContext does
  const token = localStorage.getItem("accessToken");
  const userData = localStorage.getItem("user");

  // 2. Logic: If no token or it's expired, we treat them as a guest
  if (!token || isTokenExpired(token)) {
    // Optionally clear wishlist in Redux for guests
    store.dispatch(getWishlistItems(null));
    return { isAuthorized: false };
  }

  // 3. If we have a valid token, sync the wishlist to Redux
  // We parse the user from localStorage because the Context set it there during login/init
  const user = userData ? JSON.parse(userData) : null;

  if (user) {
    // We 'await' so the loader finishes BEFORE the page renders
    await store.dispatch(getWishlistItems(user));
  }

  return { isAuthorized: true };
};
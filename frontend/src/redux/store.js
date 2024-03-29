import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import favoritesReducer from "../redux/features/favorites/favoriteSlice";
import cartSliceReducer from "../redux/features/cart/cartSlice";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";
import shopReducer from "../redux/features/shop/shopSlice";
// Lấy danh sách mục yêu thích từ localStorage
const initialFavorites = getFavoritesFromLocalStorage() || [];

// Cấu hình store Redux
const store = configureStore({
  reducer: {
    // Sử dụng apiSlice.reducerPath làm khóa cho reducer API
    [apiSlice.reducerPath]: apiSlice.reducer,
    // Reducer cho phần tử 'auth'
    auth: authReducer,
    // Reducer cho phần tử 'favorites'
    favorites: favoritesReducer,
    // Reducer cho phần tử 'cart'
    cart: cartSliceReducer,
    // Reducer cho phan tu 'shop'
    shop: shopReducer,
  },

  // Trạng thái ban đầu của slice yêu thích được đặt trước
  preloadedState: {
    favorites: initialFavorites,
  },

  // Middleware được thêm vào store để xử lý các actions liên quan đến API
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // Cho phép Redux DevTools
  devTools: true,
});

// Thiết lập các listener cho store để xử lý các actions liên quan đến API
setupListeners(store.dispatch);

export default store;

import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../Utils/cart";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Loại bỏ các trường không cần thiết từ action.payload và chỉ giữ lại thông tin về mặt hàng
      const { user, rating, numReviews, reviews, ...item } = action.payload;
      // Tìm kiếm xem mặt hàng đã tồn tại trong giỏ hàng chưa
      const existItem = state.cartItems.find((x) => x._id === item._id);

      // Nếu mặt hàng đã tồn tại, cập nhật thông tin của mặt hàng trong giỏ hàng
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // Nếu mặt hàng chưa tồn tại, thêm mặt hàng mới vào giỏ hàng
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state, item);
    },

    // Xóa một mặt hàng khỏi giỏ hàng
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },

    // Lưu địa chỉ vận chuyển vào trạng thái giỏ hàng và cập nhật vào localStorage
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Lưu phương thức thanh toán vào trạng thái giỏ hàng và cập nhật vào localStorage
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Xóa tất cả mặt hàng trong giỏ hàng
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Đặt lại giỏ hàng về trạng thái ban đầu
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;

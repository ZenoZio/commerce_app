// Hàm này thêm số thập phân vào một số và làm tròn đến hai chữ số thập phân
export const addDecimal = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
  };
  
  // Hàm này cập nhật thông tin giỏ hàng dựa trên trạng thái hiện tại
  export const updateCart = (state) => {
    // Tính tổng giá tiền của tất cả các mặt hàng trong giỏ hàng
    state.itemsPrice = addDecimal(
      state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      )
    );
  
    // Tính phí vận chuyển, nếu tổng giá tiền lớn hơn 100 thì phí vận chuyển là 0, ngược lại là 10
    state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
  
    // Tính thuế, sử dụng tỷ lệ 0.15
    state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice).toFixed(2));
  
    // Tính tổng giá tiền cuối cùng bao gồm giá tiền các mặt hàng, phí vận chuyển và thuế
    state.totalPrice = (
      Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
    ).toFixed(2);
  
    // Lưu trạng thái giỏ hàng mới vào localStorage
    localStorage.setItem("cart", JSON.stringify(state));
  
    // Trả về trạng thái giỏ hàng đã được cập nhật
    return state;
  };
  
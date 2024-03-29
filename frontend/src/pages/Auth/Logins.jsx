import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Logins = () => {
  const [email, setEmail] = useState(""); // State để lưu trữ giá trị của email
  const [password, setPassword] = useState(""); // State để lưu trữ giá trị của password

  const dispatch = useDispatch(); // Hook useDispatch để gửi actions đến Redux store
  const navigate = useNavigate(); // Hook useNavigate để điều hướng đến các routes trong ứng dụng

  const [login, { isLoading }] = useLoginMutation(); // Hook useLoginMutation từ userApiSlice để thực hiện hành động đăng nhập

  const { userInfo } = useSelector((state) => state.auth); // Lấy thông tin người dùng từ Redux store

  const { search } = useLocation(); // Hook useLocation để lấy thông tin query params từ URL
  const sp = new URLSearchParams(search); // Tạo một đối tượng URLSearchParams từ query params
  const redirect = sp.get("redirect") || "/"; // Lấy giá trị của query param "redirect", mặc định là "/" nếu không có

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    } else {
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
        </div>
      </section>
    </div>
  );
};

export default Logins; // Xuất component Login để sử dụng trong ứng dụng

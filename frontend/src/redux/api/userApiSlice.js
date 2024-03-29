import { apiSlice } from "./apiSlice"; // Import apiSlice từ một tập tin khác trong dự án
import { USERS_URL } from "../constants"; // Import USERS_URL từ một tập tin constants khác

export const userApiSlice = apiSlice.injectEndpoints({
  // Sử dụng phương thức injectEndpoints từ apiSlice để tạo ra một API Slice
  endpoints: (builder) => ({
    // Xác định các endpoints cho API Slice
    login: builder.mutation({
      // Xác định một mutation endpoint có tên là "login"
      query: (data) => ({
        // Xây dựng query cho mutation
        url: `${USERS_URL}/auth`, // Địa chỉ URL endpoint là USERS_URL/auth
        method: "POST", // Sử dụng phương thức POST để gửi dữ liệu
        body: data, // Gửi dữ liệu vào body của request
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    profifle: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),

    getUserDetails: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfifleMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsMutation,
  useUpdateUserMutation,
} = userApiSlice; // Tạo một custom hook có tên là useLoginMutation từ userApiSlice để sử dụng trong các component khác

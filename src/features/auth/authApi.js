import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { data } = result || {};
          if (data?.accessToken && data?.user) {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: data.accessToken,
                user: data.user,
              })
            );

            dispatch(
              userLoggedIn({
                accessToken: data.accessToken,
                user: data.user,
              })
            );
          }
        } catch (err) {
          console.log(err?.error);
        }
      },
    }),
  }),
});

export const { useAdminLoginMutation } = authApi;

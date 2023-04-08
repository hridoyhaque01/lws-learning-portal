import { apiSlice } from "../api/apiSlice";
import { loginError, userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ data, role }) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted({ role }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { data } = result || {};
          if (data?.accessToken && data?.user) {
            if (data?.user?.role !== role) {
              dispatch(loginError("Enter valid email or password"));
            } else {
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
              dispatch(loginError(""));
            }
          }
        } catch (err) {
          console.log(err?.Error);
        }
      },
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
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

export const { useLoginMutation, useRegisterMutation } = authApi;

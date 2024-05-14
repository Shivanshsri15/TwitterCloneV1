import { PFUPLOAD_URL, USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/getUser/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getUserBySearch: builder.query({
      query: ({ keyword }) => ({
        url: `${USERS_URL}/search/getUser`,
        params: { keyword },
      }),
    }),
    followUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/followUser`,
        method: "POST",
        body: data,
      }),
    }),
    unfollowUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/unfollowUser`,
        method: "POST",
        body: data,
      }),
    }),
    pfAddUserPhoto: builder.mutation({
      query: (data) => ({
        url: `${PFUPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserByIdQuery,
  useGetUserBySearchQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  usePfAddUserPhotoMutation,
  useUpdateUserProfileMutation,
} = usersApiSlice;

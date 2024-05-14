import { POSTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getForYouPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}/forYouPosts`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["POST"],
    }),
    addPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["POST"],
    }),
    addPostPhotos: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    addLikeToPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/forYouPostsLike`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["POST"],
    }),

    addCommentToPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/addComments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["POST"],
    }),
    getPostComments: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/getPostComments`,
        method: "POST",
        body: data,
      }),
    }),
    getTagPostsByName: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/getTagPostsByName`,
        method: "POST",
        body: data,
      }),
    }),
    getAllTags: builder.query({
      query: () => ({
        url: `${POSTS_URL}/getAllPostTags`,
      }),
      keepUnusedDataFor: 5,
    }),
    getTagPosts: builder.query({
      query: (tagId) => ({
        url: `${POSTS_URL}/getTagPosts/${tagId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getFollowingPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}/getFollowingPosts`,
      }),
      keepUnusedDataFor: 5,
    }),
    getUserPosts: builder.query({
      query: (userId) => ({
        url: `${POSTS_URL}/getUserPosts/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddPostMutation,
  useAddPostPhotosMutation,
  useGetForYouPostsQuery,
  useAddLikeToPostMutation,
  useAddCommentToPostMutation,
  useGetPostCommentsMutation,
  useGetAllTagsQuery,
  useGetTagPostsQuery,
  useGetTagPostsByNameMutation,
  useGetFollowingPostsQuery,
  useGetUserPostsQuery,
} = postApiSlice;

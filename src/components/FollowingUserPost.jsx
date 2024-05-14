import React from "react";

import { Container } from "react-bootstrap";
import Loader from "./Loader";

import PostBox from "./PostBox";
import { useGetFollowingPostsQuery } from "../slices/postApiSlice";

const FollowingUserPost = () => {
  const { data: followingPostsData, isLoading } = useGetFollowingPostsQuery();
  const dataLength = followingPostsData?.length;
  const reversedData = followingPostsData?.slice().reverse();

  return (
    <Container className="d-flex flex-column mt-3">
      {dataLength !== 0 ? (
        reversedData?.map((post) =>
          isLoading ? <Loader /> : <PostBox data={post} />
        )
      ) : (
        <h3 className="text-primary">
          Your Followed Users Haven't Posted Anything
        </h3>
      )}
      {}
    </Container>
  );
};

export default FollowingUserPost;

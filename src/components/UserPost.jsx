import React from "react";
import { useGetForYouPostsQuery } from "../slices/postApiSlice";
import { Container } from "react-bootstrap";
import Loader from "./Loader";

import PostBox from "./PostBox";
const UserPost = () => {
  const { data: postData, isLoading } = useGetForYouPostsQuery();

  const reversedData = postData?.slice().reverse();

  return (
    <Container className="d-flex flex-column mt-3">
      {reversedData?.map((post) =>
        isLoading ? <Loader /> : <PostBox data={post} />
      )}
    </Container>
  );
};
export default UserPost;

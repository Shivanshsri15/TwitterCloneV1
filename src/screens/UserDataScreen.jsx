import React, { useEffect, useState } from "react";
import HomeScreen from "./HomeScreen";
import { useParams } from "react-router-dom";
import {
  useFollowUserMutation,
  useGetUserByIdQuery,
  useUnfollowUserMutation,
} from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useGetUserPostsQuery } from "../slices/postApiSlice";
import PostBox from "../components/PostBox";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UserDataScreen = () => {
  const { userId } = useParams();
  const { data, isLoading, refetch } = useGetUserByIdQuery(userId);
  const { data: userPost, isLoading: postLoading } =
    useGetUserPostsQuery(userId);
  const { userInfo } = useSelector((state) => state.auth);
  const reversedData = userPost?.slice().reverse();
  const [isFollowed, setIsFollowed] = useState(
    data?.followers?.includes(userInfo._id) ? true : false
  );
  console.log(isFollowed);
  useEffect(() => {
    setIsFollowed(data?.followers?.includes(userInfo._id));
  }, [data]);

  const [followUserFunc, { isLoading: followLoading }] =
    useFollowUserMutation();
  const [unFollowUserFunc, { isLoading: unFollowLoading }] =
    useUnfollowUserMutation();
  const followUserHandler = async (id) => {
    try {
      const userIdObject = {
        id,
      };
      const res = await followUserFunc(userIdObject);
      toast.success("User Followed");
      refetch();
      setIsFollowed(true);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const unFollowUserHandler = async (id) => {
    try {
      const userIdObject = {
        id,
      };
      const res = await unFollowUserFunc(userIdObject);
      refetch();
      toast.success("User UnFollowed");
      setIsFollowed(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleFollowUnFollowUser = () => {
    isFollowed ? unFollowUserHandler(userId) : followUserHandler(userId);
  };

  return (
    <HomeScreen>
      {isLoading && <Loader />}
      <Row>
        <Col md={3}>
          <Image
            src={data?.profileImage}
            style={{
              height: "8rem",
              width: "8rem",
              display: "inline",
            }}
            fluid
            responsive
            className="m-1"
            roundedCircle
          ></Image>
        </Col>
        <Col>
          <span className="fs-3 align-items-start">
            {data?.firstName} {data?.surname}
          </span>
          <strong>
            <p className="m-0 text-primary">
              Followers {data?.followers?.length}{" "}
            </p>
            <p className="text-primary">
              Followings {data?.followings?.length}
            </p>
          </strong>
          {userInfo._id === userId ? (
            <h5 className="text-primary">Your Id</h5>
          ) : (
            <>
              <Button
                variant="outline-primary"
                className="px-5"
                onClick={handleFollowUnFollowUser}
              >
                {followLoading || unFollowLoading
                  ? "Loading..."
                  : isFollowed
                  ? "Unfollow"
                  : "Follow"}
                {/* {} */}
              </Button>
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Container className="mt-5">
          {postLoading && <Loader />}
          {reversedData?.length === 0 ? (
            <h1>No Posts</h1>
          ) : (
            reversedData?.map((post) =>
              isLoading ? <Loader /> : <PostBox data={post} />
            )
          )}
        </Container>
      </Row>
    </HomeScreen>
  );
};

export default UserDataScreen;

import React, { useEffect, useState } from "react";
import {
  useAddCommentToPostMutation,
  useAddLikeToPostMutation,
  useGetPostCommentsMutation,
} from "../slices/postApiSlice";
import {
  Button,
  Carousel,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";

import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "./Loader";
import CommentBox from "./CommentBox";
import { LinkContainer } from "react-router-bootstrap";
import {
  useFollowUserMutation,
  useGetUserByIdQuery,
  useUnfollowUserMutation,
} from "../slices/usersApiSlice";

const PostBox = ({ data }) => {
  const [commentBoxOpen, setCommentBoxOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentId, setCommentId] = useState("");
  const [addLikeToPost] = useAddLikeToPostMutation();
  const [postComments, setPostComments] = useState();
  const { userInfo } = useSelector((state) => state.auth);
  // const {
  //   data: thisUserData,
  //   isLoading,
  //   refetch,
  // } = useGetUserByIdQuery(data.user._id);

  // const [isFollowed, setIsFollowed] = useState(
  //   thisUserData?.followers?.includes(userInfo._id) ? true : false
  // );

  // useEffect(() => {
  //   setIsFollowed(thisUserData?.followers?.includes(userInfo._id));
  // }, [data, isFollowed]);

  // const [followUserFunc, { isLoading: followLoading }] =
  //   useFollowUserMutation();
  // const [unFollowUserFunc, { isLoading: unFollowLoading }] =
  //   useUnfollowUserMutation();

  // const followUserHandler = async (id) => {
  //   try {
  //     const userIdObject = {
  //       id,
  //     };
  //     const res = await followUserFunc(userIdObject);
  //     toast.success("User Followed");
  //     refetch();
  //     setIsFollowed(true);
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

  // const unFollowUserHandler = async (id) => {
  //   try {
  //     const userIdObject = {
  //       id,
  //     };
  //     const res = await unFollowUserFunc(userIdObject);
  //     refetch();
  //     toast.success("User UnFollowed");
  //     setIsFollowed(false);
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };
  // const handleFollowUnFollowUser = () => {
  //   isFollowed
  //     ? unFollowUserHandler(data.user._id)
  //     : followUserHandler(data.user._id);
  // };

  ///////////////////////////////////////////////////////////////

  const [isLiked, setIsLiked] = useState(
    data.postLikes?.includes(userInfo._id)
  );
  const [totalLikes, setTotalLikes] = useState(data?.postLikes?.length);

  ////////////////////////////////////////////////////////////////////

  const [addCommentToPost, { isLoading: commentLoading }] =
    useAddCommentToPostMutation();

  const reversedPostCommentData = data.comment?.slice().reverse();
  //////////////////////////////////////////////////////////////////////
  const likePost = async (postId) => {
    try {
      const dataContainingPostId = {
        postId,
      };
      const res = await addLikeToPost(dataContainingPostId);

      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const commentSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const postedComment = {
        commentId,
        commentName: userInfo.firstName,
        commentText,
      };

      await addCommentToPost(postedComment);

      setCommentText("");
      toast.success("Thanks for sharing your valuable comment");
      reversedPostCommentData();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // console.log(data.user._id);
  return (
    <Container className="mb-2 " style={{ marginLeft: "5px" }}>
      <LinkContainer
        to={`/profile/${data.user._id}`}
        style={{
          height: "2rem",
          width: "2rem",
          display: "inline",
        }}
      >
        <Image
          src={data.user.profileImage}
          style={{
            height: "2rem",
            width: "2rem",
            display: "inline",
          }}
          fluid
          responsive
          className="m-1 textHover"
          roundedCircle
        ></Image>
      </LinkContainer>
      <LinkContainer to={`/profile/${data.user._id}`}>
        <span style={{ fontSize: "12px" }} className="textHover">
          <strong>
            {data.user.firstName} {data.user.surname}
          </strong>
          ({data.user.age})
        </span>
      </LinkContainer>

      <Row>
        <Row className="my-4 mx-2 d-flex flex-row">
          <h5>
            {data.postText}{" "}
            {data?.tags?.map((x, index) => (
              <LinkContainer to={`/tags/${x}`} className="tagHover">
                <span key={index} className="text-primary fs-5">
                  #{x}{" "}
                </span>
              </LinkContainer>
            ))}
          </h5>
        </Row>

        {data.postImages.length !== 0 ? (
          <Carousel interval={null}>
            {data.postImages.map((post, index) => (
              <Carousel.Item key={index}>
                <Image
                  src={`/${post}`}
                  fluid
                  style={{ height: "100%" }}
                  className="rounded"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <></>
        )}
      </Row>
      <Row className="d-flex justify-content-center align-items-center">
        <Col
          md={6}
          onClick={() => {
            likePost(data._id);
            setIsLiked((prev) => !prev);
            isLiked
              ? setTotalLikes((prev) => prev - 1)
              : setTotalLikes((prev) => prev + 1);
          }}
          className="onHoverClass"
        >
          {isLiked ? (
            <FaHeart className="fs-4 my-2" />
          ) : (
            <CiHeart className="fs-4 my-2" />
          )}
          <span className="pt-1"></span> {totalLikes} Likes
        </Col>
        <Col
          md={6}
          onClick={() => {
            setCommentBoxOpen((prev) => !prev);
          }}
          className="onHoverClass"
        >
          <FaRegCommentAlt className=" my-2" />
          <span className="pt-1"></span> {data.comment.length} Comments
        </Col>
      </Row>
      {commentBoxOpen && (
        <Row>
          <h2>Comments</h2>
          <hr />
          <Form onSubmit={commentSubmitHandler}>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={2}
                style={{
                  overflow: "hidden",
                  border: "none",

                  fontSize: "20px",
                  color: "white",
                }}
                className=" py-1 bg-transparent"
                type="text"
                name="commentText"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write what you feel !!"
              />
            </Form.Group>
            <Button
              variant="outline-primary"
              className="my-4 px-3"
              type="submit"
              onClick={() => {
                setCommentId(data._id);
              }}
            >
              Post
            </Button>
            {commentLoading && <Loader />}
          </Form>

          <CommentBox commentData={reversedPostCommentData} />
          <hr />
        </Row>
      )}
      <hr />
    </Container>
  );
};

export default PostBox;

import React, { useEffect, useState } from "react";
import HomeScreen from "./HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import PostBox from "../components/PostBox";
import { useGetUserPostsQuery } from "../slices/postApiSlice";
import Loader from "../components/Loader";
import {
  usePfAddUserPhotoMutation,
  useUpdateUserProfileMutation,
} from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [age, setAge] = useState("");
  useEffect(() => {
    setFirstName(userInfo.firstName);
    setSurname(userInfo.surname);
    setEmail(userInfo.email);
    setImage(userInfo.profileImage);
    setAge(userInfo.age);
  }, []);
  const { data: userPost, isLoading: postLoading } = useGetUserPostsQuery(
    userInfo._id
  );
  const reversedData = userPost?.slice().reverse();
  const dispatch = useDispatch();
  const [changeUserPhoto] = usePfAddUserPhotoMutation();
  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateUserProfileMutation();

  const updateUserHandler = async (e) => {
    e.preventDefault();
    const updatedUserData = {
      firstName,
      surname,
      age,
      email,
      profileImage: image,
    };
    const res = await updateProfile(updatedUserData);
    dispatch(setCredentials({ ...res.data }));
    toast.success("Profile Updated Successfully");
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await changeUserPhoto(formData).unwrap();
      console.log(res.message);
      setImage(res.image);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HomeScreen>
      <Row>
        <Col md={3}>
          <Image
            src={userInfo?.profileImage}
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
            {userInfo?.firstName} {userInfo?.surname}
          </span>
          <strong>
            <p className="m-0 text-primary">
              Followers {userInfo?.followers?.length}{" "}
            </p>
            <p className="text-primary">
              Followings {userInfo?.followings?.length}
            </p>
          </strong>
        </Col>
        <Row>
          <Form onSubmit={updateUserHandler} className="ms-3 mt-3">
            <Form.Group controlId="firstName" as={Col}>
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter firstname"
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="surName" as={Col}>
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Enter surname"
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={age}
                name="age"
                placeholder="Enter your age"
                onChange={(e) => setAge(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                name="postImages"
                placeholder="ProfileImage"
                onChange={uploadFileHandler}
              />
            </Form.Group>
            <Button variant="outline-primary" className="my-2" type="submit">
              Update Profile
            </Button>
            {updateLoading && <Loader />}
          </Form>
        </Row>
        <hr className="mt-1" />
        <Container className="mt-5">
          {postLoading && <Loader />}
          {reversedData?.length === 0 ? (
            <div>No Posts</div>
          ) : (
            reversedData?.map((post) =>
              postLoading ? <Loader /> : <PostBox data={post} />
            )
          )}
        </Container>
      </Row>
    </HomeScreen>
  );
};

export default ProfileScreen;

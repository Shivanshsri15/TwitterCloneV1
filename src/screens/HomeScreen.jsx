import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { toast } from "react-toastify";

// import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { BsTwitterX } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { CgLaptop, CgProfile } from "react-icons/cg";
import { CiCircleMore } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useLoginMutation } from "../slices/usersApiSlice";
import { useGetAllTagsQuery } from "../slices/postApiSlice";
import Loader from "../components/Loader";
const HomeScreen = ({ children }) => {
  const [tagData, setTagData] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall, { isLoading: logoutLoading }] = useLoginMutation();

  const { data: allTagsData, isLoading } = useGetAllTagsQuery();
  // const sortedData = allTagsData.tagPosts.sort(
  //   (a, b) => a.tagPosts.length - b.tagPosts.length
  // );
  // setTagData(sortedData);

  const logoutHandler = async () => {
    try {
      await logoutApiCall();
      await dispatch(logout());
      navigate("/login");
      toast.success("User Logged out successfully");
    } catch (err) {
      console.log("not working");
      toast.error(err.message);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        overflowY: "scroll",
        overflowX: "hidden",
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundColor: "black",
        backgroundPosition: "center",
      }}
      className="text-light"
    >
      <Container>
        <Row>
          <Col md={3}>
            <ListGroup
              className="d-flex flex-column justify-content-around fs-4 ms-2"
              style={{ listStyleType: "none" }}
              action
            >
              <LinkContainer to="/home">
                <li className="my-1 px-3">
                  <BsTwitterX />
                </li>
              </LinkContainer>
              <LinkContainer to="/home">
                <li className="my-1 px-3 onHoverClass" action>
                  <GoHome /> Home
                </li>
              </LinkContainer>
              <LinkContainer to="/home/searchUser">
                <li className="my-1 px-3 onHoverClass">
                  <FaSearch /> Search
                </li>
              </LinkContainer>

              <LinkContainer to="/profile">
                <li className="my-1 px-3 onHoverClass">
                  <CgProfile /> Profile
                </li>
              </LinkContainer>
            </ListGroup>

            <hr />
            <OverlayTrigger
              trigger="click"
              className=""
              placement="top"
              overlay={
                <Popover id="popover-basic" className="bg-primary text-light ">
                  <Popover.Body
                    className="text-light onHover my-2 px-5 "
                    onClick={logoutHandler}
                  >
                    {logoutLoading ? (
                      <p>Loading...</p>
                    ) : (
                      <strong>
                        Log out
                        <span> @{userInfo?.firstName}</span>
                      </strong>
                    )}
                  </Popover.Body>
                </Popover>
              }
            >
              <Container className="">
                <Row className="onHoverClass w-100">
                  <Col md={2} className="d-flex  ">
                    <Image
                      style={{ height: "40px", width: "40px" }}
                      className="rounded-circle my-1"
                      src={userInfo?.profileImage}
                    />
                  </Col>
                  <Col md={6}>
                    <p className="m-0">{userInfo?.firstName}</p>
                    <p className="m-0">{userInfo?.surname}</p>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <CiCircleMore className="fs-2 my-2 " />
                  </Col>
                </Row>
              </Container>
            </OverlayTrigger>
          </Col>
          {/* <div className="verticalLine"></div> */}
          <Col md={6} style={{ overflowY: "auto" }} className="pr-0">
            <div className="verticalLine">
              <Row className="ps-3">
                <LinkContainer to={"/home"}>
                  <Col
                    className={`d-flex justify-content-center align-content-center py-3 textHover active 
                  
                  `}
                  >
                    For you
                  </Col>
                </LinkContainer>
                <LinkContainer to={"/home/followingPosts"}>
                  <Col className="d-flex justify-content-center align-content-center py-3 textHover active">
                    Following
                  </Col>
                </LinkContainer>
                <hr />
              </Row>
              <Container>{children}</Container>
            </div>
          </Col>
          <Col md={3} className="ps-0">
            <div className="verticalLine">
              <Row className="mt-4">
                <ListGroup className="rounded ms-5" variant="flush">
                  <h3>Whats's happening</h3>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    allTagsData?.map((t) => (
                      <LinkContainer to={`/tags/${t.tagTitle}/${t._id}`}>
                        <ListGroup.Item action variant="secondary">
                          <p style={{ marginBottom: "0px", fontSize: "10px" }}>
                            Tag Field : Trending
                          </p>
                          <strong>{t.tagTitle}</strong>
                        </ListGroup.Item>
                      </LinkContainer>
                    ))
                  )}
                </ListGroup>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;
